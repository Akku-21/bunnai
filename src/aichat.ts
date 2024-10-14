import { $ } from "bun";

export async function prompt(prompt: string) {
  return await $`aichat -r commit-generator ${prompt}`.text();
}
