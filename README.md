DigHub PWA Starter App
======================

A blank slate PWA built on Ionic v5, Angular v10, and Firebase.

Running the app locally
-----------------------

```shell script
npm install
npm run start
```

Configuration
-------------

### Firebase

The app starter ships connected to sample Firebase instance so it will run 
out of the box. Please be aware that this data is reset daily, so please only
use this instance to confirm that your app is installed properly.

1. Create a new Firebase instance at https://console.firebase.google.com/
2. Enable Firebase authentication (and the Google provider to use the starter code)
3. Enable Firestore
4. Enable Storage
5. Create a new app 
2. Copy the Firebase configuration object from your app to the `firebase` section in `src/environments/environment.ts`

Firebase has already been initialized in the starter app. You just need to point it to your project in `/.firebaserc`:

```
{
  "projects": {
    "default": "your-project-id"
  }
}
```

### Site

You set the default state for your app in the `src/environments/environment.ts`:

```
  defaultState: {
    title: 'DigHub PWA Starter'
  },
```

Testing your app
----------------

The app is already setup for testing with Jasmine (default Angular configuration). Run this command 
in the app root to test the Ionic app, or in the `/functions` root to test the functions.

```
npm run test
```

Deploying your app
------------------

You can deploy your app to Firebase with the following command:

```
npm run deploy
```

If you want a full deploy which updates the functions, rules, and indexes run:

```
npm run deploy:all
```










