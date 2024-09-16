/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  Buffer: { input: any; output: any; }
  Date: { input: any; output: any; }
  email_String_NotNull_maxLength_255_format_email: { input: any; output: any; }
  familyName_String_NotNull_minLength_1_maxLength_20: { input: any; output: any; }
  givenName_String_NotNull_minLength_1_maxLength_20: { input: any; output: any; }
  location_String_NotNull_minLength_1_maxLength_10: { input: any; output: any; }
  message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_: { input: any; output: any; }
  service_String_NotNull_minLength_1_maxLength_40: { input: any; output: any; }
  tel_String_NotNull_minLength_1_maxLength_12: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  _id: Scalars['ID']['output'];
  city: Scalars['String']['output'];
  country: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  state: Scalars['String']['output'];
  street: Scalars['String']['output'];
  unit: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  zip: Scalars['String']['output'];
};

export type AddressInput = {
  city: Scalars['String']['input'];
  country: Scalars['String']['input'];
  state: Scalars['String']['input'];
  street: Scalars['String']['input'];
  unit: Scalars['String']['input'];
  zip: Scalars['String']['input'];
};

export type Auth = {
  __typename?: 'Auth';
  token: Scalars['ID']['output'];
  user: User;
};

export type CreateCustomerInput = {
  address: AddressInput;
  businessName: Scalars['String']['input'];
  email?: InputMaybe<Scalars['String']['input']>;
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  phone: Scalars['String']['input'];
};

export type CreateExpenseInput = {
  amount: Scalars['Float']['input'];
  category: Scalars['String']['input'];
  description: Scalars['String']['input'];
  payee: Scalars['String']['input'];
};

export type CreateInvoiceInput = {
  charged: Scalars['Boolean']['input'];
  comments: Scalars['String']['input'];
  customerId: Scalars['ID']['input'];
  date: Scalars['String']['input'];
  invoiceNumber?: InputMaybe<Scalars['String']['input']>;
  laborItems: Array<LaborItemInput>;
  materialsCost: Scalars['Float']['input'];
  materialsCostDescription: Scalars['String']['input'];
  paid: Scalars['Boolean']['input'];
  quote?: InputMaybe<Scalars['Float']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  workOrders?: InputMaybe<Array<InputMaybe<Scalars['ID']['input']>>>;
};

export type CreateInvoicePdfInput = {
  invoiceId: Scalars['ID']['input'];
};

