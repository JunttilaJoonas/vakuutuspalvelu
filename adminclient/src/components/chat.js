import React, {Component} from "react";
import io from "socket.io-client";
import { runInThisContext } from "vm";


class Chat extends Component {
  constructor(props){
    super(props);

    this.state = {
        username: "Vakuutuspalvelija",
        message: '',
        messageid: "adminviesti",
        istyping : "   ",
        messages: []
    };
}

initializeSocket() {
    
    this.socket = io('localhost:4001');
    this.socket.on('RECEIVE_MESSAGE', function (data) {
        addMessage(data);
    });

    this.socket.on('USER_IS_TYPING', function(socketid) {
        console.log("Are we even here");
        handleTyping(socketid);
    })

    this.socket.on('USER_STOPPED_TYPING', function() {
        console.log("Did we stop?");
        setTimeout(handleStopTyping, 1000);
    })

    const handleStopTyping = () => {
        //await sleep(1000);
        this.setState({istyping: "" });
    }

    /*function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }*/
      
    

    const handleTyping = (socketid) =>  {
        console.log(this.state);
        let data = socketid + " is typing..."
        if(this.state.istyping != "is typing") {
        this.setState({istyping: data});
        }
    }

    this.socket.emit('INITIALIZE_ADMIN');

    this.socket.on('USER_DISCONNECTED', (username) => {
        console.log("USERNAME" + username);
        let disconnectmessage = {
            author: username,
            message: "User disconnected"
        }
        addMessage(disconnectmessage);
    })

    const addMessage = data => {
        console.log(data);
        this.setState({messages: [...this.state.messages, data]});
        console.log(this.state.messages);
    };

this.sendMessage = ev => {
    ev.preventDefault();
    this.socket.emit('SEND_ADMIN_MESSAGE', {
        author: this.state.username,
        message: this.state.message,
        messageid: this.state.messageid
    })
    this.setState({message: ''});

    }
}

keyDown() {
    
    this.socket.emit('TYPING_ADMIN');
}

keyUp() {
    this.socket.emit('ADMIN_STOPPED_TYPING');
}


    render() {
        return (
            <div className="container" onKeyDown={() => this.keyDown()} onKeyUp={() => this.keyUp()}>
                <div className="row">
                    <div className="col-4">
                        <div className="card">
                            <div className="card-body">
                                <div className="card-title">{this.state.istyping}</div>
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
                                <input type="text" placeholder={this.state.istyping} className="form-control"
                                       value={this.state.message}
                                       onChange={ev => this.setState({message: ev.target.value})}/>
                                <br/>
                                <button onClick={this.sendMessage} className="btn btn-primary form-control">Send
                                </button>
                                <button onClick={this.initializeSocket.bind(this)} className="btn btn-primary form-control">Connect
</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Chat;