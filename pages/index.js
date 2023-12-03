// @flow
import { Component } from 'react';
import { fetchQuery, graphql, useLazyLoadQuery } from 'react-relay';
import Card from '@material-ui/core/Card';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';
import Skeleton from '@material-ui/lab/Skeleton';

import type { pages_indexQueryResponse } from '../__generated__/pages_indexQuery.graphql';
import ProductCard from '../components/ProductCard';

type Props = {
  ...pages_indexQueryResponse,
};

function Index(props: Props) {
  return (
    <Box>
      <Box m={4}>
        <Typography style={{ textAlign: 'center' }} variant="h1">
          Products
        </Typography>
      </Box>

      <Grid container spacing={3}>
        {props.viewer.products.map((one) => (
          <Grid key={one.id} item xs={12} sm={6} md={4} lg={3}>
            <ProductCard product={one} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

Index.query = graphql`
  query pages_indexQuery {
    viewer {
      products {
        id
        name
        description
        price
        createdAt
      }
    }
  }
`;

Index.loading = (
  <Box>
    <div style={{ textAlign: 'center', margin: 32 }}>
      <Typography variant="h1">Products</Typography>
    </div>

    <Grid container spacing={3}>
      {Array.from(Array(9).keys()).map((i) => (
        <Grid key={i} item xs={12} sm={6} md={4} lg={3}>
          <Skeleton key={i} style={{ height: 160 }} variant="rect" />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default Index;
