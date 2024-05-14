import React, { Component } from "react";
import AuthService from "../services/authservice";
import { withRouter } from '../common/with-router';
import { Link } from "react-router-dom";

class Profile extends Component {
    constructor(props) {
      super(props);
      this.getToken = this.getToken.bind(this);
      this.state = {
        token: "",
        isLoggedIn: false,
        id: "",
        name: ""
      };
    }
  
    componentDidMount() {
      this.getToken();
    }

    getToken() {
      this.setState({
        isLoggedIn: !!localStorage.getItem('token')
      });
    }

    handleLogout = () => {
      localStorage.removeItem('token');
      window.location.href = `/`;
    }

    deleteAccount = () => {
      const confirmDelete = window.confirm('Are you sure you want to delete your account?');

      if (confirmDelete) {
        const { id, token } = this.state;
        AuthService.delete(id, token)
        .then(response => {
          console.log('Account deleted:', response.data);
          window.location.href = `/`;
        })
        .catch(error => {
          console.error('Error deleting account:', error);
        });
      }
    }
  
    render() {
        const { isLoggedIn, name } = this.state;
    
        if(!isLoggedIn){
            return (
            <div>
                <h2>Not logged in</h2>
                <Link to={"/"}>Home</Link>
            </div>
            );
        }

        return (
          <div style={{ textAlign: 'center' }}>
            <h1>Profile</h1>
            <h2>Username: {name}</h2>
            <br />
            <button onClick={this.handleLogout}> Logout</button>
            <br />
            <br />
            <button onClick={this.deleteAccount}> Delete account</button>
          </div>
        );
    }
}

export default withRouter(Profile);
