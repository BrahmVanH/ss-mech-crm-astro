/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\tquery QueryWorkOrders {\n\t\tqueryWorkOrders {\n\t\t\tdate\n\t\t\tlastUpdated\n\t\t\tcustomerId {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t}\n\t\t\tpropertyId {\n        _id\n      }\n\t\t\ttype\n\t\t\tdescription\n\t\t\tcompleted\n\t\t\tcompletedBy\n\t\t\tquote\n\t\t\ttotal\n\t\t\tcharged\n\t\t\tpaid\n\t\t\tcomments\n\t\t\tinvoices {\n        _id\n\t\t\t\tdate\n\t\t\t\ttotal\n\t\t\t\tpaid\n\t\t\t}\n\t\t}\n\t}\n": types.QueryWorkOrdersDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\tquery QueryWorkOrders {\n\t\tqueryWorkOrders {\n\t\t\tdate\n\t\t\tlastUpdated\n\t\t\tcustomerId {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t}\n\t\t\tpropertyId {\n        _id\n      }\n\t\t\ttype\n\t\t\tdescription\n\t\t\tcompleted\n\t\t\tcompletedBy\n\t\t\tquote\n\t\t\ttotal\n\t\t\tcharged\n\t\t\tpaid\n\t\t\tcomments\n\t\t\tinvoices {\n        _id\n\t\t\t\tdate\n\t\t\t\ttotal\n\t\t\t\tpaid\n\t\t\t}\n\t\t}\n\t}\n"): (typeof documents)["\n\tquery QueryWorkOrders {\n\t\tqueryWorkOrders {\n\t\t\tdate\n\t\t\tlastUpdated\n\t\t\tcustomerId {\n\t\t\t\t_id\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t}\n\t\t\tpropertyId {\n        _id\n      }\n\t\t\ttype\n\t\t\tdescription\n\t\t\tcompleted\n\t\t\tcompletedBy\n\t\t\tquote\n\t\t\ttotal\n\t\t\tcharged\n\t\t\tpaid\n\t\t\tcomments\n\t\t\tinvoices {\n        _id\n\t\t\t\tdate\n\t\t\t\ttotal\n\t\t\t\tpaid\n\t\t\t}\n\t\t}\n\t}\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;