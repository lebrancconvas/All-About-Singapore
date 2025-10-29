import fs from "fs/promises";
import path from "path";
import { CONFIG } from "../config";

export async function convertCSVtoJSON(csvFileName: string) {
  const pathToCSVFile = path.join(...CONFIG.CSV_DATA_PATH, `${csvFileName}.csv`);
  const data = await fs.readFile(pathToCSVFile, { encoding: "utf-8" });
  const rows = data.split("\n").map(row => row.split(","));
  const headingRows = rows[0];
  const dataRows = rows.splice(1, rows.length);

  const JSONdata = dataRows.map(data => {
    const obj = headingRows?.reduce<Record<string, string>>((acc, key: string, index: number) => {
      acc[key] = data[index] ?? "";
      return acc;
    }, {});
    return obj;
  });

  return JSONdata;
};

