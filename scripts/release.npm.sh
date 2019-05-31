#!/bin/bash -e
export RELEASE=1

if ! [ -e scripts/release.npm.sh ]; then
  echo >&2 "Please run scripts/release.npm.sh from the repo root"
  exit 1
fi

current_version=$(node -p "require('./package').version")

printf "Current version is $current_version\nNext Version: "
read next_version

#coming soon
#npm test

#
rm -R lib

npm version $next_version

git push origin master

git tag latest -f

git push origin "v$next_version"
git push origin latest -f

npm publish
