const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/public/partials')


//registerHelper is used after app.set();

// hbs.registerHelper('uppercase', (text) => {
//     return text.toUpperCase();
// })

app.use((req, res, next) => {

    let timestamp = new Date().toString();
    let log = `${timestamp} - ${req.method} - ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log+'\n', (err) => {
        console.log("Error encountered while logging")
    })
    next();
});

app.use((req, res, next) => {
    let timestamp = new Date().toString();
    let log = `${timestamp} - ${req.method} - ${req.url}`
    console.log(log);
    fs.appendFile('maintenance.log', log+'\n', (err) => {
        console.log("Error encountered while logging")
    })
    res.render('maintenance.hbs');
    //next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.send("Hello APIS");
});

app.get('/about', (req,res) => {
    res.render('about.hbs', {
        pageName : 'About Page',
        currentYear : new Date().getFullYear()
    })
})

app.listen(port, () => {
    console.log("Server is listening to "+port);
});