import * as cdk from 'aws-cdk-lib';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class EcrImageUploadStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create ECR repository
    const ecrRepo = new ecr.Repository(this, 'MyEcrRepo', {
      repositoryName: 'my-ecr-repo', // Replace with your repository name
    });

    // Tag and push the Docker image to ECR
    ecrRepo.grantPullPush(<IAMRole>); // Replace with the role that needs push access

    const dockerImage = new cdk.DockerImageAsset(this, 'MyDockerImage', {
      directory: 'path/to/dockerfile', // Replace with your Dockerfile's directory
    });

    ecrRepo.grantPullPush(dockerImage.grantPrincipal);

    // Output the repository URI
    new cdk.CfnOutput(this, 'EcrRepoUri', {
      value: ecrRepo.repositoryUri,
    });
  }
}
