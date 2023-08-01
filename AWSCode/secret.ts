import * as cdk from 'aws-cdk-lib';
import * as secretsmanager from 'aws-cdk-lib/aws-secretsmanager';
import { StackProps } from 'aws-cdk-lib';

// Define a CDK app
const app = new cdk.App();

// Define a CDK stack
class MyStack extends cdk.Stack {
  constructor(scope: any, id: string, props?: StackProps) {
    super(scope, id, props);

    // Create the secret
    const secretTest = new secretsmanager.Secret(this, 'MySecret', {
      secretName: 'MySecretName', // Replace with your desired secret name
      generateSecretString: {
        secretStringTemplate: JSON.stringify({ username: 'admin' }), // Replace with your desired secret string template
        generateStringKey: 'password', // Replace with the key for the generated secret value
        excludePunctuation: true, // Optionally exclude punctuation characters from the generated secret value
        includeSpace: false, // Optionally exclude spaces from the generated secret value
        passwordLength: 12, // Replace with your desired length for the generated secret value
      },
    });
  }
}

// Instantiate the stack
new MyStack(app, 'MyStack');

// Run the app
const cloudFormationOutput = app.synth();
console.log(cloudFormationOutput);
