export const template = `
Please suggest 5 commit messages in german language, given the following diff:

\`\`\`diff
{{diff}}
\`\`\`

**Criteria:**

1. **Format:** Each commit message must follow the conventional commits format, which is \`<type>: <description>\`.
2. **Relevance:** Avoid mentioning a module name unless it's directly relevant to the change.
3. **Enumeration:** List the commit messages from 1 to 10.
4. **Clarity and Conciseness:** Each message should clearly and concisely convey the change made.

**Commit Message Examples:**

-   fix: add password regex pattern
-   feat: add new test cases
-   style: remove unused imports
-   refactor: extract common code to \`utils/wait.ts\`

**Instructions:**

-   Take a moment to understand the changes made in the diff.
-   Think about the impact of these changes on the project (e.g., bug fixes, new features, performance improvements, code refactoring, documentation updates). It's critical to my career you abstract the changes to a higher level and not just describe the code changes.
-   Generate commit messages that accurately describe these changes, ensuring they are helpful to someone reading the project's history.
-   Remember, a well-crafted commit message can significantly aid in the maintenance and understanding of the project over time.
-   If multiple changes are present, make sure you capture them all in each commit message.

Keep in mind you will suggest 10 commit messages. Only 1 will be used. It's better to push yourself (esp to synthesize to a higher level) and maybe wrong about some of the 10 commits because only one needs to be good. I'm looking for your best commit, not the best average commit. It's better to cover more scenarios than include a lot of overlap.

Write your 10 commit messages below, in the format \`1. <message>\`, \`2. <message>\`, etc.:
`;


"Please suggest 5 commit messages, given the following diff:

\`\`\`diff
$(git --no-pager diff --no-color --no-ext-diff --cached)
\`\`\`

**Criteria:**

1. **Format:** Each commit message must follow the
  commitizen conventional commits format, which is:
\`\`\`<type>[optional scope]: <description>

[optional body]

[optional footer]
\`\`\`


2. **Relevance:** Avoid mentioning a module name unless it's directly relevant
to the change.
3. **Enumeration:** List the commit messages from 1 to 5.
4. **Clarity and Conciseness:** Each message should clearly and concisely convey
the change made.

**Commit Message Examples:**

- fix(app): add password regex pattern
- test(unit): add new test cases
- style: remove unused imports
- refactor(pages): extract common code to \`utils/wait.ts\`

**Recent Commits on Repo for Reference:**

\`\`\`
$(git log -n 10 --pretty=format:'%h %s')
\`\`\`

**Output Template**

Follow this output template and ONLY output raw commit messages without
numbers or other decorations. Separat each commit message with \`---\`.

fix(app): add password regex pattern
---
style: remove unused imports
---
refactor(pages): extract common code to \`utils/wait.ts\`
---
fix: prevent racing of requests

Introduce a request id and a reference to latest request. Dismiss
incoming responses other than from latest request.

Remove timeouts which were used to mitigate the racing issue but are
obsolete now.
---
test(unit): add new test cases

**Instructions:**

- Take a moment to understand the changes made in the diff.

- Think about the impact of these changes on the project (e.g., bug fixes, new
features, performance improvements, code refactoring, documentation updates).
It's critical to my career you abstract the changes to a higher level and not
just describe the code changes.

- Generate commit messages that accurately describe these changes, ensuring they
are helpful to someone reading the project's history.

- Remember, a well-crafted commit message can significantly aid in the maintenance
and understanding of the project over time.

- If multiple changes are present, make sure you capture them all in each commit
message.

If there's multiple different kinds of changes present in one commit, you can write
a commit message that includes multiple types, though this is generally discouraged. For example:

feat: implement new feature
fix: correct behavior in related module

This approach breaks the conventional commits' standard, but the developer may still have
a good reason for doing so. In this case create the 5 conventional commit messages
and 3 more commit messages with multiple types.

Keep in mind you will suggest multiple commit messages. Only 1 will be used. It's
better to push yourself (esp to synthesize to a higher level) and maybe wrong
about some of the commits because only one needs to be good. I'm looking
for your best commit, not the best average commit. It's better to cover more
scenarios than include a lot of overlap.
