import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/HomePage";
import AddBookPage from "./pages/AddBookPage";
import BookPage from "./pages/BookPage";
import EditBookPage from "./pages/EditBookPage";
import Navbar from "./components/Navbar";
import NotFoundPage from "./pages/NotFoundPage";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("user")
  );

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar
          isAuthenticated={isAuthenticated}
          setIsAuthenticated={setIsAuthenticated}
        />

        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/add-book" element={<AddBookPage />} />

            <Route path="/books/:id" element={<BookPage />} />
<<<<<<< HEAD
            <Route path="/edit-book/:id" element={<EditBookPage />} />
=======

            <Route
              path="/signup"
              element={
                <Signup setIsAuthenticated={setIsAuthenticated} />
              }
            />

            <Route
              path="/login"
              element={
                <Login setIsAuthenticated={setIsAuthenticated} />
              }
            />

>>>>>>> d4a9cae (feat(auth): add signup and login)
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;