import {AppDispatcher} from 'ka-flux';
const setColor = (userId, color) => {
  postColorChangeToServer(userId, color);
  AppDispatcher.handleViewAction({
    actionType: Constants.SET_COLOR,
    userId: userId,
    color: color,
  });
}
import Flux, {AppDispatcher} from 'ka-flux';
let users = {1: {color: 'red'}};
const UserStore = Flux.createStore({
  getColor(userId) {
    return users[userId].color
  },
  dispatcherIndex: AppDispatcher.register(({action}) => {
    switch (action.actionType) {
      case Constants.SET_COLOR:
        users[action.userId] = action.color
        break
    }
  }),
});
// you might also have other stores

/* page.js */
import {StateFromStore} from 'ka-flux';
const ColorPageWrapper = React.createClass({
  mixins: [StateFromStore({
    color: {
      store: UserStore,
      getFetchParams: props => {userId: props.userId},
      fetch: (store, fetchParams) => (
        store.getColor(fetchParams.userId)
      ),
    },
  })],
  render() {
    return <ColorPage
      color={this.state.color}
      onChangeColor={color =>
        ActionCreators.setColor(this.props.userId, color)}
    />
  }
});
// FluxApp has <ColorPageWrapper /> somewhere
ReactDOM.render(<FluxApp />, node);

