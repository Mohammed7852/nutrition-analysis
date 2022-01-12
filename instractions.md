
## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


### to test app build locally 
1. using http server 
   1. npm install http-server -g
   2. ng build dtr-app --base-href /dist/nutrition-analysis/ --prod --aot
   3. http-server dist/nutrition-analusis
2. using node server 
   1. create server.js
   `
      const express = require('express');
      const port = process.env.PORT || 3010;
      const app = express();

app.use('/', express.static(__dirname  + '/dist/app/'));

app.use('*', function (req, res, next) {
// Just send the index.html for other files to support HTML5Mode
res.sendFile('index.html', {root: __dirname + '/dist/app/'});
});

app.listen(port);
console.log('current directory is', __dirname);
console.log('server start on port ' + port);
   `
