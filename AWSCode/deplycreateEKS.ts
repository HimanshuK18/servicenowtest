import * as cdk from 'aws-cdk-lib';
import * as eks from 'aws-cdk-lib/aws-eks';
import * as ecr from 'aws-cdk-lib/aws-ecr';

export class MyEksStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // Create an Amazon EKS cluster
    const cluster = new eks.Cluster(this, 'MyCluster', {
      version: eks.KubernetesVersion.V1_21,
    });

    // Create an Amazon ECR repository
    const repository = new ecr.Repository(this, 'MyRepository');

    // Upload a Docker image to the repository
    const localImageFile = '/path/to/local/image/file';
    const imageTag = 'my-image-tag';
    repository.addLifecycleRule({ maxImageCount: 1 });
    new cdk.CfnCustomResource(this, 'UploadImage', {
      serviceToken: cdk.CustomResourceProvider.getOrCreate(this, 'Custom::ECRUpload', {
        codeDirectory: `${__dirname}/custom-resource`,
        runtime: cdk.CustomResourceProviderRuntime.NODEJS_14_X,
        policyStatements: [
          {
            Effect: 'Allow',
            Action: ['ecr:GetAuthorizationToken', 'ecr:BatchCheckLayerAvailability', 'ecr:InitiateLayerUpload', 'ecr:UploadLayerPart', 'ecr:CompleteLayerUpload', 'ecr:PutImage'],
            Resource: '*',
          },
        ],
      }),
      properties: {
        RepositoryName: repository.repositoryName,
        ImageFile: localImageFile,
        ImageTag: imageTag,
      },
    });

    // Deploy the image to the EKS cluster
    const deployment = new eks.KubernetesManifest(this, 'MyDeployment', {
      cluster,
      manifest: [
        {
          apiVersion: 'apps/v1',
          kind: 'Deployment',
          metadata: { name: 'my-deployment' },
          spec: {
            replicas: 3,
            selector: { matchLabels: { app: 'my-app' } },
            template: {
              metadata: { labels: { app: 'my-app' } },
              spec: {
                containers: [
                  {
                    name: 'my-container',
                    image: `${repository.repositoryUri}:${imageTag}`,
                  },
                ],
              },
            },
          },
        },
      ],
    });
  }
}
