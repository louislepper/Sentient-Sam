#!/bin/sh
rm -rf ./public/*
cd ../frontend
yarn predeploy:prod
cp -R build/* ../backend/public/
cd ../backend 
echo "Latest frontend code copied."