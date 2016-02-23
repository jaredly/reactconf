/* actions.js */
export const setColor = (userId, color) => {
  postColorChangeToServer(userId, color);
  return {
    type: Constants.SET_COLOR,
    userId: userId,
    color: color
  }
}
/* reducers.js */
export const rootReducer = (state, {type, userId, color}) => {
  switch (type) {
    case Constants.SET_COLOR:
      return setIn(state, ['users', userId, 'color'], color);
    default:
      return state
  }
}

import {connect} from 'react-redux';
const ColorPageWrapper = connect(
  (state, props) => ({
    color: state.users[props.userId].color,
  }),

  (dispatch, props) => ({
    onChangeColor: color => (
      dispatch(actions.setColor(props.userId, color))
    )
  }),
)(ColorPage)

import {createStore} from 'redux';
const store = createStore(
  rootReducer, {{users: {1: {color: 'red'}}}});
ReactDOM.render(<Provider store={store}>
  <ReduxApp /> // has <ColorPageWrapper/> somewhere
</Provider>, node);

