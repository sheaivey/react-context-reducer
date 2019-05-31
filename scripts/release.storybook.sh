#!/bin/bash -e
export RELEASE=1

if ! [ -e scripts/release.storybook.sh ]; then
  echo >&2 "Please run scripts/release.storybook.sh from the repo root"
  exit 1
fi

npm run build-storybook

git add docs
git commit -m "updating docs"
