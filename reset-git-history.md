rm -rf .git

git init
git checkout -b main
git add .
git commit -m "Initial commit"

git remote add origin git@github.com:push-based/nx-ws-ng-conf-24.git
git push -u --force origin main
