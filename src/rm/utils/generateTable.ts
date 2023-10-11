import type { Entry } from "./calculateSizeDirs";
import Table from "cli-table";
import { unitsFormatter } from "./unitsFormatter";

export function generateTable({
  entires,
  totalSize,
}: {
  entires: Entry[];
  totalSize: number;
}) {
  var table: any = new Table({
    head: ["路径", "大小"],
    colWidths: [100, 15],
    style: {
      head: ["green", "bold"],
    },
  });

  entires.map((v) => table.push([v.path, unitsFormatter(v.size)]));
  table.push(["总大小", unitsFormatter(totalSize)]);

  console.log("\r");
  console.log(table.toString());

  console.log();
}
