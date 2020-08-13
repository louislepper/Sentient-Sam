#!/bin/sh
read -p "Do you want to copy the latest frontend code in before deploying? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
    rm -rf ./public/*
    cd ../frontend
    yarn predeploy:prod
    cp -R build/* ../backend/public/
    cd ../backend 
    echo "Latest frontend code copied."
fi

gcloud app deploy