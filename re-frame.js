
/* actions.js */
import {dispatch} from 're-frame';
export const setColor = color => {
  postColorChangeToServer(color);
  dispatch('set-color', color);
}

/* handlers.js */
import {registerHandler} from 're-frame';
registerHandler('set-color', (state, color) => {
  return {...state, color}
});

/* subscriptions.js */
import {registerSubscription} from 're-frame';
registerSubscription('color', state => state.color);

/* page.js */
import {subscribe} from 're-frame';
const ColorPageWrapper = () => {
  const color = subscribe('color');
  return () => {
    return <ColorPage
      color={color.get()}
      onChangeColor={actions.setColor}
    />
  }
}

/* setup.js */
ReFrame.render(<ReFrameApp/>, node);
