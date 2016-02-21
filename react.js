
|Users table|
|id | color |
|1  | 'red' |


const ColorPage = React.createClass({
  render() {
    return <div>
      Color: {this.props.color}
      <button onClick={
        () => this.props.onChangeColor('blue')
      }>
        Change Color to Blue
      </button>
    </div>
  }
})

// Root component that holds the app state
const PORCApp = React.createClass({
  getInitialState() {
    return {users: {1: {color: 'red'}}}
  },
  onChangeColor(userId, color) {
    postColorChangeToServer(userId, color);
    this.setState(
      setIn(this.state, ['users', userId, 'color'], color)
    );
  },
  render() {
    return <div>
      <ColorPage
        color={this.state.users[1].color}
        onChangeColor={color => this.onChangeColor(1, color)}
      />
    </div>
  }
});
ReactDOM.render(<PORCApp />, node);
