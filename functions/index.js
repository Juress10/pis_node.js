const functions = require('firebase-functions');
const admin = require('firebase-admin');
const express = require('express');
const app = express();
require('./routes')(app);

var serviceAccount = require("./permissions.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://ezcar-insurance.firebaseio.com"
  });

const db = admin.firestore();
const cors = require('cors');
app.use( cors( {origin : true} ) );





exports.app = functions.https.onRequest(app);