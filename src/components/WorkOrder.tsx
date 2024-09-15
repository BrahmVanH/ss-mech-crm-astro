import type { WorkOrder as IWorkOrder } from "@lib/__generated__/graphql";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type MouseEvent,
} from "react";
import {
  capitalizeFirstLetter,
  capitalizeFirstLetters,
  getNormalDateString,
  getTimeString,
} from "@lib/util";
import {
  UPDATE_WORK_ORDER_DATE,
  UPDATE_WORK_ORDER_CHARGED,
  UPDATE_WORK_ORDER_TYPE,
  UPDATE_WORK_ORDER_DESCRIPTION,
  UPDATE_WORK_ORDER_COMPLETED,
  UPDATE_WORK_ORDER_QUOTE,
  UPDATE_WORK_ORDER_TOTAL,
  UPDATE_WORK_ORDER_COMMENTS,
} from "@lib/graphql/mutations";
import type { MutationResult } from "@apollo/client";

import { Slide, toast, ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "../styles/workorder-table.css";

type Props = {
  workOrder: IWorkOrder;
};

type UpdateWorkOrderFieldResponse = {
  status: number;
  data: MutationResult;
};

const WorkOrder: React.FC<Props> = ({ workOrder }: Props) => {
  const [toastBody, setToastBody] = useState<string | null>(null);
  const [toastError, setToastError] = useState<boolean>(false);
  const [toastFired, setToastFired] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(false);

  const [dateState, setDateState] = useState<string>(
    getNormalDateString(workOrder.date),
  );
  const [lastUpdatedState, setLastUpdatedState] = useState<string>(
    workOrder.lastUpdated,
  );
  const [customerIdState, setCustomerIdState] = useState<
    IWorkOrder["customerId"]
  >(workOrder.customerId);
  const [propertyIdState, setPropertyIdState] = useState<
    IWorkOrder["propertyId"]
  >(workOrder.propertyId);
  const [typeState, setTypeState] = useState<string>(workOrder.type);
  const [descriptionState, setDescriptionState] = useState<string>(
    workOrder.description,
  );
  const [completedState, setCompletedState] = useState<boolean>(
    workOrder.completed,
  );
  const [completedByState, setCompletedByState] = useState<string>(
    workOrder.completedBy === "n/a" ? "" : workOrder.completedBy,
  );
  const [quoteState, setQuoteState] = useState<number>(workOrder.quote);
  const [totalState, setTotalState] = useState<number>(workOrder.total);
  const [chargedState, setChargedState] = useState<boolean>(workOrder.charged);
  const [commentsState, setCommentsState] = useState<string>(
    workOrder.comments,
  );
  const [invoicesState, setInvoicesState] = useState<IWorkOrder["invoices"]>(
    workOrder.invoices,
  );
  const [laborItemsState, setLaborItemsState] = useState<
    IWorkOrder["laborItems"]
  >(workOrder.laborItems);

  const [editDate, setEditDate] = useState<boolean>(false);
  const [editType, setEditType] = useState<boolean>(false);
  const [editDescription, setEditDescription] = useState<boolean>(false);
  const [editCompleted, setEditCompleted] = useState<boolean>(false);
  const [editQuote, setEditQuote] = useState<boolean>(false);
  const [editTotal, setEditTotal] = useState<boolean>(false);
  const [editCharged, setEditCharged] = useState<boolean>(false);
  const [editComments, setEditComments] = useState<boolean>(false);

  const dateRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const quoteRef = useRef<HTMLInputElement>(null);
  const completedRef = useRef<HTMLInputElement>(null);
  const totalRef = useRef<HTMLInputElement>(null);
  const chargedRef = useRef<HTMLInputElement>(null);
  const commentsRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // const getWorkOrderData = useCallback(async (id: string) => {
  //   if (!id) {
  //     console.error("No workorder id provided");
  //     throw new Error("No workorder id provided");
  //   }

  //   try {
  //     const response = await fetch("http://localhost:5000/graphql", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         query: QUERY_WORKORDER_STRING,
  //         variables: {
  //           workOrderId: id,
  //         },
  //       }),
  //     });
  //     const data = await response.json();

  //     console.log("data", data);

  //     if (!data) {
  //       console.error("No data returned from server");
  //       throw new Error("No data returned from server");
  //     }

  //     const workOrder: IWorkOrder = data.data.queryWorkOrderById;

  //     setWorkOrderData(workOrder);
  //   } catch (err: any) {
  //     console.error(err);
  //     throw new Error(err);
  //   }
  // }, []);

  const getQueryString = useCallback((field: string) => {
    if (!field) {
      console.error("No field provided");
      throw new Error("No field provided");
    }

    let queryString: string = "";

    switch (field) {
      case "date":
        queryString = UPDATE_WORK_ORDER_DATE;
        break;
      case "type":
        queryString = UPDATE_WORK_ORDER_TYPE;
        break;
      case "description":
        queryString = UPDATE_WORK_ORDER_DESCRIPTION;
        break;
      case "charged":
        queryString = UPDATE_WORK_ORDER_CHARGED;
        break;
      case "completed":
        queryString = UPDATE_WORK_ORDER_COMPLETED;
        break;
      case "quote":
        queryString = UPDATE_WORK_ORDER_QUOTE;
        break;
      case "total":
        queryString = UPDATE_WORK_ORDER_TOTAL;
        break;
      case "comments":
        queryString = UPDATE_WORK_ORDER_COMMENTS;
        break;
      default:
        console.error("Invalid field provided");
        throw new Error("Invalid field provided");
    }

    return queryString;
  }, []);

  const updateWorkOrderField = useCallback(
    async (field: string, value: any) => {
      if (!field || !value) {
        console.error("No field or value provided");
        throw new Error("No field or value provided");
      }

      const queryString = getQueryString(field);

      if (!queryString) {
        console.error("No query string returned");
        throw new Error("No query string returned");
      }

      try {
        const response = await fetch("http://localhost:5000/graphql", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: queryString,
            variables: {
              input: {
                workOrderId: workOrder._id,
                [field]: value,
              },
            },
          }),
        });

        const data = await response.json();

        if (!data) {
          console.error("No data returned from server");
          throw new Error("No data returned from server");
        }

        console.log("data", data);

        setToastBody("Work Order Updated.");
        setToastError(false);
        setToastFired(true);

        return { status: 200, data };
      } catch (err: any) {
        console.error(err);
        setToastBody("Error updating work order.");
        setToastError(true);
        setToastFired(true);
        throw new Error(err);
      }
    },
    [workOrder],
  );

  const setWorkOrderData = (workOrder: IWorkOrder) => {
    if (!workOrder) {
      console.error("No workorder data provided");
      throw new Error("No workorder data provided");
    }
    setDateState(workOrder.date);
    setLastUpdatedState(workOrder.lastUpdated);
    setCustomerIdState(workOrder.customerId);
    setPropertyIdState(workOrder.propertyId);
    setTypeState(workOrder.type);
    setDescriptionState(workOrder.description);
    setCompletedState(workOrder.completed);
    setCompletedByState(workOrder.completedBy);
    setQuoteState(workOrder.quote);
    setTotalState(workOrder.total);
    setChargedState(workOrder.charged);
    setCommentsState(workOrder.comments);
    setInvoicesState(workOrder.invoices);
    setLaborItemsState(workOrder.laborItems);

    setLoading(false);
  };

  const setAllEditFalse = () => {
    setEditDate(false);
    setEditType(false);
    setEditDescription(false);
    setEditCompleted(false);
    setEditQuote(false);
    setEditTotal(false);
    setEditCharged(false);
    setEditComments(false);
  };

  const setAllEditFalseExcept = (
    exceptionFunction: (boolean: boolean) => void,
  ) => {
    setEditDate(false);
    setEditType(false);
    setEditDescription(false);
    setEditCompleted(false);
    setEditQuote(false);
    setEditTotal(false);
    setEditCharged(false);
    setEditComments(false);

    exceptionFunction(true);
  };

  const displayHiddenButton = (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget.childNodes[1].childNodes[1]);
    e.currentTarget.childNodes[1].childNodes[1].style.visibility = "visible";
  };

  const hideHiddenButton = (e: any) => {
    e.preventDefault();
    console.log(e.currentTarget.childNodes[1].childNodes[1]);
    e.currentTarget.childNodes[1].childNodes[1].style.visibility = "hidden";
  };
  const handleEdit = (e: any) => {
    console.log(e.target);
    e.preventDefault();
    switch (e.target.value) {
      case "date":
        setAllEditFalseExcept(setEditDate);

        break;
      case "type":
        setAllEditFalseExcept(setEditType);
        break;
      case "description":
        setAllEditFalseExcept(setEditDescription);
        break;
      case "completed":
        setAllEditFalseExcept(setEditCompleted);
        break;
      case "quote":
        setAllEditFalseExcept(setEditQuote);
        break;
      case "total":
        setAllEditFalseExcept(setEditTotal);
        break;
      case "charged":
        setAllEditFalseExcept(setEditCharged);
        break;
      case "comments":
        setAllEditFalseExcept(setEditComments);
        break;
    }
  };

  const handleSaveEdit = useCallback(
    async (e: MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setAllEditFalse();

      let response: UpdateWorkOrderFieldResponse | null = null;
      try {
        switch (e.currentTarget.value) {
          case "date":
            const oldState = workOrder.date;
            if (dateState === "") {
              console.error("Date cannot be empty");
              return;
            }

            response = await updateWorkOrderField("date", dateState);

            if (response.status !== 200) {
              console.error("Error updating date");
              setDateState(oldState);
              return;
            }

            // To Do: save updated input to db, MAKE SURE TO FORMAT DATE AND TOLOWERCASE() REMOVE WHITESPACE
            break;
          case "type":
            const oldType = workOrder.type;
            if (typeState === "") {
              console.error("Type cannot be empty");
              return;
            }
            response = await updateWorkOrderField("type", typeState);

            if (response.status !== 200) {
              console.error("Error updating type");
              setTypeState(oldType);
              return;
            }

            break;
          case "description":
            const oldDescription = workOrder.description;
            if (descriptionState === "") {
              console.error("Description cannot be empty");
              return;
            }
            response = await updateWorkOrderField(
              "description",
              descriptionState,
            );

            if (response.status !== 200) {
              console.error("Error updating description");
              setDescriptionState(oldDescription);
              return;
            }

            break;

          case "completed":
            const oldCompleted = workOrder.completed;
            response = await updateWorkOrderField("completed", completedState);

            if (response.status !== 200) {
              console.error("Error updating completed");
              setCompletedState(oldCompleted);
              return;
            }

            break;
          case "quote":
            const oldQuote = workOrder.quote;
            if (quoteState === 0) {
              console.error("Quote cannot be empty");
              return;
            }
            response = await updateWorkOrderField("quote", quoteState);

            if (response.status !== 200) {
              console.error("Error updating quote");
              setQuoteState(oldQuote);
              return;
            }
            break;
          case "total":
            const oldTotal = workOrder.total;
            if (totalState === 0) {
              console.error("Total cannot be empty");
              return;
            }
            response = await updateWorkOrderField("total", totalState);

            if (response.status !== 200) {
              console.error("Error updating total");
              setTotalState(oldTotal);
              return;
            }
            break;
          case "charged":
            const oldCharged = workOrder.charged;
            response = await updateWorkOrderField("charged", chargedState);

            if (response.status !== 200) {
              console.error("Error updating charged");
              setChargedState(oldCharged);
              return;
            }
            break;
          case "comments":
            const oldComments = workOrder.comments;

            if (commentsState === "") {
              console.error("Comments cannot be empty");
              return;
            }

            response = await updateWorkOrderField("comments", commentsState);

            if (response.status !== 200) {
              console.error("Error updating comments");
              setCommentsState(oldComments);
              return;
            }
            break;
        }
      } catch (err: any) {
        console.error(err);
        throw new Error(err);
      }
    },
    [workOrder],
  );

  const openDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [dialogRef]);

  const closeDialog = useCallback(() => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  }, [dialogRef]);

  useEffect(() => {
    if (toastBody && toastFired && !toastError) {
      toast.success(toastBody, {
        onClose: () => {
          setToastFired(false);
          setToastBody(null);
        },
      });
    } else if (toastBody && toastFired && toastError) {
      toast.error(toastBody, {
        onClose: () => {
          setToastFired(false);
          setToastBody(null);
        },
      });
    }
  }, [toastBody, toastFired]);

  useEffect(() => {
    if (!chargedRef.current) {
      return;
    }

    if (editCharged) {
      chargedRef.current.removeAttribute("disabled");
    } else {
      chargedRef.current.setAttribute("disabled", "true");
    }
  }, [editCharged]);

  useEffect(() => {
    if (!completedRef.current) {
      return;
    }

    if (editCompleted) {
      completedRef.current.removeAttribute("disabled");
    } else {
      completedRef.current.setAttribute("disabled", "true");
    }
  }, [editCompleted]);

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Work Order</th>
            </tr>
          </thead>
          <tbody>
            <tr
              onMouseEnter={displayHiddenButton}
              onMouseLeave={hideHiddenButton}
            >
              <th>Date</th>

              {editDate ? (
                <td>
                  <input
                    name="date"
                    onChange={(e) => setDateState(e.target.value)}
                    type="text"
                    defaultValue={getNormalDateString(dateState ?? "")}
                  />
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleSaveEdit}
                    value="date"
                    type="button"
                  >
                    save
                  </button>
                </td>
              ) : (
                <td>
                  <span>{getNormalDateString(dateState ?? "")} </span>
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleEdit}
                    value="date"
                    type="button"
                  >
                    edit
                  </button>
                </td>
              )}
            </tr>
            <tr>
              <th>Last Updated</th>
              <td>
                {getNormalDateString(lastUpdatedState ?? "") +
                  " " +
                  getTimeString(lastUpdatedState ?? "")}
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
              <th>Property</th>
              <td>
                {capitalizeFirstLetters(propertyIdState?.propertyName ?? "")}
              </td>
            </tr>
            <tr>
              <th>Address</th>
              <td>
                {capitalizeFirstLetters(
                  propertyIdState?.propertyAddress?.street ?? "",
                )}{" "}
                {propertyIdState?.propertyAddress?.unit === "n/a" ||
                propertyIdState?.propertyAddress?.unit === "none"
                  ? ""
                  : `unit ${propertyIdState?.propertyAddress.unit}`}
              </td>
            </tr>
            <tr>
              <th> </th>
              <td>
                {capitalizeFirstLetter(
                  propertyIdState?.propertyAddress?.city ?? "",
                )}
                , {propertyIdState?.propertyAddress.state.toUpperCase()}{" "}
                {propertyIdState?.propertyAddress.zip}
              </td>
            </tr>
            <tr
              onMouseEnter={displayHiddenButton}
              onMouseLeave={hideHiddenButton}
            >
              <th>Type</th>
              {editType ? (
                <td>
                  <input
                    onChange={(e) => setTypeState(e.target.value)}
                    defaultValue={capitalizeFirstLetters(typeState ?? "")}
                    type="text"
                    name="type"
                  />
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleSaveEdit}
                    value="type"
                    type="button"
                  >
                    save
                  </button>
                </td>
              ) : (
                <td>
                  <span>{capitalizeFirstLetters(typeState)} </span>
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleEdit}
                    value="type"
                    type="button"
                  >
                    edit
                  </button>
                </td>
              )}
            </tr>
            <tr
              onMouseEnter={displayHiddenButton}
              onMouseLeave={hideHiddenButton}
            >
              <th>Description</th>
              {editDescription ? (
                <td>
                  <textarea
                    onChange={(e) => setDescriptionState(e.target.value)}
                    name="description"
                    defaultValue={descriptionState ?? ""}
                    cols={60}
                    rows={20}
                  />
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleSaveEdit}
                    value="description"
                    type="button"
                  >
                    save
                  </button>
                </td>
              ) : (
                <td>
                  <span>{descriptionState} </span>
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleEdit}
                    value="description"
                    type="button"
                  >
                    edit
                  </button>
                </td>
              )}
            </tr>
            <tr
              onMouseEnter={displayHiddenButton}
              onMouseLeave={hideHiddenButton}
            >
              <th>Completed</th>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={completedState ?? false}
                  onChange={(e) => setCompletedState(e.target.checked)}
                  name="completed"
                  ref={completedRef}
                  disabled
                />
                <button
                  onClick={editCompleted ? handleSaveEdit : handleEdit}
                  value="completed"
                  type="button"
                  className="invisible text-xs underline  ml-1"
                >
                  {editCompleted ? "save" : "edit"}
                </button>
              </td>
            </tr>
            <tr>
              <th>Completed By</th>
              <td>{completedByState === "n/a" ? "Brahm" : completedByState}</td>
            </tr>
            <tr
              onMouseEnter={displayHiddenButton}
              onMouseLeave={hideHiddenButton}
            >
              <th>Quote</th>
              {editQuote ? (
                <td>
                  <input
                    defaultValue={quoteState ?? 0}
                    type="number"
                    onChange={(e) => setQuoteState(parseInt(e.target.value))}
                    name="quote"
                  />
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleSaveEdit}
                    value="quote"
                    type="button"
                  >
                    save
                  </button>
                </td>
              ) : (
                <td>
                  <span>{quoteState} </span>
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleEdit}
                    value="quote"
                    type="button"
                  >
                    edit
                  </button>
                </td>
              )}
            </tr>
            <tr
              onMouseEnter={displayHiddenButton}
              onMouseLeave={hideHiddenButton}
            >
              <th>Total</th>
              {editTotal ? (
                <td>
                  <input
                    defaultValue={totalState ?? 0}
                    type="number"
                    onChange={(e) => setTotalState(parseInt(e.target.value))}
                    name="total"
                  />
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleSaveEdit}
                    value="total"
                    type="button"
                  >
                    save
                  </button>
                </td>
              ) : (
                <td>
                  <span>{totalState} </span>
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleEdit}
                    value="total"
                    type="button"
                  >
                    edit
                  </button>
                </td>
              )}
            </tr>
            <tr
              onMouseEnter={displayHiddenButton}
              onMouseLeave={hideHiddenButton}
            >
              <th>Charged</th>
              <td>
                <input
                  type="checkbox"
                  defaultChecked={chargedState}
                  onChange={(e) => setChargedState(e.target.checked)}
                  name="charged"
                  ref={chargedRef}
                  disabled
                />
                <button
                  className="invisible text-xs underline  ml-1"
                  onClick={editCharged ? handleSaveEdit : handleEdit}
                  value="charged"
                  type="button"
                >
                  {editCharged ? "save" : "edit"}
                </button>
              </td>
            </tr>
            <tr
              onMouseEnter={displayHiddenButton}
              onMouseLeave={hideHiddenButton}
            >
              <th>Comments</th>
              {editComments ? (
                <td>
                  <textarea
                    defaultValue={commentsState ?? ""}
                    name="comments"
                    onChange={(e) => setCommentsState(e.target.value)}
                    cols={60}
                    rows={20}
                  />
                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleSaveEdit}
                    value="comments"
                    type="button"
                  >
                    save
                  </button>
                </td>
              ) : (
                <td>
                  <span>{commentsState} </span>

                  <button
                    className="invisible text-xs underline  ml-1"
                    onClick={handleEdit}
                    value="comments"
                    type="button"
                  >
                    edit
                  </button>
                </td>
              )}
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
};

export default WorkOrder;
