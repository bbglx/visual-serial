import $ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import { FormattedMessage } from 'react-intl';
import {
  HashRouter as Router,
  Route,
  Link
} from 'react-router-dom';
import { Redirect } from 'react-router';
import { Provider } from 'react-redux';

import IntlWrapper from './src/js/Intl/IntlWrapper';

import NavBar from './src/js/navbar';
import { importMiddleware } from './src/js/serial/middleware';

import { configureStore } from './src/js/store';


// Initialize store
const store = configureStore(window.__INITIAL_STATE__);
serialInit(store);

import SerialWidget from './src/js/serial/serialWidget';
import onWindowResize from './src/js/actions';
import { serialInit } from './src/js/serial/serial';

// Import Routes
// import routes from './routes';


// export default function App(props) {
//   return (
//     <Provider store={props.store}>
//       <IntlWrapper>
//         <Router history={browserHistory}>
//           {routes}
//         </Router>
//       </IntlWrapper>
//     </Provider>
//   );
// }

const Docs = () => (
  <div>
    <div>
      <span>hello world</span> hello
    </div>
    <div>
      <p>hello world</p>
    </div>
    <div>
      <span>hello world</span>
    </div>
    <p>
      say: <span>hello world</span>
    </p>
  </div>
);

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <IntlWrapper>
          <Router>
            <div style={{width: "100%", height: "100%", display: "flex", flexDirection: 'column'}}>
              <NavBar />
              <Route path="/serial" component={SerialWidget} />
              <Route path="/docs" component={Docs} />
              <Route exact path="/" render={()=><Redirect to="/serial" />}/>
            </div>
          </Router>
        </IntlWrapper>
      </Provider>
    );
  }
}

$(() => {
  console.log(importMiddleware());
  ReactDOM.render(
    <App />,
    document.getElementById('root')
  );
  window.addEventListener('resize', () => {
    store.dispatch(onWindowResize());
  });
  store.dispatch(onWindowResize());
});
