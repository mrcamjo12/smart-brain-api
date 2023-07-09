const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require ('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
      connectionString: process.env.cil0i4dph6eg6keodkcg-a.oregon-postgres.render.com/mydb_ums5, 
      ssl: {rejectUnauthorized: false},
      host : process.env.dpg-cil0i4dph6eg6keodkcg-a,
      port : 5432,
      user : process.env.mydb_ums5_user,
      password : process.env.CI2Sr6LRPUUDqP6rpKfoeUVT19VJotHm,
      database : process.env.mydb_ums5
    }
  });

const app = express();

app.use(cors())
app.use(bodyParser.json());

app.get('/', (req, res) => {res.send('success');})
app.post('/signin', (req, res) => { signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db)})
app.put('/image', (req, res) => { image.handleImage(req, res, db)})
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`)
})

