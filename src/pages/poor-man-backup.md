---
title: Poor man's backup system
type: post
layout: post
createdAt: 2022-01-13T14:14:54.236Z
---

When your new site goes live or if you have something important stored on a VPS, you always need a system to periodly backup your data to somewhere safe like AWS S3. Maybe as a small team you want to spend your money on something more important, so you're trying to find a free solution, if that's the case, congrats! GitHub is your savior.

The idea is to use GitHub action to periodly fetch your files and commit them in a private repo. Here I will show you how to backup a PostgreSQL database, but it also applies to other types of backup. 

Let's create a private repo called `db-backup`, and a workflow file `.github/workflows/backup.yml` in `main` branch:

```yaml
name: Backup

on:
 schedule:
   # run at 2 am every day
   - cron: 0 2 * * *

jobs:
  backup:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Get current date
        id: date
        run: echo "::set-output name=date::$(date +'%Y-%m-%d-%H')"
      - name: Switch to backup branch
        run: |
          git config user.name github-actions
          git config user.email github-actions@github.com
          git switch --orphan backup
          git config pull.rebase false
          git pull origin backup --depth 1
      # https://askubuntu.com/questions/589210/removing-files-older-than-7-days
      - name: Delete backups created 30 days ago
        run: |
          find . -type f -name "db-*.sql" -maxdepth 1 -mtime +30 -execdir rm -- '{}' \;
      - name: Do backup
        run: |
          pg_dump -d $DB_NAME -h $DB_HOST -p $DB_PORT -U $DB_USER > db-${{ steps.date.outputs.date }}.sql
        env:
          PGPASSWORD: ${{ secrets.DB_PASS }}
          DB_PORT: 5432
          DB_HOST: ${{ secrets.DB_HOST }}
          DB_USER: ${{ secrets.DB_USER }}
          DB_NAME: ${{ secrets.DB_NAME }}
      - name: Commit and push
        run: |
          git add -A
          git commit -m "new backup ${{ steps.date.outputs.date }}"
          git push origin backup

```

This workflows requires some [action secrets](https://docs.github.com/en/actions/security-guides/encrypted-secrets) to be set:

- `DB_PASS`: Database password
- `DB_USER`: Database username
- `DB_HOST`: Database host
- `DB_NAME`: Database name

This workflow will run at 2am every day, and dump your database to `db-YYYY-MM-DD-HH.sql` and push it to the `backup` branch.
