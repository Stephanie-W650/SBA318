const express = require ('express')
const app = express()
const PORT = 3000;

const usersRouter = require('./routes/users')
const postsRouter = require('./routes/posts')

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

app.use('/api/users', usersRouter)
app.use('/api/posts', postsRouter)

app.get('/', (req, res) => {
    res.send('Welcome to the API!')
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
    ]
  }

  )
})

app.listen(PORT, () => {
    console.log('Server is listening on PORT:${PORT}')
})
