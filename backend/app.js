const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const path = require('path');

const userRoutes = require("./routes/user");
const urlRoutes = require("./routes/shortener")
const URL = require("./models/shortURL");

const app  = express();

mongoose.connect("Your MongoDB Connection String",{
    useNewUrlParser: true, useUnifiedTopology: true
  })
    .then(()=>{
        console.log("Connected to Database");
    })
    .catch(()=>{
        console.log("Connection Failed");
    });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));
// app.use("/", express.static(path.join(__dirname, "angular")));  Uncomment for prod

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods","GET, POST, PATCH, DELETE, OPTIONS");
    res.setHeader('Content-Type', 'application/x-www-form-urlencoded');
    next();
});

app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await URL.findOne({ short: req.params.shortUrl })
    if (shortUrl == null) return res.sendStatus(404)
    shortUrl.clicks++
    shortUrl.save()
    res.status(301).redirect(shortUrl.full);
})

app.use("/api/user", userRoutes);
app.use("/api/url", urlRoutes);
// app.use((req, res, next) => {
//     res.sendFile(path.join(__dirname,"angular", "index.html"));
// })

module.exports = app;
