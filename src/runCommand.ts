import util from "node:util"
import child_process from "node:child_process"

const exec = util.promisify(child_process.exec);

export default async function runCommand(command: string) {
  const { stdout, stderr } = await exec(command);
  console.log('stdout:', stdout);
  console.error('stderr:', stderr);
}