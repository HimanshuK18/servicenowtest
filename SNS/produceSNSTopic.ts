// Import required AWS SDK clients and commands for Node.js
import { CreateTopicCommand } from "@aws-sdk/client-sns";
import { snsClient } from "./snsModule";

// Set the parameters
const params = { Name: "TopicTest_FIFO.fifo" }; //TOPIC_NAME

const send = async () => {
  try {
    const data = await snsClient.send(new CreateTopicCommand(params));
    console.log("Success.", data);
    return data; // For unit tests.
  } catch (err: any) {
    console.log("Error", err.stack);
  }
};
export  { send };

//https://examples.javacodegeeks.com/publishing-and-subscribing-to-aws-sns-messages-with-node-js/

