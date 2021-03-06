import { execSync as exec } from 'child_process';
import { join } from 'path';
import { Console } from './common.js';

export function createProject(options, params, sourceDirectory) {
  const from = options.from || 'echo';
  const name = params[0];

  if (!name) {
    Console.error('Name for new function was not provided');
    return;
  }

  const scriptPath = join(sourceDirectory, 'create.sh');
  const execOptions = { stdio: 'pipe', encoding: 'utf8', cwd: process.cwd() };

  Console.info(`$SHELL ${scriptPath} ${name} ${from}`);
  Console.info(exec(`$SHELL ${scriptPath} ${name} ${from}`, execOptions));
}
