interface JsonData {
  name: string;
  quantity: string;
  // price: number;
}

interface JsonDataArray {
  tableData: JsonData[];
}

function Table({tableData}: JsonDataArray) {
  return (
    <table className="w-half text-sm text-left text-gray-500 dark:text-gray-400">
      <thead className="text-md text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th className="px-6 py-3">Id</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Quantity</th>
          {/* <th>Price</th> */}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data: JsonData, index: number) => {
          return (
            <tr key={index} className="text-lg bg-white border-b dark:bg-gray-800 dark:border-gray-700">
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{data.name}</td>
              <td className="px-6 py-4">{data.quantity}</td>
              {/* <td>{data.price}</td> */}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
export default Table;