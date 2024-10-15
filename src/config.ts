import * as p from "@clack/prompts";
import { $ } from "bun";
import os from "os";
import path from "path";
import { template } from "./template";


export const configPath = path.join(os.homedir(), ".bunnai");

export interface Config {
  count: string;
  templates: Record<string, string>;
}

const DEFAULT_CONFIG: Config = {
  count: "10",
  templates: {
    default: path.join(os.homedir(), ".template"),
  },
};

export async function readConfigFile(): Promise<Config> {
  const fileExists = await Bun.file(configPath).exists();
  if (!fileExists) {
    return DEFAULT_CONFIG;
  }

  const configString = await Bun.file(configPath).text();
  const config = JSON.parse(configString);

  return {
    ...DEFAULT_CONFIG,
    ...config,
  };
}

function validateKeys(keys: string[]): asserts keys is (keyof Config)[] {
  const configKeys = Object.keys(DEFAULT_CONFIG);

  for (const key of keys) {
    if (!configKeys.includes(key)) {
      throw new Error(`Invalid config property: ${key}`);
    }
  }
}

export async function cleanUpTemplates(config: Config): Promise<Config> {
  for (const templateName in config.templates) {
    const templatePath = config.templates[templateName];
    const fileExists = await Bun.file(templatePath).exists();
    if (!fileExists) {
      delete config.templates[templateName];
    }
  }
  return config;
}

export async function setConfigs(
  keyValues: [key: keyof Config, value: Config[keyof Config]][],
) {
  const config = await readConfigFile();

  validateKeys(keyValues.map(([key]) => key));

  for (const [key, value] of keyValues) {
    // @ts-ignore
    config[key] = value;
  }

  await Bun.write(configPath, JSON.stringify(config));
}

export async function showConfigUI() {
  try {
    const config = await cleanUpTemplates(await readConfigFile());

    const choice = (await p.select({
      message: "set config",
      options: [
        {
          label: "Prompt Template",
          value: "template",
          hint: "edit the prompt template",
        },
        {
          label: "Cancel",
          value: "cancel",
          hint: "exit",
        },
      ],
    })) as keyof Config | "template" | "cancel";

    if (choice === "template") {
      const templateChoice = (await p.select({
        message: "Choose a template to edit",
        options: [
          ...Object.keys(config.templates).map((name) => ({
            label: name,
            value: name,
          })),
          { label: "Add new template", value: "add_new" },
          { label: "Cancel", value: "cancel" },
        ],
      })) as string;

      if (templateChoice === "add_new") {
        const newTemplateName = (await p.text({
          message: "New template name",
        })) as string;

        const newTemplatePath = path.join(
          os.homedir(),
          `.bunnai-template-${newTemplateName}`,
        );

        await Bun.write(newTemplatePath, template);
        config.templates[newTemplateName] = newTemplatePath;


        try {
          await $`nvim ${newTemplatePath}`
        }
        catch
        {
          await $`nano ${newTemplatePath}`
        }
        console.log(`Prompt template '${newTemplateName}' updated`);

        await setConfigs([["templates", config.templates]]);


      } else if (templateChoice !== "cancel") {
        const templatePath = config.templates[templateChoice];

        if (!(await Bun.file(templatePath).exists())) {
          await Bun.write(templatePath, template);
        }

      }
    }

    if (p.isCancel(choice) || choice === "cancel") {
      return;
    }

    showConfigUI();
    // biome-ignore lint/suspicious/noExplicitAny: unknown types to me
  } catch (error: any) {
    console.error(`\n${error.message}\n`);
  }
}
