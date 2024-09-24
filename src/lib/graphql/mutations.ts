// import { gql } from "@lib/__generated__/gql";
// import type { DocumentNode } from "graphql";

// export const UPDATE_WORKORDER_DATE_STRING = `
// mutation UpdateWorkOrderDate($workOrderId: ID!, $date: String!) {
//   updateWorkOrderDate(workOrderId: $workOrderId, date: $date) {
//     _id
//     date
//   }
// }
// `;

// export const UPDATE_WORKORDER_TYPE_STRING = `
// mutation UpdateWorkOrderType($workOrderId: ID!, $type: String!) {
//   updateWorkOrderType(workOrderId: $workOrderId, type: $type) {
//     _id
//     type
//   }
// }
// `;

// export const UPDATE_WORKORDER_DESCRIPTION = `
//   mutation UpdateWorkOrderDescription
// `

// const UPDATE_WORKORDER_DATE = gql(
//   /* GraphQL */ UPDATE_WORKORDER_DATE_STRING,
// ) as DocumentNode;

// Create Work Order
export const CREATE_WORK_ORDER = `
  mutation CreateWorkOrder($input: CreateWorkOrderInput!) {
    createWorkOrder(input: $input) {
      id
      date
      customerId
      propertyId
      type
      description
      completedBy
      quote
      total
      charged
      paid
      comments
      laborItems {
        id
        description
        hours
        rate
      }
    }
  }
`;

// Update Work Order Date
export const UPDATE_WORK_ORDER_DATE = `
  mutation UpdateWorkOrderDate($input: UpdateWorkOrderDateInput!) {
    updateWorkOrderDate(input: $input) {
      id
      date
    }
  }
`;

// Update Work Order Customer ID
export const UPDATE_WORK_ORDER_CUSTOMER_ID = `
  mutation UpdateWorkOrderCustomerId($input: UpdateWorkOrderCustomerIdInput!) {
    updateWorkOrderCustomerId(input: $input) {
      id
      customerId
    }
  }
`;

// Update Work Order Property ID
export const UPDATE_WORK_ORDER_PROPERTY_ID = `
  mutation UpdateWorkOrderPropertyId($input: UpdateWorkOrderPropertyIdInput!) {
    updateWorkOrderPropertyId(input: $input) {
      id
      propertyId
    }
  }
`;

// Update Work Order Type
export const UPDATE_WORK_ORDER_TYPE = `
  mutation UpdateWorkOrderType($input: UpdateWorkOrderTypeInput!) {
    updateWorkOrderType(input: $input) {
      id
      type
    }
  }
`;

// Update Work Order Description
export const UPDATE_WORK_ORDER_DESCRIPTION = `
  mutation UpdateWorkOrderDescription($input: UpdateWorkOrderDescriptionInput!) {
    updateWorkOrderDescription(input: $input) {
      id
      description
    }
  }
`;

// Update Work Order Completed
export const UPDATE_WORK_ORDER_COMPLETED = `
  mutation UpdateWorkOrderCompleted($input: UpdateWorkOrderCompletedInput!) {
    updateWorkOrderCompleted(input: $input) {
      id
      completed
    }
  }
`;

// Update Work Order Completed By
export const UPDATE_WORK_ORDER_COMPLETED_BY = `
  mutation UpdateWorkOrderCompletedBy($input: UpdateWorkOrderCompletedByInput!) {
    updateWorkOrderCompletedBy(input: $input) {
      id
      completedBy
    }
  }
`;

// Update Work Order Quote
export const UPDATE_WORK_ORDER_QUOTE = `
  mutation UpdateWorkOrderQuote($input: UpdateWorkOrderQuoteInput!) {
    updateWorkOrderQuote(input: $input) {
      id
      quote
    }
  }
`;

// Update Work Order Total
export const UPDATE_WORK_ORDER_TOTAL = `
  mutation UpdateWorkOrderTotal($input: UpdateWorkOrderTotalInput!) {
    updateWorkOrderTotal(input: $input) {
      id
      total
    }
  }
`;

