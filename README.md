# LUUX - Web App

<hr/>

## Introduction

### TBD...

<hr/>

## Installation

### TBD...

<hr/>

## Branch & Domain

### TBD...

<hr/>

## Commit Message Format:

```
<type>(<scope>): <task name> | <short summary>
  │       │         │              │
  │       │         │              └─⫸ Summary in present tense. Not capitalized. No period at the end.
  │       │         │
  │       │         └─⫸ Task name was assign for this commit
  │       │
  │       └─⫸ Commit Scope: animations|bazel|benchpress|common|compiler|compiler-cli|core|
  │                          elements|forms|http|language-service|localize|platform-browser|
  │                          platform-browser-dynamic|platform-server|router|service-worker|
  │                          upgrade|zone.js|packaging|changelog|dev-infra|docs-infra|migrations|
  │                          ngcc|ve|global|*
  │
  └─⫸ Commit Type: build|ci|docs|feat|fix|perf|refactor|test
```

The `<type>` and `<summary>` fields are mandatory, the `<task_name>` and `<scope>` field is optional.

### Commit Message Example

- `feat(check-in table): Add to queue function`
- `style(pre check-in form): update style Skeleton`
- `fix(check-in table): close toast when click on snackbar`
- `refactor(check-in table): optimized component re-render`
- `ci: update buildspec - fix slack notification`

Or install extension: [Commit Message Editor](https://marketplace.visualstudio.com/items?itemName=adam-bender.commit-message-editor)
