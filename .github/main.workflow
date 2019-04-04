workflow "Deploy Site" {
  on = "push"
  resolves = ["Build and Deploy Saber"]
}

action "Build and Deploy Saber" {
  uses = "egoist/saber-deploy-gh-pages@master"
  secrets = ["GITHUB_TOKEN"]
}
