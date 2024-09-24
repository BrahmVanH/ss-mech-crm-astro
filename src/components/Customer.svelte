<script lang="ts">
  import {
    UPDATE_CUSTOMER_FIRST_NAME,
    UPDATE_CUSTOMER_LAST_NAME,
    UPDATE_CUSTOMER_ADDRESS,
    UPDATE_CUSTOMER_EMAIL,
    UPDATE_CUSTOMER_PHONE,
    UPDATE_CUSTOMER_BUSINESS_NAME,
    UPDATE_CUSTOMER_PROPERTIES,
    UPDATE_CUSTOMER_WORK_ORDERS,
    UPDATE_CUSTOMER_INVOICES,
  } from "@lib/graphql/mutations";

  import { writable, type Writable } from "svelte/store";

  import { failure, success } from "@lib/svelteToast";

  import { capitalizeFirstLetter, getNormalDateString } from "@lib/util";

  import { SvelteToast } from "@zerodevx/svelte-toast";

  import type { MutationResult } from "@apollo/client";
  import type { Customer as CustomerType } from "@lib/__generated__/graphql";

  type UpdateInvoiceFieldResponse = {
    status: number;
    data: MutationResult;
  };

  export let customer: CustomerType;

  let toastMessage: string = "";
  let toastError: boolean = false;
  let toastsFired: boolean = false;

  let loading: boolean = true;

  let firstNameState: CustomerType["firstName"] = customer.firstName;
  let lastNameState: CustomerType["lastName"] = customer.lastName;
  let addressState: CustomerType["address"] = customer.address;
  let emailState: CustomerType["email"] = customer.email;
  let phoneState: CustomerType["phone"] = customer.phone;
  let businessNameState: CustomerType["businessName"] = customer.businessName;
  let propertiesState: CustomerType["properties"] = customer.properties;
  let invoicesState: CustomerType["invoices"] = customer.invoices;
  let workOrdersState: CustomerType["workOrders"] = customer.workOrders;

  // let editDate: boolean = false;
  const editFirstName: Writable<boolean> = writable(false);
  const editLastName: Writable<boolean> = writable(false);
  const editAddress: Writable<boolean> = writable(false);
  const editEmail: Writable<boolean> = writable(false);
  const editPhone: Writable<boolean> = writable(false);
  const editBusinessName: Writable<boolean> = writable(false);
  const editProperties: Writable<boolean> = writable(false);
  const editInvoices: Writable<boolean> = writable(false);
  const editWorkOrders: Writable<boolean> = writable(false);

  let dialogBinding: HTMLDialogElement | null = null;

  let isEditDateBtnVisible: boolean = false;

  function getQueryString(field: string) {
    if (!field) {
      console.error("No field provided");
      failure("No field provided");
      throw new Error("No field provided");
    }

    let queryString = "";

    switch (field) {
      case "firstName":
        queryString = UPDATE_CUSTOMER_FIRST_NAME;
        break;

      case "lastName":
        queryString = UPDATE_CUSTOMER_LAST_NAME;
        break;
      case "address":
        queryString = UPDATE_CUSTOMER_ADDRESS;
        break;
      case "email":
        queryString = UPDATE_CUSTOMER_EMAIL;
        break;
      case "phone":
        queryString = UPDATE_CUSTOMER_PHONE;
        break;
      case "businessName":
        queryString = UPDATE_CUSTOMER_BUSINESS_NAME;
        break;
      case "workOrders":
        queryString = UPDATE_CUSTOMER_WORK_ORDERS;
        break;
      case "invoices":
        queryString = UPDATE_CUSTOMER_INVOICES;
        break;
      case "properties":
        queryString = UPDATE_CUSTOMER_PROPERTIES;
        break;
      default:
        console.error("Invalid field provided");
        failure("Invalid field provided");
        throw new Error("Invalid field provided");
    }

    return queryString;
  }

  async function updateCustomerField(
    field: string,
    value: any,
  ): Promise<UpdateInvoiceFieldResponse> {
    const queryString = getQueryString(field);
    const response = await fetch("http://localhost:5000/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: queryString,
        variables: {
          input: {
            customerId: customer._id,
            [field]: value,
          },
        },
      }),
    });
    const data = await response.json();

    if (!data || data.errors) {
      console.error(data.errors);
      failure(data.errors);
      throw new Error(data.errors);
    }

    toastMessage = "Invoice updated successfully";
    toastError = false;
    toastsFired = true;

    return { status: 200, data };
  }

  function setAllEditFalse() {
    editFirstName.set(false);
    editLastName.set(false);
    editAddress.set(false);
    editEmail.set(false);
    editPhone.set(false);
    editBusinessName.set(false);
    editProperties.set(false);
    editInvoices.set(false);
    editWorkOrders.set(false);
  }

  function setAllEditFalseExcept(exception: Writable<boolean>) {
    editFirstName.set(false);
    editLastName.set(false);
    editAddress.set(false);
    editEmail.set(false);
    editPhone.set(false);
    editBusinessName.set(false);
    editProperties.set(false);
    editInvoices.set(false);
    editWorkOrders.set(false);

    exception.set(true);
  }
  function displayHiddenButton(event: any) {
    event.preventDefault();
    const button = event?.target.querySelector("button");
    button.classList.remove("invisible");
  }

  function hideHiddenButton(event: any) {
    event.preventDefault();
    const button = event?.target.querySelector("button");
    button.classList.add("invisible");
  }

  function handleEdit(e: any) {
    if (!(e.target as HTMLButtonElement).value) {
      console.error("No target provided");
      failure("No target provided");
      return;
    }
    console.log(e.target);
    e.preventDefault();
    switch ((e.target as HTMLButtonElement).value) {
      case "firstName":
        console.log("date");
        setAllEditFalseExcept(editFirstName);

        break;
      case "lastName":
        setAllEditFalseExcept(editLastName);
        break;

      case "address":
        setAllEditFalseExcept(editAddress);
        break;
      case "email":
        setAllEditFalseExcept(editEmail);
        break;
      case "phone":
        setAllEditFalseExcept(editPhone);
        break;
      case "businessName":
        setAllEditFalseExcept(editBusinessName);
        break;
      case "properties":
        setAllEditFalseExcept(editProperties);
        break;
      case "invoices":
        setAllEditFalseExcept(editInvoices);
        break;
      case "workOrders":
        setAllEditFalseExcept(editWorkOrders);
        break;
      default:
        console.error("Invalid field provided");
        failure("Invalid field provided");
        return;
    }
  }

  async function handleSaveEdit(e: any) {
    e.preventDefault();
    setAllEditFalse();

    return;

    // let response: UpdateInvoiceFieldResponse | null = null;
    // switch (e.currentTarget.value) {
    //   case "firstName":
    //     let oldState = customer.firstName;
    //     if (firstNameState === "") {
    //       console.error("Date cannot be empty");

    //       failure("Date cannot be empty");
    //       return;
    //     }

    //     response = await updateCustomerField("firstName", firstNameState);

    //     if (response?.status !== 200) {
    //       console.error("Error updating date");
    //       failure("Error updating date");
    //       dateState = oldState;
    //       return;
    //     }

    //     // To Do: save updated input to db, MAKE SURE TO FORMAT DATE AND TOLOWERCASE() REMOVE WHITESPACE
    //     success("Successfully updated field");
    //     break;
    //   case "invoiceNumber":
    //     let oldInvoiceNumber = invoice.invoiceNumber;
    //     if (invoiceNumberState === "") {
    //       console.error("Invoice number cannot be empty");
    //       failure("Invoice number cannot be empty");
    //       return;
    //     }
    //     response = await updateInvoiceField(
    //       "invoiceNumber",
    //       invoiceNumberState,
    //     );

    //     if (response?.status !== 200) {
    //       console.error("Error updating invoice number");
    //       failure("Error updating invoice number");
    //       invoiceNumberState = oldInvoiceNumber;
    //       return;
    //     }

    //     success("Successfully updated field");
    //     break;
    //   case "customerId":
    //     let oldCustomer = invoice.customerId;
    //     if (!customerIdState) {
    //       console.error("Customer cannot be empty");
    //       failure("Customer cannot be empty");
    //       return;
    //     }
    //     response = await updateInvoiceField("customerId", customerIdState);

    //     if (response?.status !== 200) {
    //       console.error("Error updating customer");
    //       failure("Error updating customer");
    //       customerIdState = oldCustomer;
    //       return;
    //     }

    //     success("Successfully updated field");
    //     break;
    //   case "workOrders":
    //     let oldWorkOrders = invoice.workOrders;
    //     if (!workOrdersState) {
    //       console.error("Workorders cannot be empty");
    //       failure("Workorders cannot be empty");
    //       return;
    //     }
    //     response = await updateInvoiceField("workOrders", workOrdersState);

    //     if (response?.status !== 200) {
    //       console.error("Error updating work orders");
    //       failure("Error updating work orders");
    //       workOrdersState = oldWorkOrders;
    //       return;
    //     }

    //     success("Successfully updated field");
    //     break;
    //   case "quote":
    //     let oldQuote = invoice.quote;
    //     if (quoteState < 0) {
    //       console.error("Quote cannot be negative");
    //       failure("Quote cannot be negative");
    //       return;
    //     }
    //     response = await updateInvoiceField("quote", quoteState);

    //     if (response?.status !== 200) {
    //       console.error("Error updating description");
    //       failure("Error updating description");
    //       quoteState = oldQuote;
    //       return;
    //     }

    //     success("Successfully updated field");
    //     break;
    //   case "total":
    //     const oldTotal = invoice.total;
    //     if (totalState === 0) {
    //       console.error("Total cannot be empty");
    //       failure("Total cannot be empty");
    //       return;
    //     }
    //     response = await updateInvoiceField("total", totalState);

    //     if (response?.status !== 200) {
    //       console.error("Error updating total");
    //       failure("Error updating total");
    //       totalState = oldTotal;
    //       return;
    //     }
    //     success("Successfully updated field");
    //     break;

    //   case "charged":
    //     const oldCharged = invoice.charged;
    //     response = await updateInvoiceField("charged", chargedState);

    //     if (response?.status !== 200) {
    //       console.error("Error updating charged");
    //       failure("Error updating charged");
    //       chargedState = oldCharged;
    //       return;
    //     }
    //     success("Successfully updated field");
    //     break;
    //   case "paid":
    //     const oldPaid = invoice.paid;

    //     response = await updateInvoiceField("paid", paidState);

    //     if (response?.status !== 200) {
    //       console.error("Error updating quote");
    //       failure("Error updating quote");
    //       paidState = oldPaid;
    //       return;
    //     }
    //     success("Successfully updated field");
    //     break;

    //   case "comments":
    //     const oldComments = invoice.comments;

    //     if (commentsState === "") {
    //       console.error("Comments cannot be empty");
    //       failure("Comments cannot be empty");
    //       return;
    //     }

    //     response = await updateInvoiceField("comments", commentsState);

    //     if (response?.status !== 200) {
    //       console.error("Error updating comments");
    //       failure("Error updating comments");
    //       commentsState = oldComments;
    //       return;
    //     }
    //     success("Successfully updated field");
    //     break;
    //   default:
    //     console.error("Invalid field provided");
    //     failure("Invalid field provided");
    //     return;
    // }
  }

  // $: if (editCharged && typeof chargedInputEl === HTMLInputElement) {
  //   chargedInputEl.removeAttribute("disabled");
  //   chargedInputEl?.focus();
  // }

  // $: if (!editCharged && chargedBinding instanceof HTMLInputElement) {
  //   chargedBinding.setAttribute("disabled", "true");
  // }

  // $: if (editPaid && paidInputEl ) {
  //   paidInputEl.removeAttribute("disabled");
  //   paidInputEl.focus();
  // }

  // $: if (!editCompleted && completedBin instanceof HTMLInputElement) {
  //   completedByBinding.setAttribute("disabled", "true");
  // }

  function handleOnInput(e: any, state: any, fn: any) {
    e.preventDefault();
    const target = e.target as HTMLInputElement;
    const value = target.value;
    const name = target.name;

    if (!fn) {
      state = e.target.value;
    } else {
      state = fn(value);
    }
  }
