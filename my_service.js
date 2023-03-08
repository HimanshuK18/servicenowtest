const grpc = require('grpc')
const protoLoader = require('@grpc/proto-loader')

const packageDefinition = protoLoader.loadSync('my_service.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const my_service = grpc.loadPackageDefinition(packageDefinition).my_service

function myMethod(call, callback) {
  const message = call.request.message;
  callback(null, { message: `Hello, ${message}!` });
}

function main() {
  const server = new grpc.Server();
  server.addService(my_service.MyService.service, { myMethod: myMethod });
  server.bind('0.0.0.0:50051', grpc.ServerCredentials.createInsecure());
  server.start();
}

main();
