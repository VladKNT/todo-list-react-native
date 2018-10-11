import React, { Component } from 'react';

import { ApolloClient} from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { getMainDefinition } from 'apollo-utilities';
import { WebSocketLink } from 'apollo-link-ws';
import { ApolloLink, split } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { withClientState } from 'apollo-link-state'

import { resolvers, defaults } from './src/resolvers/resolvers';

import { AppRegistry } from 'react-native';
import App from './src/App';

import URLS from './src/constants/urls';

class Todo extends Component {
  render() {
    const cache = new InMemoryCache();

    const stateLink = withClientState({
      resolvers,
      defaults,
      cache
    });

    const httpLink = new HttpLink({ uri: URLS.API_URL });

    const wsLink = new WebSocketLink({
      uri: URLS.WS_URL,
      options: {
        reconnect: true,
      },
    });

    const terminatingLink = split(
      ({ query }) => {
        const { kind, operation } = getMainDefinition(query);
        return (
          kind === 'OperationDefinition' && operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );

    const client = new ApolloClient({
      cache,
      link: ApolloLink.from([
        stateLink,
        terminatingLink
      ])
    });

    return (
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    );
  }
}

AppRegistry.registerComponent('todo', () => Todo);
