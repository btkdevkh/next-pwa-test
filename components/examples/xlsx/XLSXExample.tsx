"use client";

import { indicatorMockedData } from "@/data/mockedData";
import Link from "next/link";
import { useEffect, useState } from "react";
import { writeFileXLSX } from "xlsx";
import * as XLSX from "xlsx";

const XLSXExample = () => {
  const [data, setData] = useState<XLSX.WorkBook | null>(null);

  const json_xlsx = XLSX.utils.json_to_sheet(indicatorMockedData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, json_xlsx, "Sheet1");
  // console.log("json_xlsx", json_xlsx);

  const json_csv = XLSX.utils.sheet_to_csv(json_xlsx);
  // console.log("json_csv", json_csv);

  const downloadXLSX = () => {
    writeFileXLSX(workbook, "test.xlsx");
  };

  const downloadXLSXUseEffect = () => {
    if (data) {
      writeFileXLSX(data, "testUseEffect.xlsx");
    }
  };

  const downloadCSV = () => {
    const csv = json_csv;
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("hidden", "");
    a.setAttribute("href", url);
    a.setAttribute("download", "test.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  useEffect(() => {
    const readExcelFile = async (filePath: string): Promise<any[][]> => {
      const response = await fetch(filePath);
      const arrayBuffer = await response.arrayBuffer();
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      const sheetName = workbook.SheetNames[0]; // Read the first sheet
      const sheet = workbook.Sheets[sheetName];
      const rawData: any[][] = XLSX.utils.sheet_to_json(sheet, {
        header: 1,
        raw: false,
      });

      // Convert Excel serial numbers to readable dates
      const formattedData: any[][] = rawData.map((row) =>
        row.map((cell) => {
          if (typeof cell === "number" && cell > 30000) {
            const date = XLSX.SSF.parse_date_code(cell);
            if (date) {
              return new Date(date.y, date.m - 1, date.d).toLocaleDateString();
            }
          }
          return cell;
        })
      );

      return formattedData;
    };

    readExcelFile("/test.xlsx").then((data) => {
      const worksheet = XLSX.utils.aoa_to_sheet(data);

      // Set column widths (adjust the number based on content)
      worksheet["!cols"] = data[0].map(() => ({ width: 100 }));

      const json_xlsx = XLSX.utils.json_to_sheet(data);

      const workbook = XLSX.utils.book_new();
      setData(workbook);

      XLSX.utils.book_append_sheet(workbook, json_xlsx, "Sheet1");
      // console.log("json_xlsx", json_xlsx);
    });
  }, []);

  return (
    <div>
      <h1>XLSX & CSV</h1>
      <br />

      <div className="flex flex-col gap-2">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={downloadXLSX}
        >
          <Link
            href="data:text/csv;charset=utf-8,${json_csv}"
            download="test.csv"
          >
            Download JSON to XLSX (File)
          </Link>
        </button>

        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={downloadCSV}
        >
          Download JSON to CSV (File)
        </button>

        {/* Button download from useeffect */}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={downloadXLSXUseEffect}
        >
          Download JSON to XLSX From XLSX File
        </button>
      </div>
    </div>
  );
};

export default XLSXExample;
