# Nx Custom Executor

Learn how to create a custom executor with Nx for enhancing your project setup. This guide covers generating a plugin, adopting a custom configuration, and executing the executor to streamline development processes.

This document guides you through creating a custom Nx executor to run Stylelint configuration in your project, ensuring consistent style conventions.

## Generating a Executor

1. Run `nx generate @nx/plugin:executor stylelint --project=stylelint`

<img src="./images/generate-executor.png">

## Custom Configuration

```ts
import {exec} from 'child_process'
import { StylelintExecutorSchema } from './schema';

export default async function runExecutor(options: StylelintExecutorSchema) {
  console.log('run stylelint');
  await exec('npx stylelint');
  return {
    success: true,
  };
}
```

## Execution

Execute your executor to run stylelint in your codebase.

1. Add a target to a `project.json`
```json
{
  ...
  "targets": {
    "stylelint" : {
    "executor": "stylelint:stylelint"
    }
  }
}
```

Run `nx run <project-name>:stylelint` to execute Stylelint.

<img src="./images/executor-terminal-output.png">
