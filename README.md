# Angular Material Firebase Boiler Plate

This is a boiler plate project with a "users" service to show a logon screen when no logon has occurred or
otherwise show content for a logged in user.

## Technologies

* [TypeScript](https://www.typescriptlang.org/) - language used
* [Angular](https://angular.io/) - UI framework
* [Angular Material](https://material.angular.io/) - UI styling 
  * [Typography](https://material.angular.io/guide/typography) - nice font in web pages
  * [Components](https://material.angular.io/components/categories) - buttons, accordions, forms, etc
* [flex-layout](https://github.com/angular/flex-layout) - web page layout (super confusing)
* [Firebase](https://firebase.google.com/) - platform for cloud applications
  * [FirebaseUI](https://firebase.google.com/docs/auth/android/firebaseui) - authentication UI
  * [Firestore](https://firebase.google.com/docs/firestore/) - awesome data base
  * [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging/) - easily send web notifications
  * [Cloud Functions for Firebase](https://firebase.google.com/docs/functions/) - server side operations (without management responsibilities)
  * [Firebase Hosting](https://firebase.google.com/docs/hosting/) - host static HTML

## Setup

Plenty of details to work through (will fill this out more later)

* `git clone`
* `npm install`
* `npm start`
* Create project in fire base
* Get web setup and add to `src/environment.ts`
* Enable google auth
* Enable firestore in test mode
* `firebase init --add <project-name>`
* `firebase deploy`
