import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://kelosky-check-in.firebaseio.com/',
});

export const notifyParent = functions.https.onCall((data, context) => {
  console.log(`data is`);
  console.log(data);

  if (!context.auth) {
    // Throwing an HttpsError so that the client gets the error details.
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }

});

// TODO(Kelosky): topic messaging
