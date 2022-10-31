import "./App.css";
import React from "react";
import PrimarySearchAppBar from "./pages/Components/Navbar";
import NewESGReport from "./pages/ESGReport";
import Home from "../src/pages/Home";
import Login from "../src/pages/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ViewReport from "./pages/ViewReport";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <Router>
    //       <PrimarySearchAppBar />
    //       <Switch>
    //         <Route exact path="/home">
    //           <Home />
    //         </Route>
    //         <Route exact path="/ViewReport">
    //           <ViewReport />
    //         </Route>
    //         <Route exact path="/addnewreport">
    //           <NewESGReport />
    //         </Route>
    //       </Switch>
    //     </Router>
    //   </header>
    // </div>


 <div className="App">
    {/* <div>
    <Navigation/>
    </div> */}
    <Router>
    <div>
    <PrimarySearchAppBar/>
    </div>
    <Routes>
    <Route path="/"  exact element={<Login />} />
    <Route path="Home" element={<Home />} />
    <Route path="/NewESGReport" element={<NewESGReport />} />
    <Route path="/ViewReport" element={<ViewReport />} />
    {/* <Route path="/ShowCountry" element={<ShowCountry />} />
    <Route path="RegistrationResult" element={<RegistrationResult />} />
    <Route path="Contact" element={<Contact />} />
    <Route path="Register" element={<Register />} />
    <Route path="About" element={<About />} />
    <Route path='Credentials' element={<Credentials />} /> */}
    <Route path="Login" element={<Login />} />
    <Route path="*" element={<main style={{ padding: "1rem" }}><p>There's nothing here!</p></main>}/>
    </Routes>  
    </Router>  
    </div>




  );
}

export default App;
