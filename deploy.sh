#!/bin/zsh

# Creates deployment archive for a node.js lambda function and uploads using the AWS CLI

mkdir -p build
zip -r build/speakLambda.zip index.js node_modules

AWS_DEFAULT_REGION=us-east-2 aws lambda update-function-code --function-name speakLambda --zip-file fileb://build/speakLambda.zip
