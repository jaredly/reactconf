/* actions.js */
import {dispatch} from 're-frame';
const setColor = (userId, color) => {
  postColorChangeToServer(userId, color);
  dispatch('set-color', userId, color);
}
/* handlers.js */
import {registerHandler} from 're-frame';
registerHandler('set-color', (state, userId, color) => {
  return setIn(state, ['users', userId, 'color'], color);
});
/* subscriptions.js */
import {registerSubscription} from 're-frame';
registerSubscription('color', (state, userId) => {
  return state.users[userId].color
});

/* page.js */
import {subscribe} from 're-frame';
const ColorPageWrapper = ({userId}) => {
  const color = subscribe('color', userId);
  return () => {
    return <ColorPage
      color={color.get()}
      onChangeColor={color => actions.setColor(userId, color)}
    />
  }
}
// ReFrameApp has <ColorPageWrapper /> somewhere
ReFrame.render(<ReFrameApp/>, node);
