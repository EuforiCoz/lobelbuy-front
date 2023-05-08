//import './App.css';
import Header from "./componentes/Header"
import Footer from "./componentes/Footer"
import Router from "./Router"
import { AppProvider } from './AppProvider';
import "./App.css"
import HeaderBottom from "./componentes/HeaderBottom";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header/>
        <Router/>
        <Footer/>
        <HeaderBottom/>
      </div>
    </AppProvider>
  );
}

export default App;
