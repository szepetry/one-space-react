import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Navbar from "./components/navigation/Navbar";
// import Footer from "./components/navigation/Footer";
import ThemeData from './components/theme/ThemeData'

import Homepage from "./pages/Homepage";
import { ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/material";


function App() {
  const theme = ThemeData();

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <div className="container-main">

          <Router>
            <Navbar />
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                // minHeight: '87.8vh', // Take out for footer lilbro
                height: 'auto',
                minHeight: '100vh'
              }}
            >
              <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/search/:searchQuery" element={<Homepage />} />
              </Routes>
            </Box>
            {/* <Footer /> */}
          </Router>

        </div>
      </ThemeProvider>
    </div>
  );
}

export default App;