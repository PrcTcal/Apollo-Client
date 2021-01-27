import logo from './logo.svg';
import './App.css';
import Main from './main';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
          <Main />
        </div>
      </header>
    </div>
  );
}

export default App;