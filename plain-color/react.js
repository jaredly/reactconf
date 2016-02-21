
// Child component
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
    return {color: 'red'}
  },
  onChangeColor(color) {
    postColorChangeToServer(color);
    this.setState({color});
  },
  render() {
    return <div>
      ...
      <ChildComponent
        color={this.state.color}
        onChangeColor={color => this.setState({color})}
      />
      ...
    </div>
  }
});

ReactDOM.render(<PORCApp />, node);
