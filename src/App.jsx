import { Routes, Route, Link } from "react-router-dom";
import SearchLocation from "./SearchLocation";
import Todos from "./Todos";
import TodosDetails from "./Todos-details";

export default function App() {
  return (
    <div>
      <nav style={{ marginBottom: "20px" }}>
        {/* Navigation links */}
        <Link to="/">Todos</Link> |{" "}
        <Link to="/search-location">Search Location</Link>
      </nav>

      <Routes>
        <Route path="/search-location" element={<SearchLocation />} />
        {/* dynamic route */}
        <Route path="/" element={<Todos />} />
        <Route path="/todos-details/" element={<TodosDetails />} />
      </Routes>
    </div>
  );
}
