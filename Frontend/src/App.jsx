import "./App.css";
import React from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./pages/landing.jsx";
import Authentication from "./pages/authentication.jsx";
import { AuthProvider } from "./contexts/AuthContexts.jsx";
import VideoMeetComponent from './pages/videoMeet.jsx';
import History from './pages/history.jsx';
import HomeComponent from './pages/home.jsx'

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path= '/:url' element={<VideoMeetComponent/>} />
            <Route path ="/home" element = {<HomeComponent/>}/>
            <Route path="/history" element={<History />} />

          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
