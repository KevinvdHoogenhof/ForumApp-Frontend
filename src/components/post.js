import React, { Component } from "react";
import PostService from "../services/postservice";
import CommentService from "../services/commentservice";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class Post extends Component{
    constructor(props) {
        super(props);
        this.state = {
          post: null,
          comments: [],
          newComment: {
            postId: '',
            name: '',
            content: ''
          }
        };
    }

    componentDidMount() {
        const postId = this.props.router.params.id;
        this.getPost(postId);
        this.getComments(postId);
    }

    getPost(postId) {
        PostService.get(postId)
          .then(response => {
            this.setState({ post: response.data });
          })
          .catch(error => {
            console.error('Error fetching post:', error);
          });
    }

    getComments(postId) {
        CommentService.getCommentsByPostId(postId)
          .then(response => {
            this.setState({ comments: response.data });
          })
          .catch(error => {
            console.error('Error fetching comments:', error);
          });
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        this.setState(prevState => ({
          newComment: {
            ...prevState.newComment,
            [name]: value
          }
        }));
      }
    
    handleSubmit = (event) => {
        event.preventDefault();
        const { newComment } = this.state;
    
        CommentService.createComment(newComment)
          .then(response => {
            console.log('Comment created successfully:', response.data);
            // Clear the form and reload comments
            this.setState({ newComment: { postId: '', name: '', content: '' } });
            this.getComments(newComment.postId);
          })
          .catch(error => {
            console.error('Error creating comment:', error);
          });
    }

    render() {
        const { post, comments } = this.state;
    
        return (
            <div>
              <h2>Post Details</h2>
              {post ? (
                <div>
                  <p>ID: {post.id}</p>
                  <p>Thread ID: {post.threadId}</p>
                  <p>Thread Name: {post.threadName}</p>
                  <p>Author ID: {post.authorId}</p>
                  <p>Author Name: {post.authorName}</p>
                  <p>Name: {post.name}</p>
                  <p>Content: {post.content}</p>
                  <p>Comments:</p>
                  <ul>
                    {comments.map(comment => (
                      <li key={comment.id}>
                        <p>Comment ID: {comment.id}</p>
                        <p>Thread ID: {comment.threadId}</p>
                        <p>Thread Name: {comment.threadName}</p>
                        <p>Post ID: {comment.postId}</p>
                        <p>Post Name: {comment.postName}</p>
                        <p>Author ID: {comment.authorId}</p>
                        <p>Author Name: {comment.authorName}</p>
                        <p>Name: {comment.name}</p>
                        <p>Content: {comment.content}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Loading...</p>
              )}
            </div>
        );
    }
}
export default withRouter(Post);