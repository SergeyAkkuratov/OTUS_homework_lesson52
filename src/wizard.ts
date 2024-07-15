import { confirm, input } from "@inquirer/prompts";
import { OptionValues } from "commander";

export function validateGitHubUrl(value: string) {
    const pass = value.match(/https:\/\/github.com\/.+\/.+\.git/i);
    if (pass) {
        return true;
    }

    return "Please enter a valid GitHub Git URL";
}

export default async function runWizard() {
    console.log("Welcome to gh-pub wizard!");
    const options: OptionValues = {
        repository: await input({
            message: "Enter URL of GitHub Git repository in https://github.com/<your profile>/<your repository>.git format:",
            required: true,
            validate: validateGitHubUrl,
        }),
        branch: await input({ message: "Enter branch name to publish: ", default: "gh-pages" }),
        deploy: await input({ message: "Enter path to directory with files to publish:", default: "./" }),
    };
    const needBuild = await confirm({ message: "Do you need to do some actions before deploy?", default: false });
    if (needBuild) {
        options.exec = await input({ message: "Enter command to run before deploy:" });
    }

    options.silence = !(await confirm({ message: "Do you want to see info message from gh-pub?", default: true }));

    return options;
}
