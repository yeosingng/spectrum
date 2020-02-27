import React from 'react';
import { connect } from 'react-redux'
import Main from './components/Main'

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}


export default connect()(App);