</script>

<div>
  {#if !loading}
    <p>Loading</p>
  {:else}
    <table>
      <thead>
        <tr>
          <th>Customer</th>
        </tr>
      </thead>
      <tbody>
        <tr
          on:mouseenter={displayHiddenButton}
          on:mouseleave={hideHiddenButton}
        >
          <th>First Name</th>

          {#if $editFirstName}
            <td>
              <input
                name="firstName"
                on:input={(e) => handleOnInput(e, firstNameState, null)}
                type="text"
                bind:value={firstNameState}
              />
              <button
                class="text-xs underline ml-1"
                on:click={handleSaveEdit}
                value="firstName"
                type="button"
              >
                save
              </button>
            </td>
          {:else}
            <td>
              <span>{firstNameState} </span>
              <button
                class="invisible text-xs underline ml-1"
                on:click={handleEdit}
                value="firstName"
                type="button"
                class:invisible={!isEditDateBtnVisible}
              >
                edit
              </button>
            </td>
          {/if}
        </tr>
        <tr
          on:mouseenter={displayHiddenButton}
          on:mouseleave={hideHiddenButton}
        >
          <th>Last Name</th>

          {#if $editLastName}
            <td>
              <input
                name="lastName"
                on:input={(e) => handleOnInput(e, lastNameState, null)}
                type="text"
                bind:value={lastNameState}
              />
              <button
                class="text-xs underline ml-1"
                on:click={handleSaveEdit}
                value="lastName"
                type="button"
              >
                save
              </button>
            </td>
          {:else}
            <td>
              <span>{lastNameState} </span>
              <button
                class="invisible text-xs underline ml-1"
                on:click={handleEdit}
                value="lastName"
                type="button"
                class:invisible={!isEditDateBtnVisible}
              >
                edit
              </button>
            </td>
          {/if}
        </tr>
        <tr
          on:mouseenter={displayHiddenButton}
          on:mouseleave={hideHiddenButton}
        >
          <th>Email Address</th>

          {#if $editEmail}
            <td>
              <input
                name="email"
                on:input={(e) => handleOnInput(e, emailState, null)}
                type="email"
                bind:value={emailState}
              />
              <button
                class="text-xs underline ml-1"
                on:click={handleSaveEdit}
                value="email"
                type="button"
              >
                save
              </button>
            </td>
          {:else}
            <td>
              <span>{emailState} </span>
              <button
                class="invisible text-xs underline ml-1"
                on:click={handleEdit}
                value="email"
                type="button"
                class:invisible={!isEditDateBtnVisible}
              >
                edit
              </button>
            </td>
          {/if}
        </tr>
        <tr
          on:mouseenter={displayHiddenButton}
          on:mouseleave={hideHiddenButton}
        >
          <th>Phone</th>

          {#if $editPhone}
            <td>
              <input
                name="phone"
                on:input={(e) => handleOnInput(e, phoneState, null)}
                type="phone"
                bind:value={phoneState}
              />
              <button
                class="text-xs underline ml-1"
                on:click={handleSaveEdit}
                value="phone"
                type="button"
              >
                save
              </button>
            </td>
          {:else}
            <td>
              <span>{phoneState} </span>
              <button
                class="invisible text-xs underline ml-1"
                on:click={handleEdit}
                value="phone"
                type="button"
                class:invisible={!isEditDateBtnVisible}
              >
                edit
              </button>
            </td>
          {/if}
        </tr>
        <tr
          on:mouseenter={displayHiddenButton}
          on:mouseleave={hideHiddenButton}
        >
          <th>Business Name</th>

          {#if $editBusinessName}
            <td>
              <input
                name="businessName"
                on:input={(e) => handleOnInput(e, businessNameState, null)}
                type="text"
                bind:value={emailState}
              />
              <button
                class="text-xs underline ml-1"
                on:click={handleSaveEdit}
                value="businessName"
                type="button"
              >
                save
              </button>
            </td>
          {:else}
            <td>
              <span>{businessNameState} </span>
              <button
                class="invisible text-xs underline ml-1"
                on:click={handleEdit}
                value="businessName"
                type="button"
                class:invisible={!isEditDateBtnVisible}
              >
                edit
              </button>
            </td>
          {/if}
        </tr>
              </tbody>
    </table>
    <SvelteToast />
  {/if}
</div>
