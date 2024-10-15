import { $ } from "bun";
import simpleGit from "simple-git";
import { prompt } from "./aichat";
import { readConfigFile } from "./config";

interface RunOptions {
  verbose?: boolean;
}

async function getStagedDiff(target_dir: string) {
  try {
    const git = simpleGit(target_dir);
    const diff = await git.diff(["--cached"]);

    return diff;
  } catch (error) {
    console.error("Error getting git diff:", error);
    throw error; // Re-throw the error after logging it
  }
}

async function getGitLog(target_dir: string) {
  try {
    const git = simpleGit(target_dir);
    const log = await git.log(["-n 10", "--pretty=format:%h%s", "--no-merges", "--first-parent"]);

    return log.all[0].hash;
  } catch (error) {
    console.error("Error getting git log:", error);
    throw error; // Re-throw the error after logging it
  }
}

export async function run(options: RunOptions, templateName?: string) {

  const config = await readConfigFile();
  if (options.verbose) {
    console.debug("Configuration loaded successfully.");
  }

  let templateFilePath: string;
  if (templateName) {
    if (!Object.prototype.hasOwnProperty.call(config.templates, templateName)) {
      console.error(
        `Error: Template '${templateName}' does not exist in the configuration.`,
      );
      process.exit(1);
    }
    templateFilePath = config.templates[templateName];
    if (options.verbose) {
      console.debug(`Using template: ${templateName}`);
    }
  } else {
    templateFilePath = config.templates.default;
    if (options.verbose) {
      console.debug("Using default template.");
    }
  }
  const templateFile = Bun.file(templateFilePath);
  if (!(await templateFile.exists())) {
    console.error(
      `Error: The template file '${templateFilePath}' does not exist.`,
    );
    process.exit(1);
  }
  if (options.verbose) {
    console.debug(`Template file found: ${templateFilePath}`);
  }

  const template = await templateFile.text();
  if (options.verbose) {
    console.debug("Template file read successfully.");
  }

  const target_dir = (await $`pwd`.text()).trim();
  if (options.verbose) {
    console.debug(`Target directory: ${target_dir}`);
  }

  const diff = await getStagedDiff(target_dir);
  if (options.verbose) {
    console.debug("Git diff retrieved:\n", diff);
  }

  if (diff.trim().length === 0) {
    console.error(`No changes to commit in ${target_dir}`);
    process.exit(1);
  }

  let rendered_template = template.replace("{{diff}}", diff);

  const gitlog = await getGitLog(target_dir);
  if (options.verbose) {
    console.debug("Git log retrieved:\n", gitlog);
  }

  rendered_template = rendered_template.replace("{{gitlog}}", gitlog);

  rendered_template = rendered_template.replace("{{count}}", config.count || "5");
  if (options.verbose) {
    console.debug("Template rendered with git diff.");
  }

  const response = await prompt(rendered_template);

  try {
    if (options.verbose) {
      console.debug("Sending request to OpenAI...");
    }

    if (options.verbose) {
      console.debug("Response received from OpenAI.");
      console.debug(JSON.stringify(response, null, 2));
    }

    if (!response) {
      console.error("Failed to generate commit message");
      process.exit(1);
    }

    console.log(response.trim());
    if (options.verbose) {
      console.debug("Commit message generated and outputted.");
    }
  } catch (error) {
    console.error(`Failed to fetch from openai: ${error}`);
    process.exit(1);
  }
}
