import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AddDevice from "./pages/AddDevice";
import AddClient from "./pages/AddClient";
import TrackingMap from "./pages/TrackingMap";

function App() {
  return (
    <section className="bg-gray-200 dark:bg-gray-700 min-h-screen flex items-center justify-center">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-device" element={<AddDevice />} />
        <Route path="/add-client" element={<AddClient />} />
        <Route path="/tracking-map" element={<TrackingMap />} />
      </Routes>
    </section>
  );
}

export default App;
