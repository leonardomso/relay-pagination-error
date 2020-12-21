import React from 'react';
import { RelayEnvironmentProvider } from "relay-hooks";

import RelayEnvironment from "./relay/RelayEnvironment";

import Search from "./components/Search";

const App = () => (
  <RelayEnvironmentProvider environment={RelayEnvironment}>
    <Search />
  </RelayEnvironmentProvider>
);

export default App;
