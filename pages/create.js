// @flow
import { useRouter } from 'next/router';
import { graphql } from 'react-relay';
import { Box, Typography, Input } from '@material-ui/core';

import MainContainer from '../components/MainContainer';
import { CreateProductForm } from '../components/CreateProductForm';

function CreatePage() {
  return (
    <div>
      <Box m={4}>
        <Typography style={{ textAlign: 'center' }} variant="h1">
          Create a product
        </Typography>
      </Box>

      <CreateProductForm />
    </div>
  );
}

export default CreatePage;
