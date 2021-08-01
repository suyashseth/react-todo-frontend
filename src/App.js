import React, { Component } from 'react';
import './App.css';
import FirstComponents from './components/learning-examples/FirstComponents.jsx';
import ThirdComponent from './components/learning-examples/ThirdComponent.jsx';
import Counter from './components/counter/Counter.jsx';
import TodoApp from './components/todo/TodoApp';
import './bootstrap.css';

class App extends Component {
  render() {
    return (
      <div className="App">
         <TodoApp/>
      </div>
    );
  }
}

class LearnigComponents extends Component{
  render() {
    return (
      <div className="App">
         My Hello World
         <FirstComponents></FirstComponents>
         <ThirdComponent></ThirdComponent>
      </div>
    );
  }
}

export default App;