
// server-side mutation

const User = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: globalFieldId('user'),
    color: {
      type: GraphQLString,
      resolve: user => user.color,
    },
  },
});

const ChangeColorMutation = mutationWithClientMutationId({
  name: 'ChangeColor',
  inputFields: {
    id: {type: new GraphQLNonNull(GraphQLID)},
    color: {type: new GraphQLNonNull(GraphQLString)},
  },
  mutateAndGetPayload: ({id, color}) => {
    const userId = fromGlobalId(id).id;
    setColorForUser(userId, color);
    return {userId}
  },
  outputFields: {
    user: {
      type: User,
      resolve: ({userId}) => getUserById(id),
    },
  },
});



// client-side mutation

class ChangeColorMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `
  }
  getMutation() {
    return Relay.QL`mutation {changeColor}`
  }
  getVariables() {
    return {
      userId: this.props.user.id,
      color: this.props.color,
    }
  }
  getFatQuery() {
    return Relay.QL`
      fragment on ChangeColorPayload {
        user {
          color
        }
      }
    `
  }
  getOptimisticResponse() {
    return {
      user: {
        id: this.props.user.id,
        color: this.props.color,
      },
    }
  }
  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        user: this.props.user.id
      }
    }]
  }
}

const ColorPageWrapper = React.createClass({
  render() {
    return <ColorPage
      color={this.props.user.color}
      onChangeColor={color => {
        Relay.Store.commitUpdate(new ChangeColorMutation({
          user: this.props.user,
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



