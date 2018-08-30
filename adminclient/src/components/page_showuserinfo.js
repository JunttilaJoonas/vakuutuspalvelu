import React, { Component } from 'react'
import { Table, Row, Col, Image, Button } from 'react-bootstrap';
import { fetchUserProfile } from '../actions';
import { connect } from 'react-redux';

class ShowUserInfo extends Component {

    componentDidMount() {
        const { _id } = this.props.match.params;
        this.props.fetchUserProfile(_id);
    }

  render() {
    
    const { user } = this.props;

    if(!user) {
        return <div>Ladataan profiilia</div>
    }

    return (
        <div>
        <p>{user._id}</p>
        <p>{user.name}</p>
        <p>{user.email}</p>
        </div>
    );
  }
}

function mapStateToProps({ users }, ownProps) {
    return {user: users[ownProps.match.params.id] };
}

export default connect(mapStateToProps, { fetchUserProfile })(ShowUserInfo);
