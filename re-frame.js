
// defining a subscription
registerSubscription('color', (state, userId) => {
  return state.users[userId].color
});

// using the subscription
const ColorPageWrapper = ({userId}) => {
  const color = subscribe('color', userId);
  return () => {
    return <ColorPage
      color={color.get()} // <- using the subscription
      onChangeColor={color => actions.setColor(userId, color)}
    />
  }
}



