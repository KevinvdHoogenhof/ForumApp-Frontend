import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import PostThread from "./components/postthread";
import EditThread from "./components/editthread";
import ThreadList from "./components/threadlist";
import PostListOfThread from "./components/postlistofthread";
import PostPost from "./components/postpost";
import EditPost from "./components/editpost";
import PostList from "./components/postlist";

class App extends Component {
  render() {
    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/threads"} className="navbar-brand">
            Forum application
          </Link>
          <div className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to={"/threads"} className="nav-link">
                Threads
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/postthread"} className="nav-link">
                PostThread
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/posts"} className="nav-link">
                Posts
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/postpost"} className="nav-link">
                PostPost
              </Link>
            </li>
          </div>
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<ThreadList/>} />
            <Route path="/threads" element={<ThreadList/>} />
            <Route path="/postthread" element={<PostThread/>} />
            <Route path="/editthread/:id" element={<EditThread/>} />
            <Route path="/thread/:id" element={<PostListOfThread/>} />
            <Route path="/posts" element={<PostList/>} />
            <Route path="/postpost" element={<PostPost/>} />
            <Route path="/editpost/:id" element={<EditPost/>} />
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
