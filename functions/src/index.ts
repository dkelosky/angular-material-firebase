import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

// const serviceAccount = require("../kelosky-check-in-firebase-adminsdk.json");

const app = admin.initializeApp({
  // credential: admin.credential.cert(serviceAccount),
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://kelosky-check-in.firebaseio.com',
});

export const notifyParent = functions.https.onCall(async (data, context) => {
  console.log(`data will follow`);
  console.log(data);
  console.log(app)

  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }

  let doc;
  try {
    // await admin.firestore().doc(`users/${data.user}`).set({test: 1});
    doc = await admin.firestore().doc(`users/${data.user}`).get();
  } catch (err) {
    console.error(`Error getting users/${data.user}`);
    console.error(err);
  }

  if (doc) {
    console.log(`Token is ${doc.data()!.token}`)

    try {
      await admin.messaging().send({
        token: doc.data()!.token,
        data: {
          value: `this is your data`,
        },
      });
    } catch (err) {
      console.error(`Message send error`);
      console.error(err);
    }
  } else {
    console.warn(`Did not find doc for users/${data.user}`);
  }

});

// TODO(Kelosky): topic messaging
