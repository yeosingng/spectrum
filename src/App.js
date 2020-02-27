import React from 'react';
import { connect } from 'react-redux'
import Main from './components/Main'
import Header from './components/Header'

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}


export default connect()(App);
