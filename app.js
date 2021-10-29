const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejs = require('ejs');
const Photo = require('./models/Photo');

const app = express();

mongoose.connect('mongodb://localhost/agency-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Template Engine
app.set('view engine', 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/', async(req, res) => {
  const photos = await Photo.find({})
  res.render('index', {
    photos
  });
});

app.get('/photos/:id', async (req, res) => {
  //console.log(req.params.id)
  const photo = await Photo.findById(req.params.id)
  res.render('photo', {
    photo
  })
});

 
app.get('/add', (req, res) => {
  res.render('add');
  
});

app.get('/services', (req, res) => {
  res.render('services');
  
});

app.get('/team', (req, res) => {
  res.render('team');
  
});

app.get('/about', (req, res) => {
  res.render('about');
  
});

app.get('/about', (req, res) => {
  res.render('about');
  
});

app.post('/photos', async (req, res) => { 
  await Photo.create(req.body)            
  res.redirect('/')
});


const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı..`);
});
