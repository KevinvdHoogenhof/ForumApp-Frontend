import React, { Component } from 'react';
import CommentService from "../services/commentservice";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class EditComment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: '',
      name: '',
      content: ''
    };
  }

  componentDidMount() {
    this.getComment(this.props.router.params.id);
  }

  getComment(commentId) {
    CommentService.get(commentId)
      .then(response => {
        const { id, name, content } = response.data;
        this.setState({ id, name, content });
      })
      .catch(error => {
        console.error('Error fetching comment:', error);
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { id, name, content } = this.state;

    if (!name || !content) {
      alert('Name and Content are required');
      return;
    }

    const updatedComment = {
      id,
      name,
      content
    };

    CommentService.updateComment(id, updatedComment)
      .then(response => {
        console.log('Comment updated successfully:', response.data);
        // Redirect or handle the update as needed
      })
      .catch(error => {
        console.error('Error updating comment:', error);
      });
  }

  render() {
    const { name, content } = this.state;

    return (
      <div>
        <h2>Edit Comment</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              Name:
              <input type="text" name="name" value={name} onChange={this.handleInputChange} />
            </label>
          </div>
          <div>
            <label>
              Content:
              <textarea name="content" value={content} onChange={this.handleInputChange}></textarea>
            </label>
          </div>
          <button type="submit">Update</button>
        </form>
      </div>
    );
  }
}

export default withRouter(EditComment);
