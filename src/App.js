import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar';
import UserProfile from './Pages/UserProfile';


function App() {
  return (
    <div className="App">
     <Navbar/>
     <UserProfile/>
    </div>
  );
}

export default App;
