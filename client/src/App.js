import logo from './logo.svg';
import './App.css';

function App() {

  
  function serverPing(){
    console.log("testing server ping")
    fetch("/test")
    .then(r => r.json())
    .then(d => console.log(d))
  }

  // setInterval(serverPing, 60000)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
