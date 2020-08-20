#!/bin/sh
set -e
rm -rf ./public/*
cd ../frontend
yarn install
yarn predeploy:prod
cp -R build/* ../backend/public/
cd ../backend 
echo "Latest frontend code copied."
