import React, { Component } from "react";
import CommentService from "../services/commentservice";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class CommentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
    this.getComments();
  }

  getComments() {
    CommentService.getAll()
      .then(response => {
        this.setState({ comments: response.data });
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });
  }

  render() {
    const { comments } = this.state;

    return (
      <div>
        <h2>Comments</h2>
        <ul>
          {comments.map(comment => (
            <li key={comment.id}>
              <div>
                <strong>{comment.name}</strong> - Author: {comment.authorname} / {comment.authorId} !! Combine later like thread and post!!
                , <Link to={"/editcomment/" + comment.id}>Edit comment</Link>
              </div>
              <div>
                <Link to={"/thread/" + comment.threadId}>{comment.threadName}</Link>
                , <Link to={"/post/" + comment.postId}>{comment.postName}</Link>
              </div>
              <div>
                {comment.content}
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default CommentList;
