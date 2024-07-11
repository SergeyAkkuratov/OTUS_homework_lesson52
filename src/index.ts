import { Command } from "commander";

const program = new Command();

program
  .name("pages_publisher")
  .description("CLI to publish files to GitHub Pages.")
  .version("0.0.1");

program.command("split")
  .description("Split a string into substrings and display as an array")
  .argument("<string>", "string to split")
  .option("--first", "display just the first substring")
  .option("-s, --separator <char>", "separator character", ",")
  .action((str, options) => {
    const limit = options.first ? 1 : undefined;
    console.log(str.split(options.separator, limit));
  });

program.parse();