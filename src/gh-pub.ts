#! /usr/bin/env node
import { Command } from "commander";
import publish from "./gitApi";
import runWizard from "./wizard";

if (process.argv.length < 3) {
    runWizard().then((wizardOptions) => publish(wizardOptions));
} else {
    const program = new Command();

    program
        .name("gh-pub")
        .description("CLI to publish files to GitHub Pages.")
        .version("0.1.0")
        .requiredOption("-r, --repository <url>", "set URL of GitHub Git repository in https://github.com/<your profile>/<your repository>.git format")
        .option("-b, --branch <name>", "set branch name of repository to deploy", "gh-pages")
        .option("-d, --deploy <dir>", "set dir with files to deploy", "./")
        .option("-e, --exec <command>", "exec some comand before deploy")
        .option("-s, --silence", "switch off info messages", false);
    
    program.parse();

    publish(program.opts());
}
