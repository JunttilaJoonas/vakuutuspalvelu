import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addPost} from '../actions/postActions';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import axios from 'axios';
class form_insuranceclaim extends Component {
    
    state = {
      text: ''
    };
  


    onSubmit(e) {
      e.preventDefault();
      const newPost = {
        text: this.state.text,
      };
      console.log(newPost);
      this.setState({ text: '' });
    }
  
    onChange(e) {
      this.setState({ [e.target.name]: e.target.value });
    }

    
  render() {
    return (
        <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Say Somthing...</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit.bind(this)}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a post"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange.bind(this)}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addPost })(form_insuranceclaim);

