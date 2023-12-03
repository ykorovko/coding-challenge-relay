// @flow
import {
  render,
  cleanup,
  act,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { useRelayEnvironment } from 'react-relay/hooks';
import { MockPayloadGenerator, createMockEnvironment } from 'relay-test-utils';
import { RelayEnvironmentProvider } from 'react-relay';

import '@testing-library/jest-dom';

import { CreateProductForm } from '../components/CreateProductForm';

jest.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

afterEach(cleanup);

describe('<CreateProductForm />', () => {
  it('Should successfully create a product', async () => {
    const environment = createMockEnvironment();

    render(
      <RelayEnvironmentProvider environment={environment}>
        <CreateProductForm />
      </RelayEnvironmentProvider>,
    );

    await waitFor(async () => {
      fireEvent.change(await screen.findByTestId('name'), {
        target: { value: 'Test name' },
      });

      fireEvent.change(await screen.findByTestId('description'), {
        target: { value: 'Test description' },
      });

      fireEvent.change(await screen.findByTestId('category'), {
        target: { value: 'Test category' },
      });

      fireEvent.change(await screen.findByTestId('price'), {
        target: { value: '100' },
      });

      const btn = await screen.findByTestId('submit-button');
      fireEvent.click(btn);
    });

    const variables = {
      input: {
        name: 'Test name',
        description: 'Test description',
        category: 'Test category',
        price: '100',
      },
    };

    const mutationOperation = environment.mock.getMostRecentOperation();

    const operationVariables = mutationOperation.fragment.variables;

    expect(operationVariables).toEqual(variables);

    const mutationMockResolvers = {
      Mutation: () => ({
        AddProduct: {
          error: null,
          success: 'Product created successfully',
        },
      }),
    };

    act(() => {
      environment.mock.resolveMostRecentOperation((operation) =>
        MockPayloadGenerator.generate(operation, mutationMockResolvers),
      );
    });

    // await waitFor(async () => {
    //   expect(await screen.queryByText('Test name')).toBeInTheDocument();
    // });
  });

  it('Should display validation errors', async () => {
    const environment = createMockEnvironment();

    render(
      <RelayEnvironmentProvider environment={environment}>
        <CreateProductForm />
      </RelayEnvironmentProvider>,
    );

    await waitFor(async () => {
      fireEvent.click(await screen.findByTestId('submit-button'));
    });

    expect(await screen.queryByText('Name is required')).toBeInTheDocument();
    expect(
      await screen.queryByText('Description is required'),
    ).toBeInTheDocument();
    expect(
      await screen.queryByText('Category is required'),
    ).toBeInTheDocument();
  });
});
