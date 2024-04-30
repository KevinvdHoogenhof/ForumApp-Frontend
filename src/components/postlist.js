import React, { Component } from "react";
import PostService from "../services/postservice";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class PostList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrievePosts = this.retrievePosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePost = this.setActivePost.bind(this);
    //this.removeAllPosts = this.removeAllPosts.bind(this);
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
    PostService.getAll()
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
    if (this.state.searchName !== "") {
    PostService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          posts: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
    } else {
      this.retrievePosts(this.props.router.params.id);
    }
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
            onClick={this.removeAllPosts}
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
                  <strong>Content:</strong>
                </label>{" "}
                {currentPost.content}
              </div>
              <div>
                <label>
                  <strong>Author:</strong>
                </label>{" "}
                {currentPost.authorName} / ID={currentPost.authorId} / !! Combine as link later !!
              </div>
              <div>
                <label>
                  <strong>Comments:</strong>
                </label>{" "}
                {currentPost.comments}
              </div>
              {/*
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentPost.published ? "Published" : "Pending"}
          </div>*/}
              <div>
                <Link
                  to={"/editpost/" + currentPost.id}
                >
                  Edit
                </Link>
              </div>
              <Link
                to={"/post/" + currentPost.id}
              >
                Visit post
              </Link>
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
export default withRouter(PostList);