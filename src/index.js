import React from 'react';
import ReactDom from 'react-dom';

import App from './component/app';

ReactDom.render(
  <App/>,
  document.getElementById('app')
)

if (module.hot) {
    module.hot.accept('./component/app', function(){
        let newApp = require('./component/app').default;
        render(newApp);
    });
}
