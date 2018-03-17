#!/usr/bin/env sh

set -e

cd angular
yarn run build
cd ..

cd react
yarn run build
cd ..

rm -rf ./dist
mkdir ./dist
cp -r ./angular/dist ./dist/angular
cp -r ./react/dist ./dist/react

$(npm bin)/gh-pages -d dist