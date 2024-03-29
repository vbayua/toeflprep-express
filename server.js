require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// database connection
const db = require('./app/models');
const Role = db.role;

// Call the connection
db.mongoose.connect(`mongodb+srv://${process.env.MONGODB_URI}`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Successfuly connected to mongodb instance');
  initial();
}).catch((error) => {
  console.error('Connection error', error);
  process.exit();
});

// Set app origin URL
// const corsOptions = {
//   origin: ['http://localhost:9000', 'http://localhost:4000']
// };

// app.use(cors(corsOptions));
app.use(cors());

// parse request to json type
app.use(express.json());

// parse request of content type application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true, limit: '50mb', parameterLimit: 1000000 }));

// Upload FIle
const upload = require('./app/routes/upload.routes')

app.use(upload)

// Example simple route
app.get('/', (requests, response) => {
  response.json({
    message: 'WELCOME TO UCIC TOEFL PREPARATION TEST',
  });
});

// Routes
require('./app/routes/auth.routes')(app);
require('./app/routes/user.routes')(app);
require('./app/routes/admin.routes')(app);


// set port and listen to requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port : ${PORT}`);
});

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({ name: 'user' }).save(err => {
        if (err) { console.log('error', err) }
        console.log('added user to roles collection');
      });

      new Role({ name: 'moderator' }).save(err => {
        if (err) { console.log('error', err) }
        console.log('added moderator to roles collection');
      });

      new Role({ name: 'admin' }).save(err => {
        if (err) { console.log('error', err) }
        console.log('added admin to roles collection');
      });
    }
  })
}