workflow "Deploy Site" {
  resolves = ["Build and Deploy Saber"]
  on = "push"
}

action "Build and Deploy Saber" {
  uses = "egoist/saber-deploy-gh-pages@master"
  secrets = ["GITHUB_TOKEN"]
}
