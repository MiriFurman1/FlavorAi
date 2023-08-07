import "./App.css";
import Navbar from "./components/Navbar";
import MainLayout from "./components/MainLayout";
function App() {
  return (
    <div className=" w-screen h-screen flex flex-col justify-center align-middle">
      <Navbar />
      <MainLayout/>
      
    </div>
  );
}

export default App;
