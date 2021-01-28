import logo from './logo.svg';
import './App.css';
import Main from './main';
import { ApolloProvider } from '@apollo/client';
import {ApolloClient, InMemoryCache } from '@apollo/client';


const client = new ApolloClient({
    uri: 'http://localhost:4000',
    cache: new InMemoryCache()
  });

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <div>
        <ApolloProvider client={client}>
          <Main />
        </ApolloProvider>
        </div>
      </header>
    </div>
  );
}

export default App;