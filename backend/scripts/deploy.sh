#!/bin/sh
set -e
read -p "Do you want to copy the latest frontend code in before deploying? " -n 1 -r
echo    # (optional) move to a new line
if [[ $REPLY =~ ^[Yy]$ ]]
then
	./scripts/copy-frontend-code-in.sh
fi

gcloud app deploy --quiet
