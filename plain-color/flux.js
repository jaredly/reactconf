
/* action-creators.js */
import {AppDispatcher} from 'ka-flux';
const setColor = color => {
  postColorChangeToServer(color);
  AppDispatcher.handleViewAction({
    actionType: Constants.SET_COLOR,
    color: color
  });
}
// other action creators here

/* stores/color-store.js */
import Flux, {AppDispatcher} from 'ka-flux';
let color = 'red';

const ColorStore = Flux.createStore({
  getColor() {
    return color
  },
  // other getters for this store here

  dispatcherIndex: AppDispatcher.register(payload => {
    switch (payload.action.actionType) {
      case Constants.SET_COLOR:
        color = payload.action.color
        break
      // handle other actions here
    }
  }),
});
// you might also have other stores

/* page.js */
import {StateFromStore} from 'ka-flux';
import * as ActionCreators from './action-creators';
import ColorStore from './stores/color-store';

const ColorPageWrapper = React.createClass({
  mixins: [StateFromStore({
    color: {
      store: ColorStore,
      fetch: store => store.getColor(),
    },
    // other props from stores here
  })],
  render() {
    return <ColorPage
      color={this.state.color}
      onChangeColor={ActionCreators.setColor}
    />
  }
});

/* setup.js */
ReactDOM.render(<FluxApp />, node);
