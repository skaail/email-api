const express = require('express');
const app = express();
var unirest = require('unirest');

const port = process.env.port || 3000;

app.use(express.json());

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', (req, res) => {
    res.send('Welcome')
})

app.post('/list/:email/:id', (req, res) => {
    console.log(req.params.id);
    res.send(req.params.email); 
    var req = unirest('POST', 'https://markflush.com/secure/public/frontend/forms/'+ req.params.id+'/save?=')
    .headers({
        'Content-Type': 'application/json'
      })
      .send(JSON.stringify({
        "EMAIL": req.params.email
      }))
    .end(function (res) { 
      if (res.error) throw new Error(res.error); 
      console.log(res.raw_body);
    });
  
    res.status(201)
})


app.listen(3000, () =>{
    console.log('listening on http://localhost:3000')
})
