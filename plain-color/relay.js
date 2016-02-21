
const ColorPageWrapper = React.createClass({
  render() {
    return <ColorPage
      color={this.props.color}
      onChangeColor={color => {
        Relay.Store.commitUpdate(new ChangeColorMutation({
          color: color
        }));
      }}
    />
  }
});

const ColorPageRelayWrapper = Relay.createContainer(ColorPageWrapper, {
  fragments: {
    color: () => Relay.QL`
      fragment on User {
        color
      }
    `
  },
});

