const functions = require('firebase-functions');
var admin = require("firebase-admin");
const path = require("path");
const fs = require("fs");
var serviceAccount = require("./api-key.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://playground-s-11-35d1c8bf-default-rtdb.firebaseio.com"
});

const firestore = admin.firestore();

const directoryPath = path.join(__dirname, "data");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", { structuredData: true });
    firestore.collection("demo").doc("doc").set({"name":"Raghava"}).then(docref => {
        console.log("**********document uploaded*********");
        response.send("success!");
        
    }).catch(error);
    response.send("Hello from Firebase!");
});
 
