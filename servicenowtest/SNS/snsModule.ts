import  { SNSClient } from "@aws-sdk/client-sns";
import  AWS from "aws-sdk";
// Set the AWS Region.

const env = {
  PROFILE: "default",
  REGION: "ap-northest-1",
  SNS: {
    PROTOCOL: "EMAIL",
    TOPIC_ARN: "arn:aws:sns:ap-northeast-1:350687266438:TopicTest_FIFO.fifo",
  },
};
const credentials = new AWS.SharedIniFileCredentials({
    profile: env.PROFILE,
  });
const REGION = "ap-northest-1"; //e.g. "us-east-1"
// Create SNS service object.
const snsClient = new SNSClient({ region: REGION });
export  { snsClient };