// Update Work Order Charged
export const UPDATE_WORK_ORDER_CHARGED = `
  mutation UpdateWorkOrderCharged($input: UpdateWorkOrderChargedInput!) {
    updateWorkOrderCharged(input: $input) {
      id
      charged
    }
  }
`;

// Update Work Order Paid
export const UPDATE_WORK_ORDER_PAID = `
  mutation UpdateWorkOrderPaid($input: UpdateWorkOrderPaidInput!) {
    updateWorkOrderPaid(input: $input) {
      id
      paid
    }
  }
`;

// Update Work Order Comments
export const UPDATE_WORK_ORDER_COMMENTS = `
  mutation UpdateWorkOrderComments($input: UpdateWorkOrderCommentsInput!) {
    updateWorkOrderComments(input: $input) {
      id
      comments
    }
  }
`;

// Update Work Order Labor Items
export const UPDATE_WORK_ORDER_LABOR_ITEMS = `
  mutation UpdateWorkOrderLaborItems($input: UpdateWorkOrderLaborItemsInput!) {
    updateWorkOrderLaborItems(input: $input) {
      id
      laborItems {
        id
        description
        hours
        rate
      }
    }
  }
`;

// Delete Work Order
export const DELETE_WORK_ORDER = `
  mutation DeleteWorkOrder($input: RemoveWorkOrderInput!) {
    deleteWorkOrder(input: $input) {
      id
    }
  }
`;

export const CREATE_CUSTOMER = `
  mutation CreateCustomer($input: CreateCustomerInput!) {
    createCustomer(input: $input) {
      _id
      firstName
      lastName
      email
      phone
      businessName
      address {
        street
        unit
        city
        state
        zip
        country
      }
    }
  }
`;

export const UPDATE_CUSTOMER_FIRST_NAME = `
  mutation UpdateCustomerFirstName($input: UpdateCustomerFirstNameInput!) {
    updateCustomerFirstName(input: $input) {
      _id
      firstName
    }
  }
`;

export const UPDATE_CUSTOMER_LAST_NAME = `
  mutation UpdateCustomerLastName($input: UpdateCustomerLastNameInput!) {
    updateCustomerLastName(input: $input) {
      _id
      lastName
    }
  }
`;

export const UPDATE_CUSTOMER_ADDRESS = `
  mutation UpdateCustomerAddress($input: UpdateCustomerAddressInput!) {
    updateCustomerAddress(input: $input) {
      _id
      address {
        street
        unit
        city
        state
        zip
        country
      }
    }
  }
`;

export const UPDATE_CUSTOMER_EMAIL = `
  mutation UpdateCustomerEmail($input: UpdateCustomerEmailInput!) {
    updateCustomerEmail(input: $input) {
      _id
      email
    }
  }
`;

export const UPDATE_CUSTOMER_PHONE = `
  mutation UpdateCustomerPhone($input: UpdateCustomerPhoneInput!) {
    updateCustomerPhone(input: $input) {
      _id
      phone
    }
  }
`;

export const UPDATE_CUSTOMER_BUSINESS_NAME = `
  mutation UpdateCustomerBusinessName($input: UpdateCustomerBusinessNameInput!) {
    updateCustomerBusinessName(input: $input) {
      _id
      businessName
    }
  }
`;

export const UPDATE_CUSTOMER_PROPERTIES = `
  mutation UpdateCustomerProperties($input: UpdateCustomerPropertiesInput!) {
    updateCustomerProperties(input: $input) {
      _id
      properties {
        _id
      }
    }
  }
`;

export const UPDATE_CUSTOMER_WORK_ORDERS = `
  mutation UpdateCustomerWorkOrders($input: UpdateCustomerWorkOrdersInput!) {
    updateCustomerWorkOrders(input: $input) {
      _id
      workOrders {
        _id
      }
    }
  }
`;
export const UPDATE_CUSTOMER_INVOICES = `
  mutation UpdateCustomerInvoices($input: UpdateCustomerInvoicesInput!) {
    updateCustomerInvoices(input: $input) {
      _id
      invoices {
        _id
      }
    }
  }
`;

export const DELETE_CUSTOMER = `
  mutation DeleteCustomer($input: RemoveCustomerInput!) {
    deleteCustomer(input: $input) {
      _id
    }
  }
`;