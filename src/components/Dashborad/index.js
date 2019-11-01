import React, { Component } from 'react';
import { AuthUserContext, withAuthorization } from '../Session';
import { withFirebase } from '../Firebase';

const Dashboard = () => (
  <div className='gloabl-wrapper'>
    <h1>Dashboard</h1>
    <hr />
    <h2><span aria-label='chat' role="img">&#128517;</span> Quick Chat</h2>
    <Messages />
  </div>
);

class MessagesBase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      loading: false,
      messages: [],
    };
  }
  componentDidMount() {
    this.setState({ loading: true });
    this.props.firebase.messages().on('value', snapshot => {
      const messageObject = snapshot.val();
      if (messageObject) {
        const messageList = Object.keys(messageObject).map(key => ({
          ...messageObject[key],
          uid: key,
        }));
        this.setState({
          messages: messageList,
          loading: false,
        });
      } else {
        this.setState({ messages: null, loading: false });
      }
    });
  }
  componentWillUnmount() {
    this.props.firebase.messages().off();
  }
  onChangeText = event => {
    this.setState({ text: event.target.value });
  };
  onCreateMessage = (event, authUser) => {
    console.log(authUser);
    if(this.state.text !== '') {
      this.props.firebase.messages().push({
        text: this.state.text,
        userId: authUser.uid,
        userEmail: authUser.email,
      });
      this.setState({ text: '' });
    }
    event.preventDefault();
  };
  onRemoveMessage = uid => {
    this.props.firebase.message(uid).remove();
  };
  render() {
    const { text, messages, loading } = this.state;
    return (
      <AuthUserContext.Consumer>
        {authUser => (
      <div>
        {loading && <div>Loading ...</div>}
        {messages ? (
          <MessageList messages={messages} onRemoveMessage={this.onRemoveMessage} />
        ) : (
          <div>There are no messages ...</div>
        )}
        <form onSubmit={event => this.onCreateMessage(event, authUser)}>
          <input
            type="text"
            value={text}
            onChange={this.onChangeText}
          />
          <button type="submit">Send</button>
        </form>
      </div>
      )}
      </AuthUserContext.Consumer>
    );
  }
}
const Messages = withFirebase(MessagesBase);

const MessageList = ({ messages, onRemoveMessage }) => (
  <ul>
    {messages.map(message => (
      <MessageItem 
        key={message.uid} 
        message={message}
        onRemoveMessage={onRemoveMessage}
      />
    ))}
  </ul>
);
const MessageItem = ({ message, onRemoveMessage }) => (
  <li data-key={message.userId}>
    <strong>{message.userEmail}</strong> {message.text}
    <button
      type="button"
      onClick={() => onRemoveMessage(message.uid)}
    >
      Delete
    </button>
  </li>
);

const condition = authUser => !!authUser;

export default withAuthorization(condition)(Dashboard);