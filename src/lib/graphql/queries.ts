// import { gql, type DocumentType } from "../__generated__/gql";
import { print as printGql } from "graphql/language/printer";
import type { TypedDocumentNode } from "@graphql-typed-document-node/core";
import type { DocumentNode } from "graphql";

// The redundant type DocumentType is a workaround to allow for graphql typechecking on queries

export const QUERY_WORKORDERS_STRING = `
  query QueryWorkOrders {
    queryWorkOrders {
      _id
      date
      lastUpdated
      customerId {
        _id
        firstName
        lastName
        phone
        email

      }
      propertyId {
        _id
        propertyName
        propertyAddress {
          _id
          street
          unit
          city
          state
          zip

          }
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
// const QUERY_WORKORDERS = gql(
//   /* GraphQL */ QUERY_WORKORDERS_STRING,
// ) as DocumentNode;

export const QUERY_WORKORDER_STRING = `
query QueryWorkOrderById($workOrderId: ID!) {
    queryWorkOrderById(workOrderId: $workOrderId) {
      _id
      date
      lastUpdated
      customerId {
        _id
        firstName
        lastName
        phone
        email

      }
      propertyId {
        _id
        propertyName
        propertyAddress {
          _id
          street
          unit
          city
          state
          zip
          
        }
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

// export const QUERY_WORKORDER = gql(
//   /* GraphQl */ QUERY_WORKORDER_STRING,
// ) as DocumentNode;

// export const QUERY_WORKORDERS_STRING = printGql(QUERY_WORKORDERS);

// User Queries
export const QUERY_GET_ALL_USERS = `
  query GetAllUsers {
    getAllUsers {
      _id
      createdAt
      firstName
      lastName
      username
      pin
    }
  }
`;

// Expense Queries
export const QUERY_EXPENSES = `
  query QueryExpenses {
    queryExpenses {
      _id
      date
      amount
      payee
      category
      description
    }
  }
`;

export const QUERY_EXPENSE_BY_ID = `
  query QueryExpenseById($expenseId: ID!) {
    queryExpenseById(expenseId: $expenseId) {
      _id
      date
      amount
      payee
      category
      description
    }
  }
`;

// Customer Queries
export const QUERY_CUSTOMERS = `
  query QueryCustomers {
    queryCustomers {
      _id
      createdAt
      updatedAt
      firstName
      lastName
      address {
        _id
      }
      email
      phone
      businessName
      workOrders {
        _id
      }
      invoices {
        _id
      }
      properties {
        _id
      }
    }
  }
`;

export const QUERY_CUSTOMER_BY_ID = `
  query QueryCustomerById($customerId: ID!) {
    queryCustomerById(customerId: $customerId) {
      _id
      createdAt
      updatedAt
      firstName
      lastName
      address {
        _id
      }
      email
      phone
      businessName
      workOrders {
        _id
      }
      invoices {
        _id
      }
      properties {
        _id
      }
    }
  }
`;

// Property Queries
export const QUERY_PROPERTIES = `
  query QueryProperties {
    queryProperties {
      _id
      propertyName
      propertyAddress {
        _id
        street
        unit
        city
        state
        zip

      }
      propertyDescription
      agent {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const QUERY_PROPERTY_BY_ID = `
  query QueryPropertyById($propertyId: ID!) {
    queryPropertyById(propertyId: $propertyId) {
      _id
      createdAt
      updatedAt
      propertyName
      propertyAddress {
        _id
        street
        unit
        city
        state
        zip
      }
      propertyDescription
      agent {
        _id
        firstName
        lastName
      }
      s3FolderKey
    }
  }
`;

// WorkOrder Queries
export const QUERY_WORK_ORDERS = `
  query QueryWorkOrders {
    queryWorkOrders {
      _id
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
      invoices {
        _id
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
      updatedAt
      laborItems {
        laborCost
        laborCostDescription
      }
    }
  }
`;

export const QUERY_WORK_ORDER_BY_ID = `
  query QueryWorkOrderById($workOrderId: ID!) {
    queryWorkOrderById(workOrderId: $workOrderId) {
      _id
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
      invoices {
        _id
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
      updatedAt
      laborItems {
        laborCost
        laborCostDescription
      }
    }
  }
`;

export const QUERY_WORK_ORDERS_BY_CUSTOMER = `
  query QueryWorkOrdersByCustomer($customerId: ID!) {
    queryWorkOrdersByCustomer(customerId: $customerId) {
      _id
      date
      lastUpdated
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
    }
  }
`;

export const QUERY_WORK_ORDERS_BY_PROPERTY = `
  query QueryWorkOrdersByProperty($propertyId: ID!) {
    queryWorkOrdersByProperty(propertyId: $propertyId) {
      _id
      date
      lastUpdated
      customerId {
        _id
        firstName
        lastName
      }
      type
      description
      completed
      completedBy
      quote
      total
      charged
      paid
    }
  }
`;

// Invoice Queries
export const QUERY_INVOICES = `
  query QueryInvoices {
    queryInvoices {
      _id
      invoiceNumber
      createdAt
      updatedAt
      date
      customerId {
        _id
        firstName
        lastName
      }
      workOrders {
        _id
      }
      quote
      total
      charged
      paid
      materialsCost
      materialsCostDescription
      comments
      laborItems {
        laborCost
        laborCostDescription
      }
    }
  }
`;

export const QUERY_INVOICE_BY_ID = `
  query QueryInvoiceById($invoiceId: ID!) {
    queryInvoiceById(invoiceId: $invoiceId) {
      _id
      invoiceNumber
      createdAt
      updatedAt
      date
      customerId {
        _id
        firstName
        lastName
      }
      workOrders {
        _id
      }
      quote
      total
      charged
      paid
      materialsCost
      materialsCostDescription
      comments
      laborItems {
        laborCost
        laborCostDescription
      }
    }
  }
`;

export const QUERY_INVOICES_BY_CUSTOMER = `
  query QueryInvoicesByCustomer($customerId: ID!) {
    queryInvoicesByCustomer(customerId: $customerId) {
      _id
      invoiceNumber
      date
      workOrders {
        _id
      }
      quote
      total
      charged
      paid
    }
  }
`;

export const QUERY_INVOICES_BY_WORK_ORDER = `
  query QueryInvoicesByWorkOrder($workOrderId: ID!) {
    queryInvoicesByWorkOrder(workOrderId: $workOrderId) {
      _id
      invoiceNumber
      date
      customerId {
        _id
        firstName
        lastName
      }
      quote
      total
      charged
      paid
    }
  }
`;

export const CREATE_INVOICE = `
mutation CreateInvoice($input: CreateInvoiceInput!) {
  createInvoice(input: $input) {
    _id
    invoiceNumber
    createdAt
    updatedAt
    date
    customerId {
      _id
    }
    workOrders {
      _id
    }
    quote
    total
    charged
    paid
    materialsCost
    materialsCostDescription
    comments
    laborItems {
      laborCost
      laborCostDescription
    }
  }
}`;

export const UPDATE_INVOICE_DATE = `
mutation UpdateInvoiceDate($invoiceId: ID!, $date: String!) {
  updateInvoiceDate(input: { invoiceId: $invoiceId, date: $date }) {
    _id
    date
  }
}`;

export const UPDATE_INVOICE_CUSTOMER_ID = `
mutation UpdateInvoiceCustomerId($invoiceId: ID!, $customerId: ID!) {
  updateInvoiceCustomerId(input: { invoiceId: $invoiceId, customerId: $customerId }) {
    _id
    customerId {
      _id
    }
  }
}`;

export const UPDATE_INVOICE_WORK_ORDERS = `
mutation UpdateInvoiceWorkOrders($invoiceId: ID!, $workOrders: [ID]!) {
  updateInvoiceWorkOrders(input: { invoiceId: $invoiceId, workOrders: $workOrders }) {
    _id
    workOrders {
      _id
    }
  }
}`;

export const UPDATE_INVOICE_QUOTE = `
mutation UpdateInvoiceQuote($invoiceId: ID!, $quote: Float!) {
  updateInvoiceQuote(input: { invoiceId: $invoiceId, quote: $quote }) {
    _id
    quote
  }
}`;

export const UPDATE_INVOICE_TOTAL = `
mutation UpdateInvoiceTotal($invoiceId: ID!, $total: Float!) {
  updateInvoiceTotal(input: { invoiceId: $invoiceId, total: $total }) {
    _id
    total
  }
}`;

export const UPDATE_INVOICE_CHARGED = `
mutation UpdateInvoiceCharged($invoiceId: ID!, $charged: Boolean!) {
  updateInvoiceCharged(input: { invoiceId: $invoiceId, charged: $charged }) {
    _id
    charged
  }
}`;

export const UPDATE_INVOICE_PAID = `
mutation UpdateInvoicePaid($invoiceId: ID!, $paid: Boolean!) {
  updateInvoicePaid(input: { invoiceId: $invoiceId, paid: $paid }) {
    _id
    paid
  }
}`;

export const UPDATE_INVOICE_MATERIALS_COST = `
mutation UpdateInvoiceMaterialsCost($invoiceId: ID!, $materialsCost: Float!) {
  updateInvoiceMaterialsCost(input: { invoiceId: $invoiceId, materialsCost: $materialsCost }) {
    _id
    materialsCost
  }
}`;

export const UPDATE_INVOICE_MATERIALS_COST_DESCRIPTION = `
mutation UpdateInvoiceMaterialsCostDescription($invoiceId: ID!, $materialsCostDescription: String!) {
  updateInvoiceMaterialsCostDescription(input: { invoiceId: $invoiceId, materialsCostDescription: $materialsCostDescription }) {
    _id
    materialsCostDescription
  }
}`;

export const UPDATE_INVOICE_LABOR_COST = `
mutation UpdateInvoiceLaborCost($invoiceId: ID!, $laborCost: Float!) {
  updateInvoiceLaborCost(input: { invoiceId: $invoiceId, laborCost: $laborCost }) {
    _id
    laborItems {
      laborCost
    }
  }
}`;

export const UPDATE_INVOICE_LABOR_COST_DESCRIPTION = `
mutation UpdateInvoiceLaborCostDescription($invoiceId: ID!, $laborCostDescription: String!) {
  updateInvoiceLaborCostDescription(input: { invoiceId: $invoiceId, laborCostDescription: $laborCostDescription }) {
    _id
    laborItems {
      laborCostDescription
    }
  }
}`;

export const UPDATE_INVOICE_COMMENTS = `
mutation UpdateInvoiceComments($invoiceId: ID!, $comments: String!) {
  updateInvoiceComments(input: { invoiceId: $invoiceId, comments: $comments }) {
    _id
    comments
  }
}`;

export const CREATE_INVOICE_PDF = `
mutation CreateInvoicePdf($invoiceId: ID!) {
  createInvoicePdf(input: { invoiceId: $invoiceId }) {
    _id
  }
}`;

export const SEND_INVOICE_EMAIL = `
mutation SendInvoiceEmail($invoiceId: ID!) {
  sendInvoiceEmail(input: { invoiceId: $invoiceId }) {
    _id
  }
}`;

export const DELETE_INVOICE = `
mutation DeleteInvoice($invoiceId: ID!) {
  deleteInvoice(input: { invoiceId: $invoiceId }) {
    _id
  }
}`;

