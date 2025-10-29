import { 
  convertCSVtoJSON,
  CSVtoJSONFile 
} from "./libs";

import fs from "fs/promises";
import path from "path";
import { CONFIG } from "./config";

async function main() {
  const trainData = await fs.readFile(path.join(...CONFIG.JSON_DATA_PATH, "singapore_train_station.json"), { encoding: "utf-8" });
  const data = JSON.parse(trainData);
  const trainLine = data.map((train: any) => train.mrt_line_english);
  await fs.writeFile(path.join(...CONFIG.JSON_DATA_PATH, "singapore_train_line.json"), JSON.stringify([...new Set(trainLine)], null, 2));
};


main();  