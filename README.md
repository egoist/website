## Deployment

Create a postgres instance:

```bash
docker run -it --name pg -e POSTGRES_PASSWORD=$POSTGRES_PASSWORD -v /data/pg:/var/lib/postgresql/data -d -p 5432:5432 --rm postgres:14-alpine
```
