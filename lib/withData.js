// @flow
import React from "react";
import {
  fetchQuery,
  ReactRelayContext,
  type GraphQLTaggedNode,
  type Environment,
} from "react-relay";

import { createRelayEnvironment } from "./createRelayEnvironment";

type ComposedComponentType = React$ComponentType<*> & {
  getInitialProps?: (ctx: Context) => Promise<*>,
};

type Props = {
  queryRecords: any,
  viewer: any,
};

type Context = {
  req: {
    locale: string,
    localeDataScript: string,
    isMobile: boolean,
    isBot: boolean,
  },
};

type Options = {
  query: GraphQLTaggedNode,
};
// $flow: disable for
const withData = (
  ComposedComponent: ComposedComponentType,
  options?: Options = {}
) =>
  class WithData extends React.Component<Props> {
    environment: Environment;

    static displayName = `WithData(${ComposedComponent.displayName || ""})`;

    static async getInitialProps(ctx: Context) {
      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      // $flow: flow doesn't know about getInitialProps
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx);
      }

      let queryProps = {};
      let queryRecords = {};
      const environment = createRelayEnvironment();

      if (options.query) {
        // Provide the `url` prop data in case a graphql query uses it
        // const url = { query: ctx.query, pathname: ctx.pathname }
        const variables = {};
        // TODO: Consider RelayQueryResponseCache
        // https://github.com/facebook/relay/issues/1687#issuecomment-302931855
        queryProps = await fetchQuery(environment, options.query, variables);
        queryRecords = environment
          .getStore()
          .getSource()
          .toJSON();
      }

      return {
        ...composedInitialProps,
        ...queryProps,
        queryRecords,
      };
    }

    constructor(props: Props) {
      super(props);
      this.environment = createRelayEnvironment({
        records: props.queryRecords,
      });
    }

    render() {
      return (
        <ReactRelayContext.Provider value={{ environment: this.environment }}>
          <ComposedComponent {...this.props} />
        </ReactRelayContext.Provider>
      );
    }
  };
