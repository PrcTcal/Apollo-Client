import logo from './logo.svg';
import './App.css';
import Read from './read';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <span className="CRUD-span">
          <button>Create</button>
          <button>Read</button>
          <button>Update</button>
          <button>Delete</button>
        </span>
        <div>
          <Read />
        </div>
      </header>
    </div>
  );
}

export default App;