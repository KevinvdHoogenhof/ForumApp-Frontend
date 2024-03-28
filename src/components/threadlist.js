import React, { Component } from "react";
import ThreadService from "../services/threadservice";
import { Link } from "react-router-dom";

export default class ThreadList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchName = this.onChangeSearchName.bind(this);
    this.retrieveThreads = this.retrieveThreads.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveThread = this.setActiveThread.bind(this);
    //this.removeAllThreads = this.removeAllThreads.bind(this);
    this.searchName = this.searchName.bind(this);

    this.state = {
      threads: [],
      currentThread: null,
      currentIndex: -1,
      searchName: ""
    };
  }

  componentDidMount() {
    this.retrieveThreads();
  }

  onChangeSearchName(e) {
    const searchName = e.target.value;

    this.setState({
      searchName: searchName
    });
  }

  retrieveThreads() {
    ThreadService.getAll()
      .then(response => {
        this.setState({
          threads: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveThreads();
    this.setState({
      currentThread: null,
      currentIndex: -1
    });
  }

  setActiveThread(thread, index) {
    this.setState({
      currentThread: thread,
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
    ThreadService.findByName(this.state.searchName)
      .then(response => {
        this.setState({
          threads: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchName, threads, currentThread, currentIndex } = this.state;

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
          <h4>Threads List</h4>

          <ul className="list-group">
            {threads &&
              threads.map((thread, index) => (
                <li
                  className={
                    "list-group-item " +
                    (index === currentIndex ? "active" : "")
                  }
                  onClick={() => this.setActiveThread(thread, index)}
                  key={index}
                >
                  {thread.name}
                </li>
              ))}
          </ul>
        {/*
          <button
            className="m-3 btn btn-sm btn-danger"
            onClick={this.removeAllThreads}
            Remove All
          </button>
          >*/}
        </div>
        <div className="col-md-6">
          {currentThread ? (
            <div>
              <h4>Thread</h4>
              <div>
                <label>
                  <strong>Name:</strong>
                </label>{" "}
                {currentThread.name}
              </div>
              <div>
                <label>
                  <strong>Description:</strong>
                </label>{" "}
                {currentThread.description}
              </div>
              {/*
              <div>
                <label>
                  <strong>Status:</strong>
                </label>{" "}
                {currentThread.published ? "Published" : "Pending"}
          </div>*/}

              <Link
                to={"/thread/" + currentThread.id}
              >
                Edit
              </Link>
            </div>
          ) : (
            <div>
              <br />
              <p>Please click on a Thread...</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}