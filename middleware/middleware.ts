import express from 'express';
const router = express.Router();
const app = express();

/*
Execute any code.
Make changes to the request and the response objects.
End the request-response cycle.
Call the next middleware function in the stack.

An Express application can use the following types of middleware:
Application-level middleware
Router-level middleware
Error-handling middleware
Built-in middleware
Third-party middleware

*/
//application level
app.use((req, res, next) => {
    console.log('Time:', Date.now())
    next();
  });

  //application level URL specific middleware with 2 functions
  app.use('/user', (req, res, next) => {
    console.log('Request URL:', req.originalUrl)
    next();
  }, (req, res, next) => {
    console.log('Request Type:', req.method);
    next();
  });

app.use((req, res, next) => {
    console.log("Request Middleware");
    next();
});
const requireJsonContent = () => {
    return (req: any, res: any, next: any) => {
        if (req.headers['content-type'] !== 'application/json') {
            res.status(400).send('Server requires application/json');
        } else {
            next();
        }
    }
}




app.get('/', (req, res, next) => {
    console.log("get '/' Middleware");
    res.send('Welcome Home.');
    next();
});

app.get('/m', requireJsonContent(), (req, res, next) => {
    res.send('You sent JSON');
});

app.get('/error', (req, res, next) => {
    next(new Error('I am passing you an error!'));
});


function interceptAllResponses(req: any, res: any, next: any) {
    // Perform some operation on the response object here
    console.log('Response middleware intercepted!');
    next(); // Pass control to the next middleware function in the chain
  }
  
  // Place your middleware function at the end of the chain
  app.use(interceptAllResponses);
  
app.use((err: any, req: any, res: any, next: any) => {
    console.log(err);
    if (!res.headersSent) {
        res.status(500).send(err.message);
    }
    next();
});


app.listen(4000);