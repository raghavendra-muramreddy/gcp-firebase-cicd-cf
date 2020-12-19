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
    readCollectionPath();
    response.send("Hello from Firebase!");
});
async function readCollectionPath() {
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log("Unable to scan directory: " + err);
        } else {
            saveCollection(files).then(collectionsList => {
                console.log("total saved collections:" + collectionsList.length);
                console.log("****************process end***************");
                return collectionsList;
            });

        }
        return "";
    });
    return "";
}
function saveCollection(files) {
    for (fileIndex in files) {
        var file = files[fileIndex];
        var lastDotIndex = file.lastIndexOf(".");
        var collectonName = file.substring(0, lastDotIndex);
        //deleteCollectionIfExists(collectonName);
        var menu = require("./data/" + file);
        var savedcollectionsRef = []
        for (menuIndex in menu) {
            var obj = menu[menuIndex];
            collectonName = file.substring(0, lastDotIndex);
            firestore.collection(collectonName).doc(obj.itemID).set(obj).then(docref => {
                savedcollectionsRef.push(docRef);
            });

        }
        return savedcollectionsRef;

    }
    return "";
}
