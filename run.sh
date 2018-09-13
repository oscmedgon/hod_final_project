#!/bin/bash
SECONDS=0

. ~/.nvm/nvm.sh
. ~/.profile
. ~/.bashrc

nvm use

## Installing dependencies
npm install

## RUNNING SERVER
echo Starting server
nodemon index.js > run.log . &
clear

## starting details
duration=$SECONDS

echo "Time elapsed starting server $SECONDS seconds"

## Real time tracking log
tail -f run.log