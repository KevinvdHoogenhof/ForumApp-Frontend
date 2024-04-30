import React, { Component } from "react";
import PostService from "../services/postservice";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class PostPost extends Component {
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

            {/*Add fields*/}

            <button onClick={this.savePost} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
export default withRouter(PostPost);