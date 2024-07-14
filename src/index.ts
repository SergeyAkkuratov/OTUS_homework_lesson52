import { Command } from "commander";
import publish from "./gitApi";
import runWizard from "./wizard";


const program = new Command();

program
  .name("gh-pub")
  .description("CLI to publish files to GitHub Pages.")
  .version("0.0.1")
  .option("-r, --repository <url>", "set URL of GitHub Git repository in https://github.com/<your profile>/<your repository>.git format")
  .option("-b, --branch <name>", "set branch name of repository to deploy", "gh-pages")
  .option("-d, --deploy <dir>", "set dir with files to deploy", "./")
  .option("-w, --wizard", "run wizard to set all nessesary options");


program.parse();

const options = program.opts();
console.log(options);
if (options.wizard === true || !options.repository) {
  runWizard().then((options) => publish(options));
} else {
  publish(options);
}
