// You must bundle the latest version of the AWS JS SDK (2.7.9)
// The built-in SDK version does not know about the Polly text-to-speech service.
const AWS = require('aws-sdk');

// This defaults to the region the Lambda function is in.
// Note that Polly is not available in all regions yet.
AWS.config.update({
  region: process.env.AWS_DEFAULT_REGION
});

// Returns a presigned url that can be played in the browser
var getPresignedURL = function(outputText, credentials) {
  var options = {
    region: process.env.AWS_DEFAULT_REGION,
  };

  // Credentials can be set for local testing
  if (credentials) {
    options.credentials = credentials;
  }
  
  var presigner = new AWS.Polly.Presigner();

  var url = presigner.getSynthesizeSpeechUrl({
    TextType: 'text',
    OutputFormat: 'mp3',
    VoiceId: process.env.AWS_POLLY_VOICE_ID || 'Emma',
    Text: outputText
  });
  return url;
};

exports.handler = (event, context, callback) => {

  const textToSpeak = event.queryStringParameters.speakText;
  console.log(JSON.stringify(event));
  if (textToSpeak === undefined) {
    return callback(null, {
      statusCode: 400,
      headers: {
        'Content-type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({error: 'bad input'}) 
    }); 
  }

  console.log(`Speaking: ${textToSpeak}`);
  callback(null, {
    statusCode: 200,
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
    body: JSON.stringify({presignedUrl: getPresignedURL(textToSpeak) }) 
  });
};
