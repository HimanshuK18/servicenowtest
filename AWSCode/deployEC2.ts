// Load the AWS SDK
import AWS from 'aws-sdk';

// Set up the AWS configuration
AWS.config.update({
  region: 'ap-northeast-1', // Replace with your region
});

// Create an EC2 instance
const ec2 = new AWS.EC2();
ec2.runInstances({
  ImageId: 'ami-0329eac6c5240c99d', // Replace with your AMI ID
  InstanceType: 't2.micro', // Replace with your instance type
  KeyName: 'New_Key', // Replace with your key pair name
  MinCount: 1,
  MaxCount: 1,
}, (err: any, data: any) => {
  if (err) {
    console.log('Error launching instance:', err);
  } else {
    console.log('Instance launched:', data.Instances[0].InstanceId);
  }
});
