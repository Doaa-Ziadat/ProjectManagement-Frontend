import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
// import Navbar from "./pages/Navbar";
import ProjectPage from "./pages/ProjectPage";

import { ReactSession } from "react-client-session";
import Notifications from "./pages/Notifications";

ReactSession.setStoreType("Cookie");
function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/projectPage" element={<ProjectPage />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
