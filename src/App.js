//import logo from './logo.svg';
import React from 'react';
import './App.css';
import Board from './Board';

function App() {
  return (
    <div>
      <Board 
      />
    </div>
  );
}

/*
class App extends React.Component {
  constructor(props) {
    super(props);
    const rowCount = 5;
    const colCount = 5;
    const cpu1 =  0;
    const cpu2 = 0;

    this.state = {
      rowCount,
      colCount,
      cpu1,
      cpu2
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (settings) => {
    console.log(this.state);
    this.setState(settings);
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <Board 
          rowCount={this.state.rowCount}    
          colCount={this.state.colCount}
          cpu1={this.state.cpu1}
          cpu2={this.state.cpu2}
        />
        <Settings
          rowCount={this.state.rowCount}
          colCount={this.state.colCount}
          cpu1={this.state.cpu1}
          cpu2={this.state.cpu2}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}

function App() {
  const [rowCount, setRowCount] = useState(5);
  const [colCount, setColCount] = useState(5);
  const [cpu1, setCpu1] = useState(0);
  const [cpu2, setCpu2] = useState(0);

  const handleSubmit = settings => {
    console.log(rowCount);
    console.log('handleSubmit');
    console.log(settings);
    setRowCount(settings.rowCount);
    setColCount(settings.colCount);
    setCpu1(settings.cpu1);
    setCpu2(settings.cpu2);
    console.log(rowCount);
  }

  return (
    <div>
      <Board 
        rowCount={rowCount}    
        colCount={colCount}
        cpu1={cpu1}
        cpu2={cpu2}
      />
      <Settings
        rowCount={rowCount}    
        colCount={colCount}
        cpu1={cpu1}
        cpu2={cpu2}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}
*/

export default App;
