import { input } from '@inquirer/prompts';
import { OptionValues } from 'commander';

export default async function runWizard(){
    console.log("Welcome to gh-pub wizard!")
    const options: OptionValues = {
        repository: await input({ message: "Enter URL of GitHub Git repository in https://github.com/<your profile>/<your repository>.git format: " }),
        branch: await input({message: "Enter branch name to publish: "}),
        deploy: await input({message: "Enter path to directory with files to publish: "})
    }
    return options;
}
