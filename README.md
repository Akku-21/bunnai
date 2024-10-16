# ai-commit-message-generator

<p align="center">
  <img src="https://github.com/chhoumann/bunnai/assets/29108628/1ec69e68-7d5e-4a4d-b4d6-56e202e1c54c">
</p>

have ai write commit messages for you in [lazygit](https://github.com/jesseduffield/lazygit).

uses openai to generate commit message suggestions based on the diff between the current branch and master.
then you can select a commit message from the list and use it to commit your changes.

## dependencies
//markup link
-   [aichat](https://github.com/sigoden/aichat)
install and configure to use this plugin.

## installation

```sh
bun install -g @akku_21/ai-commit-message-generator
```

```sh
cm-gen config
```

## usage

you can specify custom templates. use `cm-gen config` to edit the templates.
when you invoke `cm-gen`, you can specify a template name to use with `--template`.

### as a menu

this creates a menu of commit messages based on the diff between the current branch and master.

insert the following custom command into your [lazygit](https://github.com/jesseduffield/lazygit) config file:

```yaml
customCommands:
    - key: "<c-a>" # ctrl + a
        description: "pick AI commit"
        command: 'git commit -m "{{.Form.Msg}}"'
        context: "files"
        prompts:
            - type: "menuFromCommand"
            title: "ai Commits"
            key: "Msg"
            command: "bunx cm-gen"
            filter: '^(?P<number>\d+)\.\s(?P<message>.+)$'
            valueFormat: "{{ .message }}"
            labelFormat: "{{ .number }}: {{ .message | green }}"
```

### with vim

this allows you to edit the commit message in vim after you've selected it from the menu.

abort comitting by deleting the commit message in vim.

```yaml
customCommands:
    - key: "<c-a>" # ctrl + a
      description: "Pick AI commit"
      command: 'echo "{{.Form.Msg}}" > .git/COMMIT_EDITMSG && vim .git/COMMIT_EDITMSG && [ -s .git/COMMIT_EDITMSG ] && git commit -F .git/COMMIT_EDITMSG || echo "Commit message is empty, commit aborted."'
      context: "files"
      subprocess: true
      prompts:
          - type: "menuFromCommand"
            title: "AI Commits"
            key: "Msg"
            command: "bunx cm-gen"
            filter: '^(?P<number>\d+)\.\s(?P<message>.+)$'
            valueFormat: "{{ .message }}"
            labelFormat: "{{ .number }}: {{ .message | green }}"
```

## acknowledgements

check out these other projects that inspired this one:

-   https://github.com/BuilderIO/ai-shell
-   https://github.com/sigoden/aichat
-   forked from https://github.com/chhoumann/bunnai
