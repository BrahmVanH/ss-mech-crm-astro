import type { WorkOrder } from "@lib/__generated__/graphql";

import "../styles/workorder-table.css";
import { useRef, useState, type MouseEvent } from "react";

type Props = {
  workOrder: WorkOrder;
};

const WorkOrder: React.FC<Props> = (props: Props) => {
  const {
    date,
    lastUpdated,
    customerId,
    propertyId,
    type,
    description,
    completed,
    completedBy,
    quote,
    total,
    charged,
    comments,
    invoices,
    laborItems,
  } = props.workOrder;

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

  const setAllEditFalseExcept = (
    exceptionFunction: (boolean: boolean) => void,
  ) => {
    setEditDate(false);
    setEditType(false);

    exceptionFunction(true);
  };
  const handleEdit = (e: any) => {
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

  const handleSaveEdit = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    switch (e.currentTarget.value) {
      case "charged":
        break;
    }
  };
  return (
    <table>
      <thead>
        <tr>
          <th>Work Order</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th>Date</th>
          {editDate ? (
            <td>
              <input ref={dateRef} type="text" id="date" value={date} />
            </td>
          ) : (
            <td>
              <span>{date}</span>
              <button onClick={handleEdit} value="date">
                edit
              </button>
            </td>
          )}
        </tr>
        <tr>
          <th>Last Updated</th>
          <td>{lastUpdated}</td>
        </tr>
        <tr>
          <th>Customer ID</th>
          <td>{customerId._id}</td>
        </tr>
        <tr>
          <th>Property ID</th>
          <td>{propertyId._id}</td>
        </tr>
        <tr>
          <th>Type</th>
          {editType ? (
            <td>
              <input value={type} ref={typeRef} type="text" />
            </td>
          ) : (
            <td>
              <span>{type}</span>
              <button onClick={handleEdit} value="type">
                edit
              </button>
            </td>
          )}
        </tr>
        <tr>
          <th>Description</th>
          {editDescription ? (
            <td>
              <input value={description} ref={descriptionRef} type="text" />
            </td>
          ) : (
            <td>
              <span>{description}</span>
              <button onClick={handleEdit} value="description">
                edit
              </button>
            </td>
          )}
        </tr>
        <tr>
          <th>Completed</th>
          {editCompleted ? (
            <td>
              <input type="checkbox" checked={completed} ref={completedRef} />
            </td>
          ) : (
            <td>
              <span>{completed}</span>
              <button onClick={handleEdit} value="completed">
                edit
              </button>
            </td>
          )}
        </tr>
        <tr>
          <th>Completed By</th>
          <td>{completedBy}</td>
        </tr>
        <tr>
          <th>Quote</th>
          {editQuote ? (
            <td>
              <input value={quote} type="number" ref={quoteRef} />
            </td>
          ) : (
            <td>
              <span>{quote}</span>
              <button onClick={handleEdit} value="quote">
                edit
              </button>
            </td>
          )}
        </tr>
        <tr>
          <th>Total</th>
          {editTotal ? (
            <td>
              <input value={total} type="number" ref={totalRef} />
            </td>
          ) : (
            <td>
              <span>{total}</span>
              <button onClick={handleEdit} value="total">
                edit
              </button>
            </td>
          )}
        </tr>
        <tr>
          <th>Charged</th>
          {editCharged ? (
            <td>
              <input type="checkbox" checked={charged} ref={chargedRef} />
              <button onClick={handleSaveEdit} value="charged">
                save
              </button>
            </td>
          ) : (
            <td>
              <span>{charged}</span>
              <button onClick={handleEdit} value="charged">
                edit
              </button>
            </td>
          )}
        </tr>
        <tr>
          <th>Comments</th>
          {editComments ? (
            <td>
              <input value={comments} type="text" ref={commentsRef} />
            </td>
          ) : (
            <td>
              <span>{comments}</span>

              <button onClick={handleEdit} value="comments">
                edit
              </button>
            </td>
          )}
        </tr>
      </tbody>
    </table>
  );
};
