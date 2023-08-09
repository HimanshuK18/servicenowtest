import { Stack, StackProps, Duration } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { EmailSubscription } from "aws-cdk-lib/aws-sns-subscriptions";
import { aws_s3 as s3 } from 'aws-cdk-lib';
import { aws_sqs as sqs } from 'aws-cdk-lib';
import { aws_sns as sns } from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class AwsCdkCodeStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const s3Bucket = new s3.Bucket(this, 'MyFirstBucket', {
      versioned: true
    });
    const queue = new sqs.Queue(this, 'CdkInitQueue', {
      visibilityTimeout: Duration.seconds(300)
    });

    const topic = new sns.Topic(this, 'Topic', {
      displayName: 'Customer subscription topic',
    });
    topic.addSubscription(new EmailSubscription("himanshu.khurana@live.com"));
  }


}


