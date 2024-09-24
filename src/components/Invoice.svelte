<script lang="ts">
  import {
    UPDATE_INVOICE_CHARGED,
    UPDATE_INVOICE_COMMENTS,
    UPDATE_INVOICE_CUSTOMER_ID,
    UPDATE_INVOICE_DATE,
    UPDATE_INVOICE_QUOTE,
    UPDATE_INVOICE_TOTAL,
    UPDATE_INVOICE_WORK_ORDERS,
  } from "@lib/graphql/queries";

  import { writable, type Writable } from "svelte/store";

  import { failure, success } from "@lib/svelteToast";

  import { capitalizeFirstLetter, getNormalDateString } from "@lib/util";

  import {
    UPDATE_WORK_ORDER_DATE,
    UPDATE_WORK_ORDER_DESCRIPTION,
  } from "@lib/graphql/mutations";

  import { SvelteToast } from "@zerodevx/svelte-toast";

  import type { MutationResult } from "@apollo/client";
  import type { Invoice } from "@lib/__generated__/graphql";

  type UpdateInvoiceFieldResponse = {
    status: number;
    data: MutationResult;
  };

  export let invoice: Invoice;

  let toastMessage: string = "";
  let toastError: boolean = false;
  let toastsFired: boolean = false;

  let loading: boolean = true;

  let dateState: string = getNormalDateString(invoice.date);
  let invoiceNumberState: Invoice["invoiceNumber"] = invoice.invoiceNumber;
  let customerIdState: Invoice["customerId"] = invoice.customerId;
  let workOrdersState: Invoice["workOrders"] = invoice.workOrders;
  let quoteState: Invoice["quote"] = invoice.quote ?? 0;
  let totalState: Invoice["total"] = invoice.total ?? 0;
  let chargedState: Invoice["charged"] = invoice.charged;
  let paidState: Invoice["paid"] = invoice.paid;
  let materialsCostState: Invoice["materialsCost"] = invoice.materialsCost;
  let materialsCostDescriptionState: Invoice["materialsCostDescription"] =
    invoice.materialsCostDescription;
  let laborItemsState: Invoice["laborItems"] = invoice.laborItems;
  let commentsState: Invoice["comments"] = invoice.comments;

  // let editDate: boolean = false;
  const editDate: Writable<boolean> = writable(false);
  const editInvoiceNumber: Writable<boolean> = writable(false);
  const editCustomerId: Writable<boolean> = writable(false);
  const editWorkOrders: Writable<boolean> = writable(false);
  const editQuote: Writable<boolean> = writable(false);
  const editTotal: Writable<boolean> = writable(false);
  const editCharged: Writable<boolean> = writable(false);
  const editPaid: Writable<boolean> = writable(false);
  const editMaterialsCost: Writable<boolean> = writable(false);
  const editMaterialsCostDescription: Writable<boolean> = writable(false);
  const editLaborItems: Writable<boolean> = writable(false);
  const editComments: Writable<boolean> = writable(false);

  let paidInputEl: HTMLInputElement | null = null;
  let chargedInputEl: HTMLInputElement | null = null;
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
      case "date":
        queryString = UPDATE_INVOICE_DATE;
        break;

      case "customerId":
        queryString = UPDATE_INVOICE_CUSTOMER_ID;
        break;
      case "wordOrders":
        queryString = UPDATE_INVOICE_WORK_ORDERS;
        break;
      case "quote":
        queryString = UPDATE_INVOICE_QUOTE;
        break;
      case "total":
        queryString = UPDATE_INVOICE_TOTAL;
        break;
      case "charged":
        queryString = UPDATE_INVOICE_CHARGED;
        break;
      case "comments":
        queryString = UPDATE_INVOICE_COMMENTS;
        break;
      default:
        console.error("Invalid field provided");
        failure("Invalid field provided");
        throw new Error("Invalid field provided");
    }

    return queryString;
  }

  async function updateInvoiceField(
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
            invoiceId: invoice._id,
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
    editDate.set(false);
    editInvoiceNumber.set(false);
    editCustomerId.set(false);
    editWorkOrders.set(false);
    editQuote.set(false);
    editTotal.set(false);
    editCharged.set(false);
    editPaid.set(false);
    editMaterialsCost.set(false);
    editMaterialsCostDescription.set(false);
    editLaborItems.set(false);
    editComments.set(false);
  }

  function setAllEditFalseExcept(exception: Writable<boolean>) {
    editDate.set(false);
    editInvoiceNumber.set(false);
    editCustomerId.set(false);
    editWorkOrders.set(false);
    editQuote.set(false);
    editTotal.set(false);
    editCharged.set(false);
    editPaid.set(false);
    editMaterialsCost.set(false);
    editMaterialsCostDescription.set(false);
    editLaborItems.set(false);
    editComments.set(false);

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
      case "date":
        console.log("date");
        setAllEditFalseExcept(editDate);

        break;
      case "invoiceNumber":
        setAllEditFalseExcept(editInvoiceNumber);
        break;
      case "customerId":
        setAllEditFalseExcept(editCustomerId);
        break;
      case "workOrders":
        setAllEditFalseExcept(editWorkOrders);
        break;
      case "quote":
        setAllEditFalseExcept(editQuote);
        break;
      case "total":
        setAllEditFalseExcept(editTotal);
        break;
      case "charged":
        setAllEditFalseExcept(editCharged);
        break;
      case "paid":
        setAllEditFalseExcept(editPaid);
        break;
      case "materialsCost":
        setAllEditFalseExcept(editMaterialsCost);
        break;
      case "materialsCostDescription":
        setAllEditFalseExcept(editMaterialsCostDescription);
        break;
      case "laborItems":
        setAllEditFalseExcept(editLaborItems);
        break;
      case "comments":
        setAllEditFalseExcept(editComments);
        break;
    }
  }

  async function handleSaveEdit(e: any) {
    e.preventDefault();
    setAllEditFalse();

    return;

    let response: UpdateInvoiceFieldResponse | null = null;
    switch (e.currentTarget.value) {
      case "date":
        let oldState = invoice.date;
        if (dateState === "") {
          console.error("Date cannot be empty");

          failure("Date cannot be empty");
          return;
        }

        response = await updateInvoiceField("date", dateState);

        if (response?.status !== 200) {
          console.error("Error updating date");
          failure("Error updating date");
          dateState = oldState;
          return;
        }

        // To Do: save updated input to db, MAKE SURE TO FORMAT DATE AND TOLOWERCASE() REMOVE WHITESPACE
        success("Successfully updated field");
        break;
      case "invoiceNumber":
        let oldInvoiceNumber = invoice.invoiceNumber;
        if (invoiceNumberState === "") {
          console.error("Invoice number cannot be empty");
          failure("Invoice number cannot be empty");
          return;
        }
        response = await updateInvoiceField(
          "invoiceNumber",
          invoiceNumberState,
        );

        if (response?.status !== 200) {
          console.error("Error updating invoice number");
          failure("Error updating invoice number");
          invoiceNumberState = oldInvoiceNumber;
          return;
        }

        success("Successfully updated field");
        break;
      case "customerId":
        let oldCustomer = invoice.customerId;
        if (!customerIdState) {
          console.error("Customer cannot be empty");
          failure("Customer cannot be empty");
          return;
        }
        response = await updateInvoiceField("customerId", customerIdState);

        if (response?.status !== 200) {
          console.error("Error updating customer");
          failure("Error updating customer");
          customerIdState = oldCustomer;
          return;
        }

        success("Successfully updated field");
        break;
      case "workOrders":
        let oldWorkOrders = invoice.workOrders;
        if (!workOrdersState) {
          console.error("Workorders cannot be empty");
          failure("Workorders cannot be empty");
          return;
        }
        response = await updateInvoiceField("workOrders", workOrdersState);

        if (response?.status !== 200) {
          console.error("Error updating work orders");
          failure("Error updating work orders");
          workOrdersState = oldWorkOrders;
          return;
        }

        success("Successfully updated field");
        break;
      case "quote":
        let oldQuote = invoice.quote;
        if (quoteState < 0) {
          console.error("Quote cannot be negative");
          failure("Quote cannot be negative");
          return;
        }
        response = await updateInvoiceField("quote", quoteState);

        if (response?.status !== 200) {
          console.error("Error updating description");
          failure("Error updating description");
          quoteState = oldQuote;
          return;
        }

        success("Successfully updated field");
        break;
      case "total":
        const oldTotal = invoice.total;
        if (totalState === 0) {
          console.error("Total cannot be empty");
          failure("Total cannot be empty");
          return;
        }
        response = await updateInvoiceField("total", totalState);

        if (response?.status !== 200) {
          console.error("Error updating total");
          failure("Error updating total");
          totalState = oldTotal;
          return;
        }
        success("Successfully updated field");
        break;

      case "charged":
        const oldCharged = invoice.charged;
        response = await updateInvoiceField("charged", chargedState);

        if (response?.status !== 200) {
          console.error("Error updating charged");
          failure("Error updating charged");
          chargedState = oldCharged;
          return;
        }
        success("Successfully updated field");
        break;
      case "paid":
        const oldPaid = invoice.paid;

        response = await updateInvoiceField("paid", paidState);

        if (response?.status !== 200) {
          console.error("Error updating quote");
          failure("Error updating quote");
          paidState = oldPaid;
          return;
        }
        success("Successfully updated field");
        break;

      case "comments":
        const oldComments = invoice.comments;

        if (commentsState === "") {
          console.error("Comments cannot be empty");
          failure("Comments cannot be empty");
          return;
        }

        response = await updateInvoiceField("comments", commentsState);

        if (response?.status !== 200) {
          console.error("Error updating comments");
          failure("Error updating comments");
          commentsState = oldComments;
          return;
        }
        success("Successfully updated field");
        break;
      default:
        console.error("Invalid field provided");
        failure("Invalid field provided");
        return;
    }
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
          <th>Work Order</th>
        </tr>
      </thead>
      <tbody>
        <tr
          on:mouseenter={displayHiddenButton}
          on:mouseleave={hideHiddenButton}
        >
          <th>Date</th>

          {#if $editDate}
            <td>
              <input
                name="date"
                on:input={(e) => handleOnInput(e, dateState, null)}
                type="text"
                bind:value={dateState}
              />
              <button
                class="text-xs underline ml-1"
                on:click={handleSaveEdit}
                value="date"
                type="button"
              >
                save
              </button>
            </td>
          {:else}
            <td>
              <span>{dateState} </span>
              <button
                class="invisible text-xs underline ml-1"
                on:click={handleEdit}
                value="date"
                type="button"
                class:invisible={!isEditDateBtnVisible}
              >
                edit
              </button>
            </td>
          {/if}
        </tr>
        <tr>
          <th>Invoice Number</th>
          <td>
            {invoiceNumberState}
          </td>
        </tr>
        <tr>
          <th>Customer</th>
          <td>
            {capitalizeFirstLetter(customerIdState?.firstName ?? "")}{" "}
            {capitalizeFirstLetter(customerIdState?.lastName ?? "")}
          </td>
        </tr>
        <tr>
          <th></th>
          <td>{customerIdState?.phone}</td>
        </tr>
        <tr>
          <th></th>
          <td>{customerIdState?.email}</td>
        </tr>

        <tr>
          <th>Work Orders</th>
          <td>
            {#each workOrdersState as workOrder}
              <span>{workOrder?.total}</span>
            {/each}
          </td>
        </tr>
        <tr
          on:mouseenter={displayHiddenButton}
          on:mouseleave={hideHiddenButton}
        >
          <th>Quote</th>
          {#if $editQuote}
            <td>
              <input
                bind:value={quoteState}
                type="number"
                on:input={(e) => handleOnInput(e, quoteState, parseInt)}
                name="quote"
              />
              <button
                class="invisible text-xs underline ml-1"
                on:click={handleSaveEdit}
                value="quote"
                type="button"
              >
                save
              </button>
            </td>
          {:else}
            <td>
              <span>{quoteState} </span>
              <button
                class="invisible text-xs underline ml-1"
                on:click={handleEdit}
                value="quote"
                type="button"
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
          <th>Total</th>
          {#if $editTotal}
            <td>
              <input
                bind:value={totalState}
                type="number"
                on:input={(e) => handleOnInput(e, totalState, parseInt)}
                name="total"
              />
              <button
                class="invisible text-xs underline ml-1"
                on:click={(e) => handleSaveEdit}
                value="total"
                type="button"
              >
                save
              </button>
            </td>
          {:else}
            <td>
              <span>{totalState} </span>
              <button
                class="invisible text-xs underline ml-1"
                on:click={(e) => handleEdit}
                value="total"
                type="button"
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
          <th>Charged</th>
          <td>
            <input
              type="checkbox"
              bind:this={chargedInputEl}
              bind:checked={chargedState}
              on:input={(e) => handleOnInput(e, chargedState, null)}
              name="charged"
              disabled
            />
            <button
              class="invisible text-xs underline ml-1"
              on:click={editCharged ? handleSaveEdit : handleEdit}
              value="charged"
              type="button"
            >
              {#if $editCharged}
                save
              {:else}
                edit
              {/if}
            </button>
          </td>
        </tr>
        <tr
          on:mouseenter={displayHiddenButton}
          on:mouseleave={hideHiddenButton}
        >
          <th>Paid</th>
          <td>
            <input
              type="checkbox"
              bind:this={paidInputEl}
              bind:checked={paidState}
              on:input={(e) => handleOnInput(e, paidState, null)}
              name="paid"
              disabled
            />
            <button
              on:click={$editPaid ? handleSaveEdit : handleEdit}
              value="completed"
              type="button"
              class="invisible text-xs underline ml-1"
            >
              {$editPaid ? "save" : "edit"}
            </button>
          </td>
        </tr>
        <tr
          on:mouseenter={displayHiddenButton}
          on:mouseleave={hideHiddenButton}
        >
          <th>Comments</th>
          {#if $editComments}
            <td>
              <textarea
                bind:value={commentsState}
                name="comments"
                on:input={(e) => handleOnInput(e, commentsState, null)}
                cols={60}
                rows={20}
              />
              <button
                class="invisible text-xs underline ml-1"
                on:click={(e) => handleSaveEdit}
                value="comments"
                type="button"
              >
                save
              </button>
            </td>
          {:else}
            <td>
              <span>{commentsState} </span>

              <button
                class="invisible text-xs underline ml-1"
                on:click={(e) => handleEdit}
                value="comments"
                type="button"
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
