import React, { Component } from "react";
import ThreadService from "../services/threadservice";
import { withRouter } from '../common/with-router';

class EditThread extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.getThread = this.getThread.bind(this);
    //this.updatePublished = this.updatePublished.bind(this);
    this.updateThread = this.updateThread.bind(this);
    this.deleteThread = this.deleteThread.bind(this);

    this.state = {
      currentThread: {
        id: null,
        name: "",
        description: "",
        //published: false
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getThread(this.props.router.params.id);
  }

  onChangeName(e) {
    const name = e.target.value;

    this.setState(function(prevState) {
      return {
        currentThread: {
          ...prevState.currentThread,
          name: name
        }
      };
    });
  }

  onChangeDescription(e) {
    const description = e.target.value;
    
    this.setState(prevState => ({
      currentThread: {
        ...prevState.currentThread,
        description: description
      }
    }));
  }

  getThread(id) {
    ThreadService.get(id)
      .then(response => {
        this.setState({
          currentThread: response.data
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
      id: this.state.currentThread.id,
      name: this.state.currentThread.name,
      description: this.state.currentThread.description,
      published: status
    };

    ThreadService.update(this.state.currentThread.id, data)
      .then(response => {
        this.setState(prevState => ({
          currentThread: {
            ...prevState.currentThread,
            //published: status
          }
        }));
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }*/

  updateThread() {
    ThreadService.update(
      this.state.currentThread.id,
      this.state.currentThread
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The thread was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteThread() {    
    ThreadService.delete(this.state.currentThread.id)
      .then(response => {
        console.log(response.data);
        this.props.router.navigate('/threads');
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentThread } = this.state;

    return (
      <div>
        {currentThread ? (
          <div className="edit-form">
            <h4>Thread</h4>
            <form>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={currentThread.name}
                  onChange={this.onChangeName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  id="description"
                  value={currentThread.description}
                  onChange={this.onChangeDescription}
                />
              </div>

              <div className="form-group">
                <label>
                  <strong>Status:</strong>
                </label>
                {/*{currentThread.published ? "Published" : "Pending"}*/}
              </div>
            </form>

            {/*{currentThread.published ? (
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
            )}*/}

            <button
              type="submit"
              onClick={this.updateThread}
            >
              Update
            </button>

            <button
              type="submit"
              onClick={this.deleteThread}
            >
              Delete
            </button>

            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a thread...</p>
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(EditThread);