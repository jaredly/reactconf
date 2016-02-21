/* action-creators.js */
import {AppDispatcher} from 'ka-flux';
const setColor = (userId, color) => {
  postColorChangeToServer(userId, color);
  AppDispatcher.handleViewAction({
    actionType: Constants.SET_COLOR,
    userId: userId,
    color: color,
  });
}
// other action creators here

/* stores/user-store.js */
import Flux, {AppDispatcher} from 'ka-flux';
let users = {1: {color: 'red'}};

const UserStore = Flux.createStore({
  getColor(userId) {
    return users[userId].color
  },
  // other getters for this store here

  dispatcherIndex: AppDispatcher.register(({action}) => {
    switch (action.actionType) {
      case Constants.SET_COLOR:
        users[action.userId] = action.color
        break
      // handle other actions here
    }
  }),
});
// you might also have other stores

/* page.js */
import {StateFromStore} from 'ka-flux';
import * as ActionCreators from './action-creators';
import UserStore from './stores/user-store';

const ColorPageWrapper = React.createClass({
  mixins: [StateFromStore({
    color: {
      store: UserStore,
      getFetchParams: props => {userId: props.userId},
      fetch: (store, fetchParams) => (
        store.getColor(fetchParams.userId)
      ),
    },
    // other props from stores here
  })],
  render() {
    return <ColorPage
      color={this.state.color}
      onChangeColor={color => ActionCreators.setColor(
        this.props.userId,
        color
      )}
    />
  }
});

/* setup.js */
ReactDOM.render(<FluxApp />, node);
