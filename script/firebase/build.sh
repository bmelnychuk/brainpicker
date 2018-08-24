#!/usr/bin/env bash

stage=$1

rm -rf .build

babel src --out-dir .build/functions/src --copy-files
cp ./package.json ./.build/functions

if [ ${stage} = "dev" ]; then
    cp ./script/firebase/dev/.firebaserc ./.build
    cp ./script/firebase/dev/firebase.json ./.build
fi

if [ ${stage} = "live" ]; then
    cp ./script/firebase/live/.firebaserc ./.build
    cp ./script/firebase/live/firebase.json ./.build
fi


