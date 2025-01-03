import React from "react"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import Home from "./Components/Home"
import Login from "./Components/Login/Login"

import "./App.css"
import Header from "./Components/Header"
import Footer from "./Components/Footer"
import Api from "./api/Api"
import UserStorage from "./UserContext"
import User from "./Components/User/User"
import ProtectedRoute from "./Components/Helper/ProtectedRouter"



function App() {
  return (
    <div>
      <BrowserRouter>
        <UserStorage>
          <Header/>
            <Routes>
              <Route path="/" element={<Home/>}/>
              <Route path="/login/*" element={<Login/>}/>
              <Route 
              path="/conta/*"
              element={
                <ProtectedRoute>
                <User />
              </ProtectedRoute>}/>
              <Route path="/teste" element={<h1>TESTE</h1>}/>
            </Routes>
          <Footer/>
        </UserStorage>
      </BrowserRouter>
    </div>
  )
}

export default App
