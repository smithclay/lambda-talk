## lambda-talk

Uses AWS Polly to Synthesize speech in a Lambda function. Must run in a region that supports the new [text-to-speech Polly service](https://aws.amazon.com/polly/).

## Requirements

* AWS Account
* Existing Lambda function with IAM permissions for AWS Polly.
* API Gateway with endpoint that proxies the lambda function.

## Installing dependencies

The 11/30/16 version of the AWS JS SDK is required—*not* the older version bundled inside of lambda.

```
npm install
```

## Updating/uploading the Lambda function

This assumes the Lambda function specified in the script in the region already exists with the correct permissions.

The `node_modules` directory is bundled because the AWS SDK included in Lambda as of 11/30/16 doesn't have Polly support.

```
./deploy.sh
```

