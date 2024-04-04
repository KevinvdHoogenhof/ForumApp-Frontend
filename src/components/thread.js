import React, { Component } from "react";
import ThreadService from "../services/threadservice";
import { Link } from "react-router-dom";

export default class Thread extends Component {
    constructor(props) {
      super(props);
      this.onChangeSearchName = this.onChangeSearchName.bind(this);
      this.retrievePosts = this.retrievePosts.bind(this);
      this.refreshList = this.refreshList.bind(this);
      this.setActivePost = this.setActivePost.bind(this);
      //this.removeAllThreads = this.removeAllThreads.bind(this);
      this.searchName = this.searchName.bind(this);
  
      this.state = {
        posts: [],
        currentPost: null,
        currentIndex: -1,
        searchName: ""
      };
    }
  
    componentDidMount() {
      this.retrievePosts();
    }

    onChangeSearchName(e) {
        const searchName = e.target.value;
    
        this.setState({
          searchName: searchName
        });
      }
    
      retrievePosts() {
        ThreadService.getAll()
          .then(response => {
            this.setState({
              threads: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      refreshList() {
        this.retrievePosts();
        this.setState({
          currentPost: null,
          currentIndex: -1
        });
      }
    
      setActivePost(post, index) {
        this.setState({
          currentPost: post,
          currentIndex: index
        });
      }
    
      /*removeAllThreads() {
        ThreadService.deleteAll()
          .then(response => {
            console.log(response.data);
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      }*/
    
      searchName() {
        ThreadService.findByName(this.state.searchName)
          .then(response => {
            this.setState({
                posts: response.data
            });
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      }
    
      render() {
        const { searchName, posts, currentPost, currentIndex } = this.state;
    
        return (
          <div className="list row">
            <div className="col-md-8">
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search by name"
                  value={searchName}
                  onChange={this.onChangeSearchName}
                />
                <div className="input-group-append">
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={this.searchName}
                  >
                    Search
                  </button>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <h4>Posts List</h4>
    
              <ul className="list-group">
                {posts &&
                  posts.map((post, index) => (
                    <li
                      className={
                        "list-group-item " +
                        (index === currentIndex ? "active" : "")
                      }
                      onClick={() => this.setActivePost(post, index)}
                      key={index}
                    >
                      {post.name}
                    </li>
                  ))}
              </ul>
            {/*
              <button
                className="m-3 btn btn-sm btn-danger"
                onClick={this.removeAllThreads}
                Remove All
              </button>
              >*/}
            </div>
            <div className="col-md-6">
              {currentPost ? (
                <div>
                  <h4>Post</h4>
                  <div>
                    <label>
                      <strong>Name:</strong>
                    </label>{" "}
                    {currentPost.name}
                  </div>
                  <div>
                    <label>
                      <strong>Description:</strong>
                    </label>{" "}
                    {currentPost.description}
                  </div>
                  {/*
                  <div>
                    <label>
                      <strong>Status:</strong>
                    </label>{" "}
                    {currentThread.published ? "Published" : "Pending"}
              </div>
    
                  <Link
                    to={"/editthread/" + currentThread.id}
                  >
                    Edit
                  </Link>
    
                  <Link
                    to={"/thread/" + currentThread.id}
                  >
                    Visit thread
                  </Link>*/}
                </div>
              ) : (
                <div>
                  <br />
                  <p>Please click on a Post...</p>
                </div>
              )}
            </div>
          </div>
        );
      }
    }