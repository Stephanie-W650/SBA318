const express = require ('express')
const app = express()
const PORT = 3000;

const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')
const commentsRouter = require('./routes/comments')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));
// Logging Middlewaare
app.use((req, res, next) => {
    const time = new Date();
  
    console.log(
      `-----
  ${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
    );
    if (req.body && Object.keys(req.body).length > 0) {
      console.log("Containing the data:");
      console.log(`${JSON.stringify(req.body)}`);
    }
    next();
  });

  app.use((req, res, next) => {
    console.log(`Middleware executed`)
    next();
  });
  
  //app.use(middle)




app.get('/index', (req, res) => {
res.render('index')
})

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)
app.use('/api/comments', commentsRouter)


app.get('/', (req, res) => {
    res.send('Welcome to the API!')
})

app.get('/user/:firstName', (req, res) => {
  console.log('Params:', req.params)
  console.log('Queries:', req.query )
  res.send(`my name is ${req.params.firstName} ${req.query.lastName}`);
})

app.get('/api', (req, res) => {
  res.json({
    link: [
      {
        href: '/api/users',
        type: ['GET', 'POST']
      },
      {
        href: '/api/users/:id',
        type: ['GET', 'PATCH', 'DELETE']
      },
      {
        href: '/api/posts',
        type: ['GET', 'POST']
      },
      {
        href: '/api/posts/:id',
        type: ['GET', 'PATCH', 'DELETE']
      },
      {
        href: '/api/comments',
        type: ['GET', 'POST']
      },
      {
        href: '/api/comments/:id',
        type: ['GET', 'PATCH', 'DELETE']
      },
    ]
  }

  )
})

app.use((err, req, res, next) => {
  res.status(400).send(err.message);
  //next();
})


app.listen(PORT, () => {
    console.log(`Server is listening on PORT:${PORT}`)
})
