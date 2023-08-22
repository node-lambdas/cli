#!/usr/bin/env node

import { fileURLToPath } from "node:url";
import { parseOptionsAndParams } from "./options.js";
import { Console } from "@node-lambdas/core";
import { printFunctionApi } from "./cmd-info.js";
import { runFunction } from "./cmd-run.js";
import { serve } from "./cmd-serve.js";

export { printFunctionApi } from "./cmd-info.js";
export { runFunction } from "./cmd-run.js";
export { serve } from "./cmd-serve.js";

export function cli(cliArgs: string[]) {
  const inputs = parseOptionsAndParams(cliArgs);
  Console.debug(inputs);

  const { options } = inputs;

  if (options.serve) {
    return serve(options);
  }

  if (options.info) {
    return printFunctionApi(inputs);
  }

  return runFunction(inputs);
}

async function main() {
  if (!import.meta.url.startsWith("file:")) {
    return;
  }

  const modulePath = fileURLToPath(import.meta.url);

  if (process.argv[1] === modulePath) {
    try {
      await cli(process.argv.slice(2));
    } catch (error) {
      Console.error(String(error));
      process.exit(1);
    }
  }
}

main();
