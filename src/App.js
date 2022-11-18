import React from 'react';
import MainView from './components/main-view/main-view.jsx';
import Container from 'react-bootstrap/Container';

// importing store
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import moviesApp from './reducers/reducers';
import { devToolsEnhancer } from 'redux-devtools-extension';


// Import statement to indicate that you need to bundle './index.scss'
import './index.scss';

const store = createStore(moviesApp, devToolsEnhancer());


function App() {
  return (
    <Provider store={store}>
      <Container>
        <MainView />
      </Container>
    </Provider>
  );
}

export default App;
