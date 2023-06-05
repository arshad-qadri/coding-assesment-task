import { Route, Routes } from "react-router-dom";
import "./App.css";
import Pokmon from "./pages/Pokmon";
import Pagination from "./pages/Pagination";
import Nav from "./components/Nav";

function App() {
  return (
    <div className="App">
      <Nav />
      <Routes>
        <Route path="/" exact element={<Pokmon />} />
        <Route path="/pagination" element={<Pagination />} />
      </Routes>
    </div>
  );
}

export default App;
