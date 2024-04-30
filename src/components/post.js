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
            threadId: '',
            threadName: '',
            postId: '',
            postName: '',
            authorId: '',
            authorName: '',
            name: '',
            content: ''
          },
          showComments: true
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
            const post = response.data;
            this.setState({ 
              post: post,
              newComment: {
                ...this.state.newComment,
                threadId: post.threadId,
                threadName: post.threadName,
                postId: post.id,
                postName: post.name,
                authorId: 0,
                authorName: 'asd'
              }
            });
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
    
        CommentService.create(newComment)
          .then(response => {
            console.log('Comment created successfully:', response.data);
            // Clear the form and reload comments
            this.setState({ newComment: { ...newComment, name: '', content: '' } });
            this.getComments(newComment.postId);
          })
          .catch(error => {
            console.error('Error creating comment:', error);
          });
    }

    toggleComments = () => {
      this.setState(prevState => ({
        showComments: !prevState.showComments
      }));
    }

    render() {
        const { post, comments, newComment, showComments } = this.state;
    
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
              </div>
            ) : (
              <p>Loading...</p>
            )}
    
            <h2>New Comment</h2>
            <form onSubmit={this.handleSubmit}>
              <div>
                <label>
                  Name:
                  <input type="text" name="name" value={newComment.name} onChange={this.handleInputChange} />
                </label>
              </div>
              <div>
                <label>
                  Content:
                  <input type="text" name="content" value={newComment.content} onChange={this.handleInputChange} />
                </label>
              </div>
              <button type="submit">Submit</button>
            </form>
    
            <h2>
              Comments <button onClick={this.toggleComments}>{showComments ? 'Hide' : 'Show'}</button>
            </h2>
            {showComments && (
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
            )}
          </div>
        );
    }
}
export default withRouter(Post);