export type CreatePropertyInput = {
  agent: Scalars['ID']['input'];
  propertyAddress: AddressInput;
  propertyDescription: Scalars['String']['input'];
  propertyName: Scalars['String']['input'];
  s3FolderKey?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  adminCode: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateWorkOrderInput = {
  charged: Scalars['Boolean']['input'];
  comments?: InputMaybe<Scalars['String']['input']>;
  completedBy?: InputMaybe<Scalars['String']['input']>;
  customerId: Scalars['ID']['input'];
  date: Scalars['String']['input'];
  description: Scalars['String']['input'];
  laborItems?: InputMaybe<Array<InputMaybe<LaborItemInput>>>;
  paid: Scalars['Boolean']['input'];
  propertyId: Scalars['ID']['input'];
  quote?: InputMaybe<Scalars['Float']['input']>;
  total?: InputMaybe<Scalars['Float']['input']>;
  type: Scalars['String']['input'];
};

export type Customer = {
  __typename?: 'Customer';
  _id: Scalars['ID']['output'];
  address: Address;
  businessName: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  invoices: Array<Maybe<Invoice>>;
  lastName: Scalars['String']['output'];
  phone: Scalars['String']['output'];
  properties: Array<Maybe<Property>>;
  updatedAt?: Maybe<Scalars['String']['output']>;
  workOrders: Array<Maybe<WorkOrder>>;
};

export type DeleteExpenseInput = {
  expenseId: Scalars['ID']['input'];
};

export type DeleteS3ObjectInput = {
  imgKeys: Array<Scalars['String']['input']>;
};

export type DeleteS3ObjectResponse = {
  __typename?: 'DeleteS3ObjectResponse';
  message: Scalars['String']['output'];
  status: Scalars['Int']['output'];
};

export type Expense = {
  __typename?: 'Expense';
  _id: Scalars['ID']['output'];
  amount: Scalars['Float']['output'];
  category: Scalars['String']['output'];
  date: Scalars['Date']['output'];
  description: Scalars['String']['output'];
  payee: Scalars['String']['output'];
};

export type Invoice = {
  __typename?: 'Invoice';
  _id: Scalars['ID']['output'];
  charged: Scalars['Boolean']['output'];
  comments: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  customerId: Customer;
  date: Scalars['String']['output'];
  invoiceNumber: Scalars['String']['output'];
  laborItems: Array<Maybe<LaborItem>>;
  materialsCost: Scalars['Float']['output'];
  materialsCostDescription: Scalars['String']['output'];
  paid: Scalars['Boolean']['output'];
  quote: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  workOrders: Array<Maybe<WorkOrder>>;
};

export type LaborItem = {
  __typename?: 'LaborItem';
  laborCost: Scalars['Float']['output'];
  laborCostDescription: Scalars['String']['output'];
};

export type LaborItemInput = {
  laborCost: Scalars['Float']['input'];
  laborCostDescription: Scalars['String']['input'];
};

export type LoginUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createCustomer: Customer;
  createExpense: Expense;
  createInvoice: Invoice;
  createInvoicePdf: Scalars['Buffer']['output'];
  createProperty: Property;
  createUser: Auth;
  createWorkOrder: WorkOrder;
  deleteCustomer: Customer;
  deleteExpense: Expense;
  deleteInvoice: Invoice;
  deleteProperty: Property;
  deleteS3Objects: DeleteS3ObjectResponse;
  deleteWorkOrder: WorkOrder;
  loginUser: Auth;
  removeUser: Auth;
  sendInvoiceEmail: Scalars['Buffer']['output'];
  sendScheduleServiceMessage: Scalars['String']['output'];
  updateCustomerAddress: Customer;
  updateCustomerBusinessName: Customer;
  updateCustomerEmail: Customer;
  updateCustomerFirstName: Customer;
  updateCustomerLastName: Customer;
  updateCustomerPhone: Customer;
  updateCustomerProperties: Customer;
  updateExpenseAmount: Expense;
  updateExpenseCategory: Expense;
  updateExpenseDate: Expense;
  updateExpenseDescription: Expense;
  updateExpensePayee: Expense;
  updateInvoiceCharged: Invoice;
  updateInvoiceComments: Invoice;
  updateInvoiceCustomerId: Invoice;
  updateInvoiceDate: Invoice;
  updateInvoiceLaborCost: Invoice;
  updateInvoiceLaborCostDescription: Invoice;
  updateInvoiceMaterialsCost: Invoice;
  updateInvoiceMaterialsCostDescription: Invoice;
  updateInvoicePaid: Invoice;
  updateInvoiceQuote: Invoice;
  updateInvoiceTotal: Invoice;
  updateInvoiceWorkOrders: Invoice;
  updatePropertyAddress: Property;
  updatePropertyAgent: Property;
  updatePropertyDescription: Property;
  updatePropertyName: Property;
  updatePropertyS3FolderKey: Property;
  updateUserFirstName: Auth;
  updateUserLastName: Auth;
  updateUserPassword: Auth;
  updateUserPin: Auth;
  updateUserUsername: Auth;
  updateWorkOrderCharged: WorkOrder;
  updateWorkOrderComments: WorkOrder;
  updateWorkOrderCompleted: WorkOrder;
  updateWorkOrderCompletedBy: WorkOrder;
  updateWorkOrderCustomerId: WorkOrder;
  updateWorkOrderDate: WorkOrder;
  updateWorkOrderDescription: WorkOrder;
  updateWorkOrderLaborItems: WorkOrder;
  updateWorkOrderPaid: WorkOrder;
  updateWorkOrderPropertyId: WorkOrder;
  updateWorkOrderQuote: WorkOrder;
  updateWorkOrderTotal: WorkOrder;
  updateWorkOrderType: WorkOrder;
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateExpenseArgs = {
  input: CreateExpenseInput;
};


export type MutationCreateInvoiceArgs = {
  input: CreateInvoiceInput;
};


export type MutationCreateInvoicePdfArgs = {
  input: CreateInvoicePdfInput;
};


export type MutationCreatePropertyArgs = {
  input: CreatePropertyInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateWorkOrderArgs = {
  input: CreateWorkOrderInput;
};


export type MutationDeleteCustomerArgs = {
  input: RemoveCustomerInput;
};


export type MutationDeleteExpenseArgs = {
  input: DeleteExpenseInput;
};


export type MutationDeleteInvoiceArgs = {
  input: RemoveInvoiceInput;
};


export type MutationDeletePropertyArgs = {
  input: RemovePropertyInput;
};


export type MutationDeleteS3ObjectsArgs = {
  input: DeleteS3ObjectInput;
};


export type MutationDeleteWorkOrderArgs = {
  input: RemoveWorkOrderInput;
};


export type MutationLoginUserArgs = {
  input: LoginUserInput;
};


export type MutationRemoveUserArgs = {
  input: RemoveUserInput;
};


export type MutationSendInvoiceEmailArgs = {
  input: CreateInvoicePdfInput;
};


export type MutationSendScheduleServiceMessageArgs = {
  input: ScheduleServiceMessageInput;
};


export type MutationUpdateCustomerAddressArgs = {
  input: UpdateCustomerAddressInput;
};


export type MutationUpdateCustomerBusinessNameArgs = {
  input: UpdateCustomerBusinessNameInput;
};


export type MutationUpdateCustomerEmailArgs = {
  input: UpdateCustomerEmailInput;
};


export type MutationUpdateCustomerFirstNameArgs = {
  input: UpdateCustomerFirstNameInput;
};


export type MutationUpdateCustomerLastNameArgs = {
  input: UpdateCustomerLastNameInput;
};


export type MutationUpdateCustomerPhoneArgs = {
  input: UpdateCustomerPhoneInput;
};


export type MutationUpdateCustomerPropertiesArgs = {
  input: UpdateCustomerPropertiesInput;
};


export type MutationUpdateExpenseAmountArgs = {
  input: UpdateExpenseAmountInput;
};


export type MutationUpdateExpenseCategoryArgs = {
  input: UpdateExpenseCategoryInput;
};


export type MutationUpdateExpenseDateArgs = {
  input: UpdateExpenseDateInput;
};


export type MutationUpdateExpenseDescriptionArgs = {
  input: UpdateExpenseDescriptionInput;
};


export type MutationUpdateExpensePayeeArgs = {
  input: UpdateExpensePayeeInput;
};


export type MutationUpdateInvoiceChargedArgs = {
  input: UpdateInvoiceChargedInput;
};


export type MutationUpdateInvoiceCommentsArgs = {
  input: UpdateInvoiceCommentsInput;
};


export type MutationUpdateInvoiceCustomerIdArgs = {
  input: UpdateInvoiceCustomerIdInput;
};


export type MutationUpdateInvoiceDateArgs = {
  input: UpdateInvoiceDateInput;
};


export type MutationUpdateInvoiceLaborCostArgs = {
  input: UpdateInvoiceLaborCostInput;
};


export type MutationUpdateInvoiceLaborCostDescriptionArgs = {
  input: UpdateInvoiceLaborCostDescriptionInput;
};


export type MutationUpdateInvoiceMaterialsCostArgs = {
  input: UpdateInvoiceMaterialsCostInput;
};


export type MutationUpdateInvoiceMaterialsCostDescriptionArgs = {
  input: UpdateInvoiceMaterialsCostDescriptionInput;
};


export type MutationUpdateInvoicePaidArgs = {
  input: UpdateInvoicePaidInput;
};


export type MutationUpdateInvoiceQuoteArgs = {
  input: UpdateInvoiceQuoteInput;
};


export type MutationUpdateInvoiceTotalArgs = {
  input: UpdateInvoiceTotalInput;
};


export type MutationUpdateInvoiceWorkOrdersArgs = {
  input: UpdateInvoiceWorkOrdersInput;
};


export type MutationUpdatePropertyAddressArgs = {
  input: UpdatePropertyAddressInput;
};


export type MutationUpdatePropertyAgentArgs = {
  input: UpdatePropertyAgentInput;
};


export type MutationUpdatePropertyDescriptionArgs = {
  input: UpdatePropertyDescriptionInput;
};


export type MutationUpdatePropertyNameArgs = {
  input: UpdatePropertyNameInput;
};


export type MutationUpdatePropertyS3FolderKeyArgs = {
  input: UpdatePropertyS3FolderKeyInput;
};


export type MutationUpdateUserFirstNameArgs = {
  input: UpdateUserFirstNameInput;
};


export type MutationUpdateUserLastNameArgs = {
  input: UpdateUserLastNameInput;
};


export type MutationUpdateUserPasswordArgs = {
  input: UpdateUserPasswordInput;
};


export type MutationUpdateUserPinArgs = {
  input: UpdateUserPinInput;
};


export type MutationUpdateUserUsernameArgs = {
  input: UpdateUserUsernameInput;
};


export type MutationUpdateWorkOrderChargedArgs = {
  input: UpdateWorkOrderChargedInput;
};


export type MutationUpdateWorkOrderCommentsArgs = {
  input: UpdateWorkOrderCommentsInput;
};


export type MutationUpdateWorkOrderCompletedArgs = {
  input: UpdateWorkOrderCompletedInput;
};


export type MutationUpdateWorkOrderCompletedByArgs = {
  input: UpdateWorkOrderCompletedByInput;
};


export type MutationUpdateWorkOrderCustomerIdArgs = {
  input: UpdateWorkOrderCustomerIdInput;
};


export type MutationUpdateWorkOrderDateArgs = {
  input: UpdateWorkOrderDateInput;
};


export type MutationUpdateWorkOrderDescriptionArgs = {
  input: UpdateWorkOrderDescriptionInput;
};


export type MutationUpdateWorkOrderLaborItemsArgs = {
  input: UpdateWorkOrderLaborItemsInput;
};


export type MutationUpdateWorkOrderPaidArgs = {
  input: UpdateWorkOrderPaidInput;
};


export type MutationUpdateWorkOrderPropertyIdArgs = {
  input: UpdateWorkOrderPropertyIdInput;
};


export type MutationUpdateWorkOrderQuoteArgs = {
  input: UpdateWorkOrderQuoteInput;
};


export type MutationUpdateWorkOrderTotalArgs = {
  input: UpdateWorkOrderTotalInput;
};


export type MutationUpdateWorkOrderTypeArgs = {
  input: UpdateWorkOrderTypeInput;
};

export type Property = {
  __typename?: 'Property';
  _id: Scalars['ID']['output'];
  agent: Customer;
  createdAt?: Maybe<Scalars['String']['output']>;
  propertyAddress: Address;
  propertyDescription: Scalars['String']['output'];
  propertyName: Scalars['String']['output'];
  s3FolderKey: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  getAllUsers?: Maybe<Array<User>>;
  getAnnualExpenseCsv: Scalars['String']['output'];
  getAnnualIncomeCsv: Scalars['String']['output'];
  getPresignedS3Url: Scalars['String']['output'];
  queryCustomerById: Customer;
  queryCustomers?: Maybe<Array<Customer>>;
  queryExpenseById: Expense;
  queryExpenses?: Maybe<Array<Expense>>;
  queryInvoiceById: Invoice;
  queryInvoices?: Maybe<Array<Invoice>>;
  queryInvoicesByCustomer?: Maybe<Array<Invoice>>;
  queryInvoicesByWorkOrder?: Maybe<Array<Invoice>>;
  queryProperties?: Maybe<Array<Property>>;
  queryPropertyById: Property;
  queryThumbtackReviews?: Maybe<Array<ThumbtackReview>>;
  queryWorkOrderById: WorkOrder;
  queryWorkOrders?: Maybe<Array<WorkOrder>>;
  queryWorkOrdersByCustomer?: Maybe<Array<WorkOrder>>;
  queryWorkOrdersByProperty?: Maybe<Array<WorkOrder>>;
};


export type QueryGetPresignedS3UrlArgs = {
  altTag: Scalars['String']['input'];
  commandType: Scalars['String']['input'];
  imgKey: Scalars['String']['input'];
};


export type QueryQueryCustomerByIdArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryQueryExpenseByIdArgs = {
  expenseId: Scalars['ID']['input'];
};


export type QueryQueryInvoiceByIdArgs = {
  invoiceId: Scalars['ID']['input'];
};


export type QueryQueryInvoicesByCustomerArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryQueryInvoicesByWorkOrderArgs = {
  workOrderId: Scalars['ID']['input'];
};


export type QueryQueryPropertyByIdArgs = {
  propertyId: Scalars['ID']['input'];
};


export type QueryQueryWorkOrderByIdArgs = {
  workOrderId: Scalars['ID']['input'];
};


export type QueryQueryWorkOrdersByCustomerArgs = {
  customerId: Scalars['ID']['input'];
};


export type QueryQueryWorkOrdersByPropertyArgs = {
  propertyId: Scalars['ID']['input'];
};

export type RemoveCustomerInput = {
  customerId: Scalars['ID']['input'];
};

export type RemoveInvoiceInput = {
  invoiceId: Scalars['ID']['input'];
};

export type RemovePropertyInput = {
  propertyId: Scalars['ID']['input'];
};

export type RemoveUserInput = {
  userPassword: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type RemoveWorkOrderInput = {
  workOrderId: Scalars['ID']['input'];
};

export type ScheduleServiceMessage = {
  __typename?: 'ScheduleServiceMessage';
  email: Scalars['String']['output'];
  familyName: Scalars['String']['output'];
  givenName: Scalars['String']['output'];
  location: Scalars['String']['output'];
  message: Scalars['String']['output'];
  service: Scalars['String']['output'];
  tel: Scalars['String']['output'];
};

export type ScheduleServiceMessageInput = {
  email: Scalars['email_String_NotNull_maxLength_255_format_email']['input'];
  familyName: Scalars['familyName_String_NotNull_minLength_1_maxLength_20']['input'];
  givenName: Scalars['givenName_String_NotNull_minLength_1_maxLength_20']['input'];
  location: Scalars['location_String_NotNull_minLength_1_maxLength_10']['input'];
  message: Scalars['message_String_NotNull_minLength_10_maxLength_255_pattern_AZaz09_']['input'];
  service: Scalars['service_String_NotNull_minLength_1_maxLength_40']['input'];
  tel: Scalars['tel_String_NotNull_minLength_1_maxLength_12']['input'];
};

export type ThumbtackReview = {
  __typename?: 'ThumbtackReview';
  author: ThumbtackReviewAuthor;
  datePublished: Scalars['String']['output'];
  description: Scalars['String']['output'];
  reviewRating: ThumbtackReviewRating;
};

export type ThumbtackReviewAuthor = {
  __typename?: 'ThumbtackReviewAuthor';
  name: Scalars['String']['output'];
};

export type ThumbtackReviewRating = {
  __typename?: 'ThumbtackReviewRating';
  ratingValue: Scalars['Int']['output'];
};

export type UpdateCustomerAddressInput = {
  address: AddressInput;
  customerId: Scalars['ID']['input'];
};

export type UpdateCustomerBusinessNameInput = {
  businessName: Scalars['String']['input'];
  customerId: Scalars['ID']['input'];
};

export type UpdateCustomerEmailInput = {
  customerId: Scalars['ID']['input'];
  email: Scalars['String']['input'];
};

export type UpdateCustomerFirstNameInput = {
  customerId: Scalars['ID']['input'];
  firstName: Scalars['String']['input'];
};

export type UpdateCustomerInvoicesInput = {
  customerId: Scalars['ID']['input'];
  invoice?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateCustomerLastNameInput = {
  customerId: Scalars['ID']['input'];
  lastName: Scalars['String']['input'];
};

export type UpdateCustomerPhoneInput = {
  customerId: Scalars['ID']['input'];
  phone: Scalars['String']['input'];
};

export type UpdateCustomerPropertiesInput = {
  customerId: Scalars['ID']['input'];
  property?: InputMaybe<Scalars['ID']['input']>;
};

export type UpdateExpenseAmountInput = {
  amount: Scalars['Float']['input'];
  expenseId: Scalars['ID']['input'];
};

export type UpdateExpenseCategoryInput = {
  category: Scalars['String']['input'];
  expenseId: Scalars['ID']['input'];
};

export type UpdateExpenseDateInput = {
  date: Scalars['Date']['input'];
  expenseId: Scalars['ID']['input'];
};

export type UpdateExpenseDescriptionInput = {
  description: Scalars['String']['input'];
  expenseId: Scalars['ID']['input'];
};

export type UpdateExpensePayeeInput = {
  expenseId: Scalars['ID']['input'];
  payee: Scalars['String']['input'];
};

export type UpdateInvoiceChargedInput = {
  charged: Scalars['Boolean']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceCommentsInput = {
  comments: Scalars['String']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceCustomerIdInput = {
  customerId: Scalars['ID']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceDateInput = {
  date: Scalars['String']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceLaborCostDescriptionInput = {
  description: Scalars['String']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceLaborCostInput = {
  invoiceId: Scalars['ID']['input'];
  updatedCost: Scalars['Float']['input'];
};

export type UpdateInvoiceMaterialsCostDescriptionInput = {
  description: Scalars['String']['input'];
  invoiceId: Scalars['ID']['input'];
};

export type UpdateInvoiceMaterialsCostInput = {
  invoiceId: Scalars['ID']['input'];
  updatedCost: Scalars['Float']['input'];
};

export type UpdateInvoicePaidInput = {
  invoiceId: Scalars['ID']['input'];
  paid: Scalars['Boolean']['input'];
};

export type UpdateInvoiceQuoteInput = {
  invoiceId: Scalars['ID']['input'];
  quote: Scalars['Float']['input'];
};

export type UpdateInvoiceTotalInput = {
  invoiceId: Scalars['ID']['input'];
  total: Scalars['Float']['input'];
};

export type UpdateInvoiceWorkOrdersInput = {
  invoiceId: Scalars['ID']['input'];
  workOrders: Array<Scalars['ID']['input']>;
};

export type UpdatePropertyAddressInput = {
  propertyAddress: AddressInput;
  propertyId: Scalars['ID']['input'];
};

export type UpdatePropertyAgentInput = {
  agent: Scalars['ID']['input'];
  propertyId: Scalars['ID']['input'];
};

export type UpdatePropertyDescriptionInput = {
  propertyDescription: Scalars['String']['input'];
  propertyId: Scalars['ID']['input'];
};

export type UpdatePropertyNameInput = {
  propertyId: Scalars['ID']['input'];
  propertyName: Scalars['String']['input'];
};

export type UpdatePropertyS3FolderKeyInput = {
  propertyId: Scalars['ID']['input'];
  s3FolderKey: Scalars['String']['input'];
};

export type UpdateUserFirstNameInput = {
  firstName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type UpdateUserLastNameInput = {
  lastName: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
};

export type UpdateUserPasswordInput = {
  newPassword: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  userPassword: Scalars['String']['input'];
};

export type UpdateUserPinInput = {
  pin: Scalars['String']['input'];
  userId: Scalars['ID']['input'];
  userPassword: Scalars['String']['input'];
};

export type UpdateUserUsernameInput = {
  userId: Scalars['ID']['input'];
  username: Scalars['String']['input'];
};

export type UpdateWorkOrderChargedInput = {
  charged: Scalars['Boolean']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderCommentsInput = {
  comments: Scalars['String']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderCompletedByInput = {
  completedBy: Scalars['String']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderCompletedInput = {
  completed: Scalars['Boolean']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderCustomerIdInput = {
  customerId: Scalars['ID']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderDateInput = {
  date: Scalars['String']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderDescriptionInput = {
  description: Scalars['String']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderInvoicesInput = {
  invoice?: InputMaybe<Scalars['ID']['input']>;
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderLaborItemsInput = {
  laborItems: Array<LaborItemInput>;
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderPaidInput = {
  paid: Scalars['Boolean']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderPropertyIdInput = {
  propertyId: Scalars['ID']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderQuoteInput = {
  quote: Scalars['Float']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderTotalInput = {
  total: Scalars['Float']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type UpdateWorkOrderTypeInput = {
  type: Scalars['String']['input'];
  workOrderId: Scalars['ID']['input'];
};

export type User = {
  __typename?: 'User';
  _id?: Maybe<Scalars['ID']['output']>;
  createdAt?: Maybe<Scalars['String']['output']>;
  firstName: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password?: Maybe<Scalars['String']['output']>;
  pin: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type WorkOrder = {
  __typename?: 'WorkOrder';
  _id: Scalars['ID']['output'];
  charged: Scalars['Boolean']['output'];
  comments: Scalars['String']['output'];
  completed: Scalars['Boolean']['output'];
  completedBy: Scalars['String']['output'];
  customerId: Customer;
  date: Scalars['String']['output'];
  description: Scalars['String']['output'];
  invoices: Array<Maybe<Invoice>>;
  laborItems?: Maybe<Array<Maybe<LaborItem>>>;
  lastUpdated: Scalars['String']['output'];
  paid: Scalars['Boolean']['output'];
  propertyId: Property;
  quote: Scalars['Float']['output'];
  total: Scalars['Float']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type ImageObject = {
  __typename?: 'imageObject';
  imgKey: Scalars['String']['output'];
  original: Scalars['String']['output'];
  originalAlt: Scalars['String']['output'];
  thumbnail: Scalars['String']['output'];
  thumbnailAlt: Scalars['String']['output'];
};

