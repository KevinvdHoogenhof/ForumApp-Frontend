import React, { Component } from "react";
import PostService from "../services/postservice";
import ThreadService from "../services/threadservice";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class PostListOfThread extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrievePosts = this.retrievePosts.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActivePost = this.setActivePost.bind(this);
    //this.removeAllPosts = this.removeAllPosts.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      thread: null,
      posts: [],
      currentPost: null,
      currentIndex: -1,
      searchName: "",
      tid: ""
    };
  }

  componentDidMount() {
    this.getThread(this.props.router.params.id);
    this.retrievePosts(this.props.router.params.id);
    
    this.setState({
      tid: this.props.router.params.id
    });
  }

  getThread(id) {
    ThreadService.get(id)
      .then(response => {
        this.setState({ thread: response.data });
        console.log(response.data);
      })
      .catch(error => {
        console.error('Error fetching thread:', error);
      });
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrievePosts(id) {
    PostService.getPostsByThreadID(id)
      .then(response => {
        //this.setState(prevState => ({
        //  posts: [...prevState.posts, response.data] // Remove when API is fixed to get all posts of thread
        //}));
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
    const { thread, searchName, posts, currentPost, currentIndex, tid } = this.state;
    const threadName = (thread ? thread.name : '');
    const threadDescription = (thread ? thread.description : '');
    const threadPosts = (thread ? thread.posts : '');

    //const tid = posts.length > 0 ? posts[0].threadId : '';

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
          <h4>{threadName}</h4>
          <h5>{threadDescription}</h5>
          <h5>Posts: {threadPosts}</h5>
          <div>
            <Link to={"/postpost/" + tid}>
              New Post
            </Link>
          </div>
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
export default withRouter(PostListOfThread);