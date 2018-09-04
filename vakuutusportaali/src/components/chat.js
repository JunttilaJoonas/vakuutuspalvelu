import React, { Component } from "react";
import io from "socket.io-client";
import {connect} from 'react-redux';
import axios from 'axios';
import { Button, Panel } from 'react-bootstrap';

class Chat extends Component {
    

  constructor(props, context){
    super(props, context);

    this.state = {
        profile: [],
        message: '',
        messages: [],
        open: false
    };

    

    this.socket = io('localhost:4001');



    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });

    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
    };

    

    this.sendMessage = ev => {
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.profile.email,
            message: this.state.message,
            messageid: this.props.auth.user.id
        })
        this.setState({message: ''});

    }
}





componentWillMount() {
console.log(this.props.auth);
this.socket.emit('join', {id: this.props.auth.user.id})  
  axios.get("http://localhost:4000/profiili/current")
      .then(res => {
          this.setState({profile: res.data});
      })
    }
    

render(){
  
    var chatTitle;
    if(this.state.open) {
        chatTitle = 'Sulje chat'
    } else {
        chatTitle = 'Avaa chat'
    }
    return (
    
        <div className="chat_frame">
        <Button bsClass="chat_button" onClick={() => this.setState({ open: !this.state.open })}>
          {chatTitle}
        </Button>
        <br />
        <Panel id="collapsible-panel"  expanded={this.state.open}>
          <Panel.Collapse className="panel_body_chat">
            <Panel.Body className="panel_body_chat">
            <div className="chat_container">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Vakuutuschat</div>
                            <hr/>
                            <div className="messages">
                                {this.state.messages.map(message => {
                                    return (
                                        <div><b>{message.author}</b>: {message.message}</div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className="card-footer">
                            <br/>
                            <input type="text" placeholder="Viesti" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                            <br/>
                            <button onClick={this.sendMessage} className="btn btn-primary form-control">Lähetä</button>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
            </Panel.Body>
          </Panel.Collapse>
        </Panel>
        </div>

    );
}
}
const mapStateToProps = (state) => ({
    auth: state.auth,
    user: state.users
});

export default connect(mapStateToProps)(Chat)