# Holochain Stencil Template

## Environment Setup

> PREREQUISITE: set up the [holochain development environment](https://developer.holochain.org/docs/install/).

Enter the nix shell by running this in the root folder of the repository:

```bash
nix develop
```

**Run all the other instructions in this README from inside this nix-shell, otherwise they won't work**.

Install project dependencies for all workspaces

```bash
npm install
```

\*\* For the app to run, you'll have to have at least one Holochain DNA.

## Holochain scaffold commands

### Scaffold DNA

```bash
hc scaffold dna
```

### Scaffold Zome

```bash
hc scaffold zome
```

### Scaffold Entry Type

```bash
hc scaffold entry-type
```

## Running 2 agents

```bash
npm start
```

This will create a network of 2 nodes connected to each other and their respective UIs.
It will also bring up the Holochain Playground for advanced introspection of the conductors.

## Running the backend tests

```bash
npm test
```

## Bootstrapping a network

Create a custom network of nodes connected to each other and their respective UIs with:

```bash
AGENTS=3 npm run network
```

Substitute the "3" for the number of nodes that you want to bootstrap in your network.
This will also bring up the Holochain Playground for advanced introspection of the conductors.

## Packaging

To package the web happ:

```bash
npm run package
```

You'll have the `holochain-stencil-template.webhapp` in `workdir`. This is what you should distribute so that the Holochain Launcher can install it.
You will also have its subcomponent `holochain-stencil-template.happ` in the same folder`.

## Documentation

This repository is using these tools:

- [NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces/): npm v7's built-in monorepo capabilities.
- [hc](https://github.com/holochain/holochain/tree/develop/crates/hc): Holochain CLI to easily manage Holochain development instances.
- [@holochain/tryorama](https://www.npmjs.com/package/@holochain/tryorama): test framework.
- [@holochain/client](https://www.npmjs.com/package/@holochain/client): client library to connect to Holochain from the UI.
- [@holochain-playground/cli](https://www.npmjs.com/package/@holochain-playground/cli): introspection tooling to understand what's going on in the
- [@stencil/core](https://www.npmjs.com/package/@stencil/core): web component compiler for creating client components
