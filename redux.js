/* actions.js */
export const setColor = (userId, color) => {
  postColorChangeToServer(userId, color);
  return {
    type: Constants.SET_COLOR,
    userId: userId,
    color: color
  }
}
// other action creators here

/* reducers.js */
export const rootReducer = (state, {type, userId, color}) => {
  switch (type) {
    case Constants.SET_COLOR:
      return setIn(state, ['users', userId, 'color'], color);
    // handle other actions here
    default:
      return state
  }
}

/* page.js */
import {connect} from 'react-redux';
import * as actions from './actions';
const ColorPageWrapper = connect(
  /* mapStateToProps */
  (state, props) => ({
    color: state.users[props.userId].color,
    // other data this comp might need
  }),
  /* mapDispatchToProps */
  (dispatch, props) => ({
    onChangeColor: color => (
      dispatch(actions.setColor(props.userId, color))
    )
  }),
)(ColorPage)

const ReduxApp = React.createClass({
  render() {
    return <div>
      ...
      <ColorPageWrapper />
      ...
    </div>
  }
});

/* index.js */
import {createStore} from 'redux';
import {rootReducer} from './reducers';

const store = createStore(rootReducer, {color: 'red'});
ReactDOM.render(<Provider store={store}>
  <ReduxApp />
</Provider>, node);

