import kafka from 'kafka-node';
const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });

const producer = new kafka.Producer(client);

// First, wait for the producer to be ready
producer.on('ready', function () {
  // Then, create a message object with the desired topic, partition, and message contents
  const message = {
    topic: 'my-topic',
    partition: 0, // Set the partition number here
    messages: ['Hello, Kafka!'],
  };

  // Finally, send the message using the producer's send method
  producer.send([message], function (err: any, result: any) {
    console.log(err || result);
    process.exit();
  });
});

// Handle errors
producer.on('error', function (err: any) {
  console.error(err);
});
