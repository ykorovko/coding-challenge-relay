/**
 * @flow
 */

/* eslint-disable */

'use strict';

/*::
import type { ConcreteRequest } from 'relay-runtime';
export type ProductInput = {|
  name: string,
  description: string,
  category: string,
  price: number,
|};
export type CreateProductFormMutationVariables = {|
  input: ProductInput
|};
export type CreateProductFormMutationResponse = {|
  +addProduct: ?{|
    +id: string,
    +name: string,
    +description: string,
    +category: string,
    +price: number,
  |}
|};
export type CreateProductFormMutation = {|
  variables: CreateProductFormMutationVariables,
  response: CreateProductFormMutationResponse,
|};
*/


/*
mutation CreateProductFormMutation(
  $input: ProductInput!
) {
  addProduct(data: $input) {
    id
    name
    description
    category
    price
  }
}
*/

const node/*: ConcreteRequest*/ = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "input"
  }
],
v1 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "data",
        "variableName": "input"
      }
    ],
    "concreteType": "Product",
    "kind": "LinkedField",
    "name": "addProduct",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "id",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "name",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "description",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "category",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "price",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "CreateProductFormMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "CreateProductFormMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7688cd294d2a102e4ef1932e59cd0d6f",
    "id": null,
    "metadata": {},
    "name": "CreateProductFormMutation",
    "operationKind": "mutation",
    "text": "mutation CreateProductFormMutation(\n  $input: ProductInput!\n) {\n  addProduct(data: $input) {\n    id\n    name\n    description\n    category\n    price\n  }\n}\n"
  }
};
})();
// prettier-ignore
(node/*: any*/).hash = '80e3880f8fe4cd21b527fcac8f7f7d0f';

module.exports = node;
