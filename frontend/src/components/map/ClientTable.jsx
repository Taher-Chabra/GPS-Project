import { useRef, useEffect, useState } from "react";
import { DataTable } from "simple-datatables";
import "simple-datatables/dist/style.css";
import "../../styles/deviceTable.css";

function ClientsTable({ tableHeaders }) {
//   const [clientsData, setClientsData] = useState([]);
//   const [loading, setLoading] = useState(false);
  const tableRef = useRef(null);
  const dataTableRef = useRef(null);

//   useEffect(() => {
//     async function getData() {
//       setLoading(true);
//       try {
//         const res = await fetchClients()
//         setClientsData(res.data);
//       } catch (error) {
//         console.error("Error fetching clients data:", error);
//       } finally {
//         setLoading(false);
//       }
//     }

//     getData();
//   }, []);

  useEffect(() => {
   //clientsData.length > 0 && 
    if (tableRef.current && !dataTableRef.current) {
      dataTableRef.current = new DataTable(tableRef.current, {
        searchable: true,
        sortable: true,
        perPage: 5,
      });
    }
  }, []);

//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-64">
//         <span className="p-5 border animate-spin border-slate-200 rounded-full border-t-transparent"></span>
//       </div>
//     );
//   }

  return (
    <div className="p-8 w-2/3 mx-auto bg-white border border-gray-100 rounded-lg shadow-md shadow-gray-700 dark:shadow-gray-500">
      <table ref={tableRef} className="">
        <thead>
          <tr>
            <th>
              <span className="flex items-center">SI</span>
            </th>
            <th>
              <span className="flex items-center">Email</span>
            </th>
            <th>
              <span className="flex items-center">Role</span>
            </th>
            <th>
              <span className="flex items-center">Status</span>
            </th>
            <th>
              <span className="flex items-center">Expiry On</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* {clientsData &&
            clientsData.length > 0 &&
            clientsData.map((client, index) => (
              <tr key={index}>
                <td className="text-gray-900 whitespace-nowrap">{index + 1}</td>
                <td className="text-gray-900 whitespace-nowrap">
                  {client.email}
                </td>
                <td className="text-gray-900 whitespace-nowrap">
                  {client.role}
                </td>
                <td className="text-gray-900 whitespace-nowrap">
                  {new Date(client.status).toLocaleDateString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </td>
                <td className="text-gray-900 whitespace-nowrap">
                  {new Date(client.expiryOn).toLocaleTimeString("en-IN", {
                    timeZone: "Asia/Kolkata",
                  })}
                </td>
              </tr>
            ))} */}
            <tr>
               <td className="text-gray-900 whitespace-nowrap">1</td>
               <td className="text-gray-900 whitespace-nowrap">client@example.com</td>
               <td className="text-gray-900 whitespace-nowrap">Guest</td>
               <td className="text-gray-900 whitespace-nowrap">Active</td>
               <td className="text-gray-900 whitespace-nowrap">2023-12-31</td>
            </tr>
            <tr>
               <td className="text-gray-900 whitespace-nowrap">2</td>
               <td className="text-gray-900 whitespace-nowrap">admin@example.com</td>
               <td className="text-gray-900 whitespace-nowrap">Admin</td>
               <td className="text-gray-900 whitespace-nowrap">Active</td>
               <td className="text-gray-900 whitespace-nowrap">2023-12-31</td>
            </tr>
            <tr>
               <td className="text-gray-900 whitespace-nowrap">3</td>
               <td className="text-gray-900 whitespace-nowrap">guest@example.com</td>
               <td className="text-gray-900 whitespace-nowrap">Guest</td>
               <td className="text-gray-900 whitespace-nowrap">Inactive</td>
               <td className="text-gray-900 whitespace-nowrap">2023-06-30</td>
            </tr>
            <tr>
               <td className="text-gray-900 whitespace-nowrap">4</td>
               <td className="text-gray-900 whitespace-nowrap">client@example.com</td>
               <td className="text-gray-900 whitespace-nowrap">Guest</td>
               <td className="text-gray-900 whitespace-nowrap">Active</td>
               <td className="text-gray-900 whitespace-nowrap">2023-12-31</td>
            </tr>
            <tr>
               <td className="text-gray-900 whitespace-nowrap">5</td>
               <td className="text-gray-900 whitespace-nowrap">admin@example.com</td>
               <td className="text-gray-900 whitespace-nowrap">Admin</td>
               <td className="text-gray-900 whitespace-nowrap">Active</td>
               <td className="text-gray-900 whitespace-nowrap">2023-12-31</td>
            </tr>
            <tr>
               <td className="text-gray-900 whitespace-nowrap">6</td>
               <td className="text-gray-900 whitespace-nowrap">guest@example.com</td>
               <td className="text-gray-900 whitespace-nowrap">Guest</td>
               <td className="text-gray-900 whitespace-nowrap">Inactive</td>
               <td className="text-gray-900 whitespace-nowrap">2023-06-30</td>
            </tr>
            <tr>
               <td className="text-gray-900 whitespace-nowrap">7</td>
               <td className="text-gray-900 whitespace-nowrap">client@example.com</td>
               <td className="text-gray-900 whitespace-nowrap">Guest</td>
               <td className="text-gray-900 whitespace-nowrap">Active</td>
               <td className="text-gray-900 whitespace-nowrap">2023-12-31</td>
            </tr>
            <tr>
               <td className="text-gray-900 whitespace-nowrap">8</td>
               <td className="text-gray-900 whitespace-nowrap">admin@example.com</td>
               <td className="text-gray-900 whitespace-nowrap">Admin</td>
               <td className="text-gray-900 whitespace-nowrap">Active</td>
               <td className="text-gray-900 whitespace-nowrap">2023-12-31</td>
            </tr>
            <tr>
               <td className="text-gray-900 whitespace-nowrap">9</td>
               <td className="text-gray-900 whitespace-nowrap">guest@example.com</td>
               <td className="text-gray-900 whitespace-nowrap">Guest</td>
               <td className="text-gray-900 whitespace-nowrap">Inactive</td>
               <td className="text-gray-900 whitespace-nowrap">2023-06-30</td>
            </tr>
        </tbody>
      </table>
    </div>
  );
}

export default ClientsTable;
