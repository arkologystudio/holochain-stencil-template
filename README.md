# Holochain Stencil Template

Starter template for a [Holochain](https://developer.holochain.org) + [Stencil](https://stenciljs.com) app

## Environment Setup

> PREREQUISITE: set up the [holochain development environment](https://developer.holochain.org/docs/install/).

**Note:** _this repository uses Holochain V2. To use a different version, see [here](https://developer.holochain.org/get-started/upgrade-holochain/)_\*\*.

Enter the nix shell by running this in the root folder of the repository:

```bash
nix develop
```

**Note:** _Run all the other instructions in this README from inside this nix-shell, otherwise they won't work_.

Install project dependencies for all workspaces

```bash
npm install
```

**Note:** _For the app to run, you'll have to have at least one Holochain DNA with corresponding integrity and coordinator zome pairs. The holochain scaffold tool can be used to create them._

## Holochain scaffold commands

**Note:** _The scaffold tool may ask you to choose a UI framework. Currently, none exist for Stencil so you may simply delete the generated components and develop your own._

### Scaffold DNA

```bash
hc scaffold dna
```

```bash
hc scaffold zome
```

```bash
hc scaffold entry-type
```

```bash
hc scaffold collection
```

... etc

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
