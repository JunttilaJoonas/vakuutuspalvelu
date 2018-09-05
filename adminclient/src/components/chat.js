import React, {Component} from "react";
import io from "socket.io-client";
import {Button, Panel} from 'react-bootstrap';

class Chat extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            username: "Vakuutuspalvelija",
            message: '',
            messageid: "adminviesti",
            open: false,
            istyping: "   ",
            messages: []
        };
    }

    initializeSocket() {

        this.socket = io('ec2-3-120-155-27.eu-central-1.compute.amazonaws.com:4001');
        this.socket.on('RECEIVE_MESSAGE', function (data) {
            addMessage(data);
        });

        this.socket.on('USER_IS_TYPING', function (socketid) {
            console.log("Are we even here");
            handleTyping(socketid);
        })

        this.socket.on('USER_STOPPED_TYPING', function () {
            console.log("Did we stop?");
            setTimeout(handleStopTyping, 1000);
        })

        const handleStopTyping = () => {
            //await sleep(1000);
            this.setState({istyping: ""});
        }

        /*function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
          }*/


        const handleTyping = (socketid) => {
            console.log(this.state);
            let data = socketid + " is typing..."
            if (this.state.istyping != "is typing") {
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
        let chatTitle;
        if (this.state.open) {
            chatTitle = 'Sulje chat'
        } else {
            chatTitle = 'Avaa chat'
        }
        return (
            <div className="chat_frame" onKeyDown={() => this.keyDown()} onKeyUp={() => this.keyUp()}>
            <Button bsClass="chat_button"
                        onClick={() => this.setState({open: !this.state.open}, this.initializeSocket.bind(this))}>
                    {chatTitle}
                </Button>
                <br />
                <Panel id="collapsible-panel" expanded={this.state.open}>
                    <Panel.Collapse className="panel_body_chat">
                        <Panel.Body className="panel_body_chat">
                            <div className="chat_container">
                                <div className="row">
                                    <div className="col-4">
                                        <div className="card">
                                            <div className="card-body">
                                                <div className="card-title"></div>
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
                                   <form>
                                    <input type="text" placeholder={this.state.istyping} className="form-control"
                                           value={this.state.message}
                                           onChange={ev => this.setState({message: ev.target.value})}/>
                                    <br/>
                                    <button type="submit" onClick={this.sendMessage}
                                            className="btn btn-primary form-control">Lähetä
                                    </button>
                                </form>
                                
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

export default Chat;