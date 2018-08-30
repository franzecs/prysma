// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyACN5soXwsXyM3HodmNPeKAyG33UAz1Sxw",
    authDomain: "prysmabr.firebaseapp.com",
    databaseURL: "https://prysmabr.firebaseio.com",
    projectId: "prysmabr",
    storageBucket: "prysmabr.appspot.com",
    messagingSenderId: "1009528552168"
  },
  URL:{
    url1:"",
    url2:""
  },
  PATH_USUARIO: "/usuarios",
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
