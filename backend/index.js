var express = require("express");
var cors = require('cors')
var mongojs = require('mongojs')
var csv = require('csvtojson');
var bodyParser = require('body-parser')

var app = express();
var db = mongojs('db', ['reservation'])

const csvFilePath='./assets/user.csv';

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get("/url", (req, res) => {
    csv().fromFile(csvFilePath).then((jsonObj) => {
        res.json({msg: jsonObj})
    });
});

app.post("/insert", (req, res) => {
    db.reservation.save(req.body, (err) => {
        if (err) {
            console.log("อุ๊บบ ! มีบางอย่างผิดพลาด");
        } else {
            res.json({msg: true});
        }
    });
});


app.listen(3000, () => {
 console.log("Server running on port 3000");
});

