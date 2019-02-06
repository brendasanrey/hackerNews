// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import VueApollo from 'vue-apollo';
import Vue from 'vue';
import { SubscriptionClient, addGraphQLSubscriptions } from 'subscriptions-transport-ws';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { GC_USER_ID, GC_AUTH_TOKEN } from './constants/settings';
import App from './App';
import router from './router';

Vue.config.productionTip = false;
const userId = localStorage.getItem(GC_USER_ID);

const httpLink = new HttpLink({
  uri: 'https://api.graph.cool/simple/v1/cjrs4cjkl78kh01350w75rh83',
});

const wsClient = new SubscriptionClient('wss://subscriptions.graph.cool/v1/cjrs4cjkl78kh01350w75rh83', {
  reconnect: true,
  connectionParams: {
    authToken: localStorage.getItem(GC_AUTH_TOKEN),
  },
});

const cache = new InMemoryCache();

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  const token = localStorage.getItem(GC_AUTH_TOKEN);
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  });

  return forward(operation);
});

const httpLinkWithSubscriptions = addGraphQLSubscriptions(
  authMiddleware.concat(httpLink),
  wsClient,
);


const apolloClient = new ApolloClient({
  link: httpLinkWithSubscriptions,
  cache,
  connectToDevTools: true,
});

Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
  defaultOptions: {
    $loadingKey: 'loading',
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  apolloProvider,
  data: {
    userId,
  },
  router,
  render: h => h(App),

});
