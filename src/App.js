import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PostThread from "./components/postthread";
import Thread from "./components/thread";
import ThreadList from "./components/threadlist";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/threads"} className="navbar-brand">
            Threads11
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/threads"} className="nav-link">
                Threads
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/post"} className="nav-link">
                Post
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ThreadList/>} />
            <Route path="/threads" element={<ThreadList/>} />
            <Route path="/post" element={<PostThread/>} />
            <Route path="/thread/:id" element={<Thread/>} />
          </Routes>
        </div>
      </div>
    );
  }
}

export default App;
/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;*/
