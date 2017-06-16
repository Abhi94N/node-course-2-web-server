const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;//stores all env variable in key value pairs and use of or for defailt

var app = express();

hbs.registerPartials(__dirname + '/views/partials');//

app.set('view engine', 'hbs'); //using handlebars as the view engine


//middleware method to log changes
//next - when middleware function has been complete
app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log); //req.method returhs the HTTP request
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('Unable to append to server.log');
    }
  });
  next();//must be called to end middleware
});


//maintenance middleware
// app.use((req, res, next) => {
//   res.render('maintenance.hbs', {
//     maintenanceHeader: 'We will be right back',
//     maintenanceMsg: 'The site is currently being updated. We will be back soon.'
//   });
// });

app.use(express.static(__dirname + '/public'));//Middleware

//adding a helper allows for functions in hbs
//params name of function and function
hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear()
});

//uppercase
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

//http handler register
app.get('/', (req, res) => {//first parameter is url/path
  //request stores information of request coming in
  //response for methods available to determine what the return

  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Hi Welcome to the million dollar website'
  })
});

app.get('/about', (req, res) => {
  //params: viewengine template name. data json
  res.render('about.hbs', {
    pageTitle: 'About Page'
  });
});


app.get('/projects', (req, res) => {
  //params: viewengine template name. data json
  res.render('projects.hbs', {
    pageTitle: 'Project Page',
    projectMessage: 'Portfolio Page Here'
  });
});

//Challenge
//create a route /bad -send back json with errorMessage
app.get('/bad', (req,res)=> {
  res.send({
    errorMessage: 'Unable to handle request'
  })
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);//printed in node cmd

}); //bind the application to a port for the http handler to run
//now will allow to see website locally using localhost:3000
