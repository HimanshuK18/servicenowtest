 #Start our Dockerfile with a FROM statement. This is where you specify your base image.
FROM node:16-alpine
#The RUN statement will allow us to execute a command for anything you want to do. 
#We created a subdirectory /usr/src/app that will hold our application code within the docker image.
RUN mkdir -p /usr/src/app
ENV NODE_ENV production
#WORKDIR instruction establishes the subdirectory we created as the working directory for any RUN, 
#CMD, ENTRYPOINT, COPY and ADD instructions that follow it in the Dockerfile.
# The ENV instruction sets the environment variable <key> to the value <value>.
WORKDIR /usr/src/app
#lets us copy files from a source to a destination. We copied the contents of our node application code
# from our current directory to the working directory in our docker image
COPY --chown=node:node . .
RUN npm ci --only=production
# The EXPOSE instruction informs Docker that the container listens on the specified
# network ports at runtime. We specified port 4000.
EXPOSE 4000
#USER Dockerfile directive only ensures that the process is owned by the node user.Security enhancement
#USER node
# statement specifies the command to start our application. This tells Docker how to run your application. Here we use node server.js which is typically how files are run in Node.js.
CMD [ "node", "dist/index.js" ]
#RUN npm run build && npm run start