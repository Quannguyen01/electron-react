# Setting up Electron and React
###### 8/17/2016

  Electron is the new cool way to build a desktop application using Web technologies. Now you can use HTML, CSS, and JavaScript to develop desktop app across all platforms with just one code-base.

  React is a powerful JavaScript library to build user interface. It focuses on creating modules or components UI that can be reuse and manage their own states.

  Both React and Electron are awesome and I want to combine those two to create a killer app. However, setting it up, like any programming projects that you ever work on, is a PITA. It took me a while in order to figure out how to fit those two together nicely.

  ### Step 0: Initial Electron setup
  To begin, let's clone *Electron-quick-start* repository from Electron GitHub and install its dependencies:
  ```bash
# Clone the repo
git clone https://github.com/electron/electron-quick-start
# Go into the repository
cd electron-quick-start
# Install dependencies
npm install
  ```
  For more information about Electron-quick-start's structure, you can go [here](http://electron.atom.io/docs/tutorial/quick-start/).

  ### Step 1: Setting React up in Electron
  Now let's get to the fun stuff. In order to add React to our Electron project, we need to have `react`, `react-dom` packages from npm and `babel-preset-react` in order to read React's JSX format. (You can find more about JSX and React [here](https://facebook.github.io/react/docs/getting-started.html)). The first two packages you can install using `npm install` command:
  ```
  npm install --save-dev react react-dom
  ```
  In order to get `babel-preset-react` you have to install `babel`-related packages:
  ```
  npm install --save-dev babel-core babel-loader babel-cli babel-preset-react babel-preset-es2015
  ```
  `babel-core` and `babel-loader` are used to trans-pile JS flavor to common ES 5. `babel-preset-react` is the preset that has all JSX stuffs for React. `babel-preset-es2015` is used here since I want to take advantage of features in ES-2015. Now we can go and create our `.babelrc` to include `react` and `es2015` presets.
  ```json
{
  "presets": [
    "react",
    "es2015"
  ]
}
  ```
  We can create our first component:
  ```javascript
// components/app.js
import React, { Component } from 'react';

class App extends Component {
  render() {
    return <h1>Hello from React!</h1>
  }
}

export default app;
  ```
  And then render the component using `react-dom`:
  ```javascript
// index.js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app'

ReactDOM.render(
  <App/>,
  document.getElementById('app');
)
  ```
  And in our `index.html` we can add:
  ```html
<body>
  <div id="app"></div>
  <script src="./node_modules/babel-core/browser.js"></script>
  <script type="text/babel" src="./index.js"></script>
</body>
  ```
  This will render our `App` component when we run `npm run start`. However this is not ideal to have JSX trans-pile at runtime. We need to bundle up our JavaScript. To do that, we are going to use `Webpack`.

  ### Step 2: Setting up Webpack
  Webpack is a module bundler. It takes our modules with dependencies and generates static files represent those modules.

  To set up, first we need to install `webpack` package using `npm install`:
  ```bash
npm install --save-dev webpack
  ```

  Now in order for webpack to run, we need to have a `webpack.config` file. `webpack.config` uses CommonJS so we cannot take advantage of ES6. Instead, we have to go back to ugly ES 5 code with all the `var`.
  ```javascript
// webpack.config.js
var webpack = require('webpack');

var config = {
  context: __dirname + '/src',
  entry: 'index.js',

  output: {
    filename: 'index_bundle.js',
    path: __dirname + '/dist'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ]
  }
};

module.exports = config;
  ```

  Details on what's on a webpack config file can be found [here](http://webpack.github.io/docs/tutorials/getting-started/). The gist of the config file is that it starts `index.js` file, get all of its dependencies and then combine all of them into `index_bundle.js` which is stored in a `dist` folder. The loader for all `js` file trans-piles all JSX and ES2015 to common JavaScript in `index_bundle.js`.

  We need to add bundle command `webpack -p` into `package.json`:
  ```json
"scripts": {
  "start": "electron .",
  "build": "webpack -p"  
},
  ```
  So now if we run `npm run build` it will create for us a `dist` folder with `index_bundle.js` file inside. We can use that file to replace two `<script>` lines in our `index.html`:
  ```html
<body>
  <div id="app"></div>
  <script src="./dist/index_bundle.js"></script>
</body>
  ```
  Now if you run `npm run start` it will give you the same result, but now JSX is not trans-piled at runtime anymore. But we are not done yet. It will be much nicer if Electron can automatically refresh whenever we update our components.
