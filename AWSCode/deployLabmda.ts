import AWS from 'aws-sdk';
import fs from 'fs';

// Initialize the Lambda service client
const lambda = new AWS.Lambda({ region: 'ap-northeast-1' }); // Replace with your region

// Read the function code from a file
const functionCode = fs.readFileSync('/index.js', 'utf8');

// Create the Lambda function
const createParams = {
  FunctionName: 'my-lambda-function', // Replace with your function name
  Runtime: 'nodejs14.x', // Replace with your preferred runtime
  Handler: 'index.handler', // Replace with your handler function
  Role: 'arn:aws:iam::123456789012:role/lambda-role', // Replace with your IAM role ARN
  Code: { ZipFile: functionCode }
};

lambda.createFunction(createParams, function(err, data) {
  if (err) {
    console.log('Error creating Lambda function: ', err);
  } else {
    console.log('Lambda function created: ', data.FunctionArn);
    
    // Deploy the Lambda function
    const deployParams = {
      FunctionName: 'my-lambda-function', // Replace with your function name
      Publish: true // Publish the new version of the function
    };
    
    lambda.publishVersion(deployParams, function(err, data) {
      if (err) {
        console.log('Error deploying Lambda function: ', err);
      } else {
        console.log('Lambda function deployed: ', data.Version);
      }
    });
  }
});
