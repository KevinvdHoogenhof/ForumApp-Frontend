import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Contact from "./pages/contact";
import TermsOfService from "./pages/termsofservice";
import Profile from "./components/profile";

import Login from "./components/login";
import Register from "./components/register";

import PostThread from "./components/postthread";
import EditThread from "./components/editthread";
import ThreadList from "./components/threadlist";

import PostListOfThread from "./components/postlistofthread";
import PostPost from "./components/postpost";
import EditPost from "./components/editpost";
import PostList from "./components/postlist";
import Post from "./components/post";

//import CommentListOfThread from "./components/commentlistofthread"; Include in others?
//import CommentListOfPost from "./components/commentlistofpost";
//import PostComment from "./components/postcomment"; Include in post?
import EditComment from "./components/editcomment";
import CommentList from "./components/commentlist";

class App extends Component {
  handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  }
  
  render() {
    const isLoggedIn = !!localStorage.getItem('token');

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/threads"} className="navbar-brand">
            Forum application
          </Link>
          <div className="navbar-nav mr-auto" style={{ display: 'flex', width: '100%', justifyContent: 'space-between' }}>
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
              <Link to={"/postpost/6622190fe21ab10bc3650d6b"} className="nav-link">
                PostPost
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/comments"} className="nav-link">
                Comments
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/contact"} className="nav-link">
                Contact
              </Link>
            </li>
            <li className="nav-item">
              <Link to={"/termsofservice"} className="nav-link">
                Terms of Service
              </Link>
            </li>
            </div>
            <div className="navbar-nav mr-auto" style={{ marginRight: '1%' }}>
              {isLoggedIn ? (
                <><li className="nav-item">
                  <Link to={"/profile"} className="nav-link">
                    Profile
                  </Link>
                </li>
                <li className="nav-item">
                    <button className="btn nav-link" onClick={this.handleLogout}>
                      Logout
                    </button>
                  </li></>
              ) : (
                <li className="nav-item">
                  <Link to={"/login"} className="nav-link">
                    Login
                  </Link>
                </li>
              )}
            </div>
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
            <Route path="/postpost/:id" element={<PostPost/>} />
            <Route path="/editpost/:id" element={<EditPost/>} />
            <Route path="/post/:id" element={<Post/>} />
            <Route path="/comments" element={<CommentList/>} />
            <Route path="/editcomment/:id" element={<EditComment/>} />
            <Route path="/contact" element={<Contact/>} />
            <Route path="/termsofservice" element={<TermsOfService/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
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
