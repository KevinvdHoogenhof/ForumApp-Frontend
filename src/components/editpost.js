import React, { Component } from "react";
import PostService from "../services/postservice";
import { withRouter } from '../common/with-router';

class EditPost extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this); //Add fields
    this.getPost = this.getPost.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);

    this.state = {
      currentPost: {
        id: null,
        name: "",
        content: "", //Add fields
        //published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getPost(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentPost: {
          ...prevState.currentPost,
          name: name
        }
      };
    });
  }

  onChangeContent(e) {
    const content = e.target.value;
    
    this.setState(prevState => ({
      currentPost: {
        ...prevState.currentPost,
        content: content
      }
    }));
  }

  //Add fields

  getPost(id) {
    PostService.get(id) //Maybe change call
      .then(response => {
        this.setState({
          currentPost: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }
  /*
  updatePublished(status) {
    var data = {
      id: this.state.currentPost.id,
      name: this.state.currentPost.name,
      description: this.state.currentPost.description,
      published: status
    };

    ThreadService.update(this.state.currentPost.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentPost: {
            ...prevState.currentPost,
            //published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }*/

  updatePost() {
    PostService.update(
      this.state.currentPost.id,
      this.state.currentPost
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The post was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deletePost() {    
    PostService.delete(this.state.currentPost.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/posts');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentPost } = this.state;

    return (
      <div>
        {currentPost ? (
          <div className="edit-form">
            <h4>Post</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentPost.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="content">Content</label>
                <input
                  type="text"
                  className="form-control"
                  id="content"
                  value={currentPost.content}
                  onChange={this.onChangeContent}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {/*{currentPost.published ? "Published" : "Pending"}*/}
              </div>
            </form>

            {/*{currentPost.published ? (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(false)}
              >
                UnPublish
              </button>
            ) : (
              <button
                className="badge badge-primary mr-2"
                onClick={() => this.updatePublished(true)}
              >
                Publish
              </button>
            )}

            <button
              className="badge badge-danger mr-2"
              onClick={this.deletePost}
            >
              Delete
            </button>*/}

            <button
              type="submit"
              onClick={this.updatePost}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a post...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditPost);