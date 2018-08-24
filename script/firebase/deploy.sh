#!/usr/bin/env bash

stage=$1
npm run build ${stage}

cd .build/functions
npm install
firebase deploy --only functions
