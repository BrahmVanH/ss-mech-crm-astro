// import React, { useRef } from "react";
// import type { WorkOrder } from "@lib/__generated__/graphql";

// import '../styles/workorder-table.css'
// type Props = {
//   workOrder: WorkOrder;
// };

// const WorkOrderForm: React.FC<Props> = (props: Props) => {
//   const {
//     date,
//     lastUpdated,
//     customerId,
//     propertyId,
//     type,
//     description,
//     completed,
//     completedBy,
//     quote,
//     total,
//     charged,
//     comments,
//     invoices,
//     laborItems,
//   } = props.workOrder;

//   const dateRef = useRef<HTMLInputElement>(null);
//   const typeRef = useRef<HTMLInputElement>(null);
//   const descriptionRef = useRef<HTMLInputElement>(null);
//   const quoteRef = useRef<HTMLInputElement>(null);
//   const completedRef = useRef<HTMLInputElement>(null);
//   const totalRef = useRef<HTMLInputElement>(null);
//   const chargedRef = useRef<HTMLInputElement>(null);
//   const commentsRef = useRef<HTMLInputElement>(null);

//   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const updatedWorkOrder = {
//       date: dateRef.current?.value,
//       type: typeRef.current?.value,
//       description: descriptionRef.current?.value,
//       quote: parseFloat(quoteRef.current?.value || "0"),
//       completed: completedRef.current?.checked,
//       total: parseFloat(totalRef.current?.value || "0"),
//       charged: chargedRef.current?.checked,
//       comments: commentsRef.current?.value,
//     };
//   }

//   return (
//     <form>
//       <table className="text-left border-collapse">
//         <thead>
//           <tr>
//             <th>Work Order</th>
//           </tr>
//         </thead>
//         <tbody className="workorder-table-body">
//           <tr>
//             <th>Date</th>
//             <td>
//               <input ref={dateRef} type="text" id="date" value={date} />
//             </td>
//           </tr>
//           <tr>
//             <th>Last Updated</th>
//             <td>{lastUpdated}</td>
//           </tr>
//           <tr>
//             <th>Customer</th>
//             <td>{customerId._id}</td>
//           </tr>
//           <tr>
//             <th>Property</th>
//             <td>{propertyId._id}</td>
//           </tr>
//           <tr>
//             <th>Type</th>
//             <td>
//               <input value={type} ref={typeRef} type="text" />
//             </td>
//           </tr>
//           <tr>
//             <th>Description</th>
//             <td>
//               <input value={description} ref={descriptionRef} type="text" />
//             </td>
//           </tr>
//           <tr>
//             <th>Completed</th>
//             <td>
//               <input type="checkbox" checked={completed} ref={completedRef} />
//             </td>
//           </tr>
//           <tr>
//             <th>Completed By</th>
//             <td>{completedBy}</td>
//           </tr>
//           <tr>
//             <th>Quote</th>
//             <td>
//               <input value={quote} type="number" ref={quoteRef} />
//             </td>
//           </tr>
//           <tr>
//             <th>Total</th>
//             <td>
//               <input value={total} type="number" ref={totalRef} />
//             </td>
//           </tr>
//           <tr>
//             <th>Charged</th>
//             <td>
//               <input checked={charged} type="checkbox" ref={chargedRef} />
//             </td>
//           </tr>
//           <tr>
//             <th>Comments</th>
//             <td>
//               <input value={comments} type="number" ref={commentsRef} />
//             </td>
//           </tr>
//         </tbody>
//       </table>
//       <button type="submit">Updated changes</button>
//     </form>
//   );
// };

// export default WorkOrderForm;
