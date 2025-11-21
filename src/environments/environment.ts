// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // 🔑 Replace 'YOUR_DEV_API_URL' with the actual API endpoint for local development

  apiUrl: 'https://platformbackend-tour.onrender.com',
  // apiUrl: 'https://localhost:7274',
};
// apiUrl: 'https://platformbackend-tour.onrender.com/'

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if a error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
