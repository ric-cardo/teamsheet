// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  firebase:{
    apiKey: "AIzaSyBDy2kf5mOkP-Vwiws1dN-oFGOveS_40Hk",
    authDomain: "node-2a9ca.firebaseapp.com",
    databaseURL: "https://node-2a9ca.firebaseio.com",
    storageBucket: "node-2a9ca.appspot.com",
    messagingSenderId: "804021294410",
    functions:"http://192.168.1.10:5000/node-2a9ca/us-central1",
  }

};
