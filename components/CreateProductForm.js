// @flow
import { useCallback } from 'react';
import { useRouter } from 'next/router';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, FormHelperText, Paper } from '@material-ui/core';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useRelayEnvironment,
  commitMutation,
  useMutation,
  graphql,
} from 'react-relay';
import * as yup from 'yup';

import {
  CreateProductFormMutation,
  ProductInput,
} from '../__generated__/CreateProductFormMutation.graphql';
import { FormInputText } from './FormInputText';
import { FormInputNumber } from './FormInputNumber';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required'),
  price: yup.string().required('Price is required'),
});

export function CreateProductForm() {
  const router = useRouter();

  const environment = useRelayEnvironment();

  const [commit, isInFlight] = useMutation<CreateProductFormMutation>(graphql`
    mutation CreateProductFormMutation($input: ProductInput!) {
      addProduct(data: $input) {
        id
        name
        description
        category
        price
      }
    }
  `);

  const form = useForm({
    resolver: yupResolver(schema),
  });

  const submit: SubmitHandler<ProductInput> = useCallback((values) => {
    commit({
      variables: {
        input: {
          ...values,
          price: Number(values.price),
        },
      },
      onCompleted(data) {
        router.push('/');
      },
      onError(error) {
        console.error(error);
        form.setError('root', { message: 'Here' });
      },
    });
  }, []);

  const isError = form.formState.errors['root'];

  return (
    <Paper
      style={{
        padding: 16,
        maxWidth: 600,
        margin: 'auto',
      }}
    >
      <FormProvider {...form}>
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
          }}
          autoComplete="off"
          noValidate
          onSubmit={form.handleSubmit(submit)}
        >
          <FormInputText name="name" label="Name" />
          <FormInputText name="description" label="Description" />
          <FormInputText name="category" label="Category" />

          <FormInputNumber name="price" label="Price" />

          {isError && (
            <FormHelperText error={form.formState.errors}>
              Something went wrong, try again
            </FormHelperText>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={form.formState.isSubmitting}
            data-testid="submit-button"
          >
            Submit
          </Button>
        </form>
      </FormProvider>
    </Paper>
  );
}
