import kafka from "kafka-node"

const client = new kafka.KafkaClient({ kafkaHost: '127.0.0.1:2181' });


const topics = [
    {
        topic: "webevents.dev"
    }
];
const options = {
    autoCommit: true,
    fetchMaxWaitMs: 1000,
    fetchMaxBytes: 1024 * 1024,
    encoding: "buffer"
};

const consumer = new kafka.Consumer(
    client,
    [
        { topic: topics[0].topic, partition: 0 }, { topic: 't1', partition: 1 }
    ],
    {
        autoCommit: true,// if it is false we have write code to auto commit
        autoCommitIntervalMs: 5000
    }
);

consumer.on("message", function (message: any) {
    var buf = new Buffer(message.value, "binary");
    var decodedMessage = JSON.parse(buf.toString());
   /* return Event.create({
        id: decodedMessage.id,
        type: decodedMessage.type,
        userId: decodedMessage.userId,
        sessionId: decodedMessage.sessionId,
        data: JSON.stringify(decodedMessage.data),
        createdAt: new Date()
    });*/
});