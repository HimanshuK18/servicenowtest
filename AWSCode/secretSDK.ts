import AWS from 'aws-sdk';


AWS.config.update({
    region: 'ap-northeast-1', // Replace with your region
  });
// Create an instance of the Secrets Manager service
const secretsManager = new AWS.SecretsManager();
const tag: AWS.SecretsManager.Tag[] = [{Key: "key1", Value: "Value1"}, {Key: "key2", Value: "Value2"}, {Key: "key3", Value: "Value3"}];
// Define the parameters for creating the secret
const secretParams = {
  Name: 'MySecretName1', // Replace with your desired secret name
  SecretString: JSON.stringify({ username: 'admin', password: 'supersecret' }), // Replace with your desired secret values
  Description: "Hope it crates",
  Tags: tag
};

// Create the secret in Secrets Manager
secretsManager.createSecret(secretParams, (err, data) => {
  if (err) {
    console.error('Error creating secret:', err);
  } else {
    console.log('Secret created successfully:', data);
  }
});
