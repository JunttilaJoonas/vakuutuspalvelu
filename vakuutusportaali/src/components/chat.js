import React, { Component } from "react";
import io from "socket.io-client";
import axios from 'axios';

class Chat extends Component {
  constructor(props){
    super(props);

    this.state = {
        profile: [],
        message: '',
        messages: []
    };

    this.socket = io('localhost:4001');

    this.socket.on('RECEIVE_MESSAGE', function(data){
        addMessage(data);
    });

    const addMessage = data => {
        this.setState({messages: [...this.state.messages, data]});
    };

    this.sendMessage = ev => {
        ev.preventDefault();
        this.socket.emit('SEND_MESSAGE', {
            author: this.state.profile.email,
            message: this.state.message
        })
        this.setState({message: ''});

    }
}

componentWillMount() {
  axios.get("http://localhost:4000/profiili/current")
      .then(res => {
          this.setState({profile: res.data});
      })}

render(){
    return (
        <div className="container">
            <div className="row">
                <div className="col-4">
                    <div className="card">
                        <div className="card-body">
                            <div className="card-title">Global Chat</div>
                            <hr/>
                            <div className="messages">
                                {this.state.messages.map(message => {
                                    return (
                                        <div>{message.author}: {message.message}</div>
                                    )
                                })}
                            </div>

                        </div>
                        <div className="card-footer">
                            <br/>
                            <input type="text" placeholder="Message" className="form-control" value={this.state.message} onChange={ev => this.setState({message: ev.target.value})}/>
                            <br/>
                            <button onClick={this.sendMessage} className="btn btn-primary form-control">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
}

export default Chat;