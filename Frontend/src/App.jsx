import { Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Chat from "./Pages/Chat"; // Assuming this page exists
import PublicLayout from "./layouts/PublicLayout";
import MainLayout from "./layouts/MainLayout";
import authStore from "./store/authStore";
import ChatHistory from "./Pages/ChatHistory";

function App() {
  const { isLoggedIn, role } = authStore((state) => state);

  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Protected Routes */}
      {isLoggedIn && role === "user" && (
        <Route element={<MainLayout />}>
          <Route path="/chat" element={<Chat/>} />
          <Route path="/chatHistory" element={<ChatHistory/>} />
        </Route>
      )}
    </Routes>
  );
}

export default App;
