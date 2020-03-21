import React from "react";
import Message from "./TextChat/Message";
import { List } from "@material-ui/core";

class ChatWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      messageLog: [
        { nickname: "Hannes", message: "Was geht bei euch?" },
        { nickname: "Vera", message: "Alles locker :)" },
        { nickname: "Tom", message: "Können wir emojis?" }
      ]
    };
  }

  componentDidMount() {
    let { socket } = this.props;

    socket.on("rec_message", this.handleIncomingMessage);
  }

  handleIncomingMessage = ({ nickname, message }) => {
    let { messageLog } = this.state;

    // TODO limit to last n-Messages
    messageLog = [...messageLog, { nickname, message }];

    this.setState({ messageLog });
  };

  handleChange = event => {
    this.setState({ message: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    let { socket } = this.props;
    let { message } = this.state;

    let nickname = "TODO Nick";
    let channel = "TODO Channel";

    if (message) {
      socket.emit("send_message", { nickname, channel, message });
    }
  };

  render() {
    let { messageLog } = this.state;
    let ownNickname = "TODO Nick";
    return (
      <div>
        <div>Chat</div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" onChange={this.handleChange} />
        </form>
        <List dense={true}>
          {messageLog.map((m, i) => (
            <Message message={m} id={i} ownMessage={m.nickname == ownNickname}></Message>
          ))}
        </List>
      </div>
    );
  }
}

export default ChatWrapper;
