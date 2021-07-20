'use strict'
const express = require("express");
const app = new express();
const naturalLanguageUnderstanding = require('./NaturalLanguageUnderstanding.js'); 
//initialze the envars

const dotenv = require("dotenv");
dotenv.config();

//initialize the IBM natural lang understanding service

const NATURAL_LANG_UND_VERSION_LIB = "ibm-watson/natural-language-understanding/v1";

let api_key = process.env.API_KEY;

let api_url = process.env.API_URL;

const { IamAuthenticator } = require('ibm-watson/auth');

const NATURAL_LANG_UND_INIT_OBJECT = {
    version: "2021-03-25",

    authenticator: new IamAuthenticator({
      apikey: api_key,
    }),

    serviceUrl: api_url,
  }

const nlu = new naturalLanguageUnderstanding(NATURAL_LANG_UND_INIT_OBJECT, NATURAL_LANG_UND_VERSION_LIB);


app.use(express.static("client"));

const cors_app = require("cors");

//CORS
app.use(cors_app());

//render static page
app.get("/", (req, res) => {
  res.render("index.html");
});


//get NLU emotions from TEXT
app.get("/text/emotion", ( req, res) => {
		nlu.analyzeParams = {text: req.query.text, features: {emotion:{}}} 		
     nlu.getDocumentEmotion(res);
});

//get NLU sentiment from TEXT 

app.get("/text/sentiment", (req, res) => {
		nlu.analyzeParams = {text: req.query.text, features: {sentiment:{}}} 		
     nlu.getSentimentLabel(res);
});

//get NLU emotions from URL

app.get("/url/emotion", (req, res) => {
		nlu.analyzeParams = {url: req.query.url, features: {emotion:{}}} 		
     nlu.getDocumentEmotion(res);
});

//get NLU sentiment from  URL

app.get("/url/sentiment", (req, res) => {
		nlu.analyzeParams = {url: req.query.url, features: {sentiment:{}}} 		
     nlu.getSentimentLabel(res);
});



let server = app.listen(8000, () => {
  console.log("Listening", server.address().port);
});
