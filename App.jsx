import Calculator from './components/Calculator';
import './App.css';


function App() {
  return (
    <div className="app-container">
      <h1 className="calc-title">Calculator</h1>
      <Calculator />
      <p className="calc-footer">
        Developed by Balaji A , Reg.No : <span>212223040023</span> .
      </p>
    </div>
  );
}

export default App;
