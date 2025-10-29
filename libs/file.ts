import fs from "fs/promises";
import path from "path";
import { convertCSVtoJSON } from "./parse";
import { CONFIG } from "../config";

export async function CSVtoJSONFile(csvFileName: string) {
  try {
    const jsonData = await convertCSVtoJSON(csvFileName);
    const jsonDataPath = path.join(...CONFIG.JSON_DATA_PATH, `${csvFileName}.json`);
    await fs.writeFile(jsonDataPath, JSON.stringify(jsonData, null, 2));
    console.log(`[SUCCESS] Write JSON File (${csvFileName}.json) from the CSV File (${csvFileName}.csv) Success.`);
  } catch(err) {
    throw new Error(`[ERROR] Cannot write JSON File from the CSV File.`);
  }
};