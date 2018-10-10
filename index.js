import React, { Component } from 'react';

import { ApolloClient} from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { HttpLink } from 'apollo-link-http'
import { ApolloLink } from 'apollo-link'
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

    const client = new ApolloClient({
      cache,
      link: ApolloLink.from([
        stateLink,
        new HttpLink({ uri: URLS.API_URL })
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
