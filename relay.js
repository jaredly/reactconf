
import Relay from 'relay';
const ColorPageWrapper = React.createClass({
  render() {
    return <ColorPage
      color={this.props.user.color}
      onChangeColor={color => {
        Relay.Store.commitUpdate(new ChangeColorMutation({
          color: color
        }));
      }}
    />
  }
});

const ColorPageRelayWrapper =
Relay.createContainer(ColorPageWrapper, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        color
        ${ChangeColorMutation.getFragment('user')}
      }
    `
  },
});

