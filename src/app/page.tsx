'use client';

import QRCode from "react-qr-code";
import { useState } from "react";
import Table from "./table";

interface FormDetails {
  name: string,
  quantity: string
}

export default function Home() {
  const [formObject, setFormObject] = useState({
    name: "",
    quantity: ""
  })
  const [tableData, setTableData] = useState<FormDetails[]>([]);

  const onValChange = (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
    console.log([e.target.name], e.target.value);

    const value = (res: FormDetails) => ({
      ...res,
      [e.target.name]: e.target.value,
    });
    setFormObject(value);
  }

  const onFormSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const checkVal = !Object.values(formObject).every((res) => res === "");
    if (checkVal) {
      const dataObj = (data: FormDetails[]) => [...data, formObject];
      setTableData(dataObj);
      const isEmpty = { name: "", quantity: ""};
      setFormObject(isEmpty);
    }
    console.log(tableData);
  }

  const convertObjtoStr = (data: FormDetails[]) => {
    console.log('qr data', data);
    let x = ''
    let obj: FormDetails
    for (let i = 0; i < data.length; i++) {
      obj = Object.values(data)[i]
      x = x.concat(obj.name + ", " + obj.quantity + ", " + String((i + 1) * 10) + "\n");
    }
    console.log('qr string', x);
    return x
  }

  console.log(formObject.name + ", " + formObject.quantity);

  return (
    <div className="container mx-auto">
      <div>
        <label htmlFor="medicines" className="block mb-2 text-md font-medium text-gray-900">Choose a medicine</label>
        <select id="medicines"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          onChange={onValChange}
          value={formObject.name}
          name="name"
        >
          <option value="selected">Choose a medicine</option>
          <option value="Dolo 500mg">Dolo 500mg</option>
          <option value="Dolo 650mg">Dolo 650mg</option>
          <option value="Azee 500mg">Azee 500mg</option>
          <option value="Motilium M 10mg">Motilium M 10mg</option>
        </select>

        <input
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-half p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Quantity"
          type="number"
          onChange={onValChange}
          value={formObject.quantity}
          name="quantity"
        />
        <div className="w-min">
          <button
            className="w-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            title="button"
            type="submit"
            onClick={onFormSubmit}
          >
            ADD
          </button>
        </div>
        <Table tableData={tableData}/>
      </div>
      <QRCode
        className="mt-8"
        value={convertObjtoStr(tableData)}
      />
    </div>
  )
}
