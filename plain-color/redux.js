
/* actions.js */
export const setColor = color => {
  postColorChangeToServer(color);
  return {
    type: Constants.SET_COLOR,
    payload: color
  }
}
// other action creators here

/* reducers.js */
export const rootReducer = (state, {type, payload}) => {
  switch (type) {
    case Constants.SET_COLOR:
      return {...state, color: payload}
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
  state => ({
    color: state.color,
    // other state this comp might need
  }),
  /* actionCreatorProps */
  {
    onChangeColor: actions.setColor,
    // other actions this comp needs to take
  }
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

