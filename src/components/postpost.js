import React, { Component } from "react";
import PostService from "../services/postservice";
import ThreadService from "../services/threadservice";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';

class PostPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: "",
      isLoggedIn: false,
      //id: "",
      //username: "",
      threadId: '',
      threadName: '',
      authorId: 0,
      authorName: 'asd',
      name: '',
      content: '',
    };
  }

  componentDidMount() {
    this.getThread(this.props.router.params.id);
    this.getToken();
  }

  getToken() {
    const token = localStorage.getItem('token');
    if (token) {
      this.setState({ isLoggedIn: true, token }, () => {
        this.decodeToken();
      });
    }
  }

  decodeToken() {
    try {
      const decodedToken = jwtDecode(this.state.token);
      const { id, username } = decodedToken.sub;
      this.setState({
        authorId: id,
        authorName: username
      });
    } catch (error) {
      console.error('Invalid token', error);
    }
  }

  getThread(id) {
    ThreadService.get(id)
    .then(response => {
      const { id, name } = response.data;
      this.setState({ threadId: id, threadName: name });
    })
      .catch(error => {
        console.error('Error fetching thread:', error);
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { name, content } = this.state;

    if (!name || !content) {
      alert('Name and Content are required');
      return;
    }

    const newPost = {
      threadId: this.state.threadId,
      threadName: this.state.threadName,
      authorId: this.state.authorId,
      authorName: this.state.authorName,
      name,
      content
    };

    PostService.create(newPost)
    .then(response => {
      console.log('Post created successfully:', response.data);
      window.location.href = `/thread/${this.state.threadId}`;
      // Redirect to the post page or homepage
    })
    .catch(error => {
      console.error('Error creating post:', error);
    });
}

render() {
  return (
    <div>
      <h2>New Post</h2>
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>
            Name:
            <input type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
          </label>
        </div>
        <div>
          <label>
            Content:
            <textarea name="content" value={this.state.content} onChange={this.handleInputChange}></textarea>
          </label>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
}
export default withRouter(PostPost);
/*class PostPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this); //Add other fields
    this.savePost = this.savePost.bind(this);
    this.newPost = this.newPost.bind(this);

    this.state = { //Update later to fit model
      id: null,
      threadId: "6622190fe21ab10bc3650d6b",
      threadName: "General",
      authorId: 0,
      authorName: "asd", //Update later for correct user
      name: "",
      content: "", 

      submitted: false
    };
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value
    });
  }

  onChangeContent(e) {
    this.setState({
        content: e.target.value
    });
  }

  //Add fields

  savePost() {
    var data = {
      threadId: this.state.threadId,
      threadName: this.state.threadName,
      authorId: this.state.authorId,
      authorName: this.state.authorName, 
      name: this.state.name,
      content: this.state.content
    };

    PostService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          name: response.data.name,
          content: response.data.content, //Add fields

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newPost() {
    const { tid } = this.props.match.params;
    const threadId = tid || "6622190fe21ab10bc3650d6b";

    this.setState({
      id: null,
      threadId: threadId,
      threadName: "no",
      authorId: 0,
      authorName: "asd", //Update later for correct user
      name: "",
      content: "", 

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted successfully!</h4>
            <button className="btn btn-success" onClick={this.newPost}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                required
                value={this.state.name}
                onChange={this.onChangeName}
                name="name"
              />
            </div>

            <div className="form-group">
              <label htmlFor="content">Content</label>
              <input
                type="text"
                className="form-control"
                id="content"
                required
                value={this.state.content}
                onChange={this.onChangeContent}
                name="content"
              />
            </div>


            <button onClick={this.savePost} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(PostPost);*/