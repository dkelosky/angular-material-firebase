import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

const app = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: 'https://kelosky-check-in.firebaseio.com',
});

export const notifyParent = functions.https.onCall(async (data, context) => {
  console.log(`data will follow`);
  console.log(data);
  console.log(app)

  if (!context.auth) {
    throw new functions.https.HttpsError('failed-precondition', 'The function must be called ' +
      'while authenticated.');
  }

  let userDoc;
  let childDoc;
  try {
    userDoc = await admin.firestore().doc(`users/${data.user}`).get();
  } catch (err) {
    console.error(`Error getting users/${data.user}`);
    console.error(err);
    throw new functions.https.HttpsError(`not-found`, `User not found`);
  }

  try {
    childDoc = await admin.firestore().doc(`users/${data.user}/children/${data.child}`).get();
  } catch (err) {
    console.error(`Error getting users/${data.user}/children/${data.child}`);
    console.error(err);
    throw new functions.https.HttpsError(`not-found`, `Child not found`);
  }

  console.log(`Token is ${userDoc.data()!.token}`)

  try {
    await admin.messaging().send({
      token: userDoc.data()!.token,
      // data: {
      //   value: `this is your data`,
      // },
      notification: {
        title: childDoc.data()!.name,
        body: data.message
      },
      webpush: {
        fcmOptions: {
          link: "https://dummypage.com"
        }
      }
    });
  } catch (err) {
    console.error(`Message send error`);
    console.error(err);
  }

});
