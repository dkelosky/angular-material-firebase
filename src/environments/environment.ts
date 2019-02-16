// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyCcaa3qLSyksED14s7-81vc2pmCrJuncfs',
    authDomain: 'kelosky-check-in.firebaseapp.com',
    databaseURL: 'https://kelosky-check-in.firebaseio.com',
    projectId: 'kelosky-check-in',
    storageBucket: 'kelosky-check-in.appspot.com',
    messagingSenderId: '223666143636'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
