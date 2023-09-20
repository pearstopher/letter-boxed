import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="grid-container">
        {[...Array(9)].map((_, index) => (
            <div key={index} className="grid-item"></div>
        ))}
      </div>
    </div>
  );
}

export default App;
