import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

/*
  actions redux like that will propose a change to the world state
  The director will consume this action and determine if it is valid.
  If the action is valid 
  the director will update the world state, 
  the new state will propigate back down to the actors

  In the case where an action is denied, 
  the actor that made the proposal will need to know that it cannot make that proposal again

*/

function App() {
    return (
        <div className="App">
            <h1>Hello CodeSandbox</h1>
            <h2>Start editing to see some magic happen!</h2>
        </div>
    );
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
