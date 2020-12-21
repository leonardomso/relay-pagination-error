import { Environment, Network, RecordSource, Store } from "relay-runtime";

import cacheHandler from "./cacheHandler";
// import { relayTransactionLogger } from './relayTransactionLogger';

const network = Network.create(cacheHandler);

// const __DEV__ = process.env.NODE_ENV === 'development';

const env = new Environment({
  network,
  store: new Store(new RecordSource(), {
    // This property tells Relay to not immediately clear its cache when the user
    // navigates around the app. Relay will hold onto the specified number of
    // query results, allowing the user to return to recently visited pages
    // and reusing cached data if its available/fresh.
    gcReleaseBufferSize: 10,
  }),
  // log: __DEV__ ? relayTransactionLogger : null,
});

export default env;
