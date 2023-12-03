// @flow
import { Environment, Network, RecordSource, Store } from "relay-runtime";

import type {
  RequestParameters,
  Variables,
  GraphQLResponse,
  DataID,
} from "relay-runtime";

const { RELAY_ENDPOINT = "" } = process.env;

let relayEnvironment = null;

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(
  operation: RequestParameters,
  variables: Variables
): Promise<GraphQLResponse> {
  const endpoint =
    typeof window === "undefined"
      ? `${RELAY_ENDPOINT}/api/graphql`
      : "/api/graphql";
  return fetch(endpoint, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    }, // Add authentication and other headers here
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then((response) => response.json());
}

type InitEnvParams = {
  records: Map<DataID, ?{ [key: string]: mixed }>,
};

export function createRelayEnvironment({ records }: InitEnvParams = {}) {
  // Create a network layer from the fetch function
  const network = Network.create(fetchQuery);

  const store = new Store(new RecordSource(records || {}), {
    gcReleaseBufferSize: 10,
  });

  // Make sure to create a new Relay environment for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (typeof window === "undefined") {
    return new Environment({
      network,
      store,
    });
  }

  // reuse Relay environment on client-side
  if (!relayEnvironment) {
    relayEnvironment = new Environment({
      network,
      store,
    });
  }

  return relayEnvironment;
}
