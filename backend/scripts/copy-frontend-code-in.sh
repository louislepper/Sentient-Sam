#!/bin/sh
set -e
rm -f ./public/* || true
cd ../frontend
yarn install
yarn predeploy:prod
cp -R build/* ../backend/public/
cd ../backend 
echo "Latest frontend code copied."
