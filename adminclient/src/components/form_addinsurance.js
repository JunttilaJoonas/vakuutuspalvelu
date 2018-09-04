import React, { Component } from 'react'
import {connect} from 'react-redux';
import {addPost} from '../actions/postActions';
import TextAreaFieldGroup from './TextAreaFieldGroup';
import axios from 'axios';
class form_addinsurance extends Component {


  componentDidMount() {
    this.handleInitialize();
}

handleInitialize() {
    const initData = {
    "id": this.props.user.id,
    "message": this.props.user
};

}
 
    state = {
      text: '',
      insurancetype: '',
      userid: '',
      valid: ''
    };
    componentWillReceiveProps(newProps) {
      if (newProps.errors) {
        this.setState({ errors: newProps.errors });
      }
    }

    componentDidMount() {
      axios.get("http://localhost:3000/customerprofile/customer/5b897755f009f2c819fd8edb").then(
          this.setState({profile: res.data})
      )
  }



    onSubmit(e) {
      e.preventDefault();
      const newPost = {
        insurancetype: this.state.insurancetype,
        userid: this.state.userid,
        valid: this.state.valid
      };
      this.props.addPost(newPost);
      this.setState({ insurancetype: '',
     userid: '', 
      valid: ''});
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
                  name="insurancetype"
                  value={this.state.insurancetype}
                  onChange={this.onChange.bind(this)}
                />
               <TextAreaFieldGroup
                  placeholder="Userid"
                  name="userid"
                  value={this.state.userid}
                  onChange={this.onChange.bind(this)}
                />
                 
              </div>
              <div>
                
              <TextAreaFieldGroup
                  placeholder="valid (I don't know why)"
                  name="valid"
                  value={this.state.valid}
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
  errors: state.errors,
  user: state.users
});

export default connect(mapStateToProps, { addPost })(form_addinsurance);

