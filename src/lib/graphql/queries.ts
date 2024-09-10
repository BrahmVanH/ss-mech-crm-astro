import { gql, type DocumentType } from "../__generated__/gql";
import { print as printGql } from "graphql/language/printer";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { DocumentNode } from "graphql";

// The redundant type DocumentType is a workaround to allow for graphql typechecking on queries

export const QUERY_WORKORDERS_STRING = `
  query QueryWorkOrders {
    queryWorkOrders {
      date
      lastUpdated
      customerId {
        _id
        firstName
        lastName

      }
      propertyId {
        _id
        propertyName
      }
      type
      description
      completed
      completedBy
      quote
      total
      charged
      paid
      comments
      invoices {
        _id
      }
    }
  }
`;
const QUERY_WORKORDERS = gql(
  /* GraphQL */ QUERY_WORKORDERS_STRING,
) as DocumentNode;

// export const QUERY_WORKORDERS_STRING = printGql(QUERY_WORKORDERS);
