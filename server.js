/**
 * Created by robertmujica on 18/10/2014.
 */
var http = require('http');
var url = require('url');
var express = require('express');

var sendgrid_username   = "azure_fb9eccbc0c7eccfdbe21792dc8f01dbb@azure.com";
var sendgrid_password   = "ea3zzNaeUWbtY8F";
var to                  = "irishpharmacyfinder@gmail.com";

process.on('uncaughtException', function (error) {
    console.log(error.stack);
});

var app = express();
// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser')
app.use(bodyParser.urlencoded())

app.post('/email', function(req, res) {
    var sendgrid  = require('sendgrid')(sendgrid_username, sendgrid_password);

    var payload   = {
        to      : 'irishpharmacyfinder@gmail.com',
        from    : 'irishpharmacyfinder@gmail.com',
        subject : 'Feedback Website',
        text    : "Name =" + req.body.name + " Phone= " + req.body.phone  + " email= " + req.body.email + " Message = " + req.body.message
    }

    sendgrid.send(payload, function(err, json) {
        if (err) { console.error(err); }
        console.log(json + " " + payload.text);
    });

    res.type('json');
    res.send('OK');
})

//var port = process.env.PORT || 1337;
app.listen(process.env.PORT || 1337);