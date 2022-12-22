require('dotenv').config();

const mongoose    = require('mongoose');
const express     = require("express");
var cors          = require('cors');
const bodyParser  = require('body-parser');

const swaggerJsDoc  = require('swagger-jsdoc');
const swaggerUi     = require('swagger-ui-express');

const rootRouter            = require("./src/routes/rootRouter");
const teacherRoute          = require("./src/routes/teacherRouter");
const refreshRouter         = require("./src/routes/refreshRouter");
const logoutRouter          = require("./src/routes/logoutRouter");
const getAllTeachersRouter  = require("./src/routes/getAllTeachersRouter");
const loginRouter           = require("./src/routes/loginRouter");
const registerRouter        = require("./src/routes/registerRouter");
const courseRoute           = require("./src/routes/courseRouter");
//const studentRoute          = require("./src/routes/studentRouter")
const usersRouter           = require("./src/routes/usersRouter");
const authRouter            = require("./src/routes/authRouter");

const corsOptions        = require('./src/config/corsOptions');
const dbConnectionLink   = require("./src/config/databaseConfig");
const credentials        = require('./src/middleware/credentials');
const cookieParser       = require('cookie-parser');

const errorHandler = require("./src/middleware/errorHandler");


const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.2',
    info: {
      version: "0.0.1",
      title: "Serwis z treściami dydaktycznymi - API",
      description: "Dokumentacja całego API dla strony",
      servers: ["http://localhost:3001","https://serwis-z-tresciami.herokuapp.com/"]
    },
    components: {
      securitySchemes: {
          bearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT',
          }
      }
  },
  security: [{
      bearerAuth: []
  }]
  },
  apis: ["./src/routes/*.js", "./src/models/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

mongoose.connect(process.env.MONGODB_URI || dbConnectionLink, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
  console.log('[server.js]: MongoDB connected successfully');
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cookieParser());

// JWT
app.use(credentials);
app.use(cors(corsOptions));

app.use('/', rootRouter);

//Routes for teacher
app.use('/api/teacher', teacherRoute);

//Routes for course
app.use('/api/courses', courseRoute);

//Routes for student
//app.use('/api/student', studentRoute);

app.use('/api/auth', authRouter);

app.use('/register', registerRouter);
app.use('/user/login', loginRouter);
app.use('/refresh', refreshRouter);
app.use('/logout', logoutRouter);
app.use('/test', getAllTeachersRouter);

app.use('/api/users', usersRouter);


if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  console.log('[server.js]: App is set to PRODUCTION');
} else {
  console.log('[server.js]: App is set to DEVELOPMENT');
}



//MUST BE AT THE END OF FILE heroku deploy react routing fix
app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/build/index.html`);
});

app.use(errorHandler);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`[server.js]: Server is running at port ${port}`);
});
