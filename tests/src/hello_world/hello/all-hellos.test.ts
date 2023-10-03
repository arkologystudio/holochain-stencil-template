import { assert, test } from "vitest";

import { runScenario, pause, CallableCell, dhtSync } from "@holochain/tryorama";
import {
  NewEntryAction,
  ActionHash,
  Record,
  AppBundleSource,
  fakeActionHash,
  fakeAgentPubKey,
  fakeEntryHash,
} from "@holochain/client";
import { decode } from "@msgpack/msgpack";
const path = require("path");

import { HelloWorld } from "../../../../ui/types/entryTypes";

test("Post a hello and attempt to retrive them.", async () => {
  await runScenario(async (scenario) => {
    // Construct proper paths for your app.
    // This assumes app bundle created by the `hc app pack` command.

    const app_path: string = path.resolve(
      __dirname,
      "../../../..",
      "workdir/holochain-stencil-template.happ"
    );

    // Set up the app to be installed
    const appSource = { appBundleSource: { path: app_path } };

    // Add 2 players with the test app to the Scenario. The returned players
    // can be destructured.
    console.log("Adding players to the scenario...");
    const [alice, bob] = await scenario.addPlayersWithApps([
      appSource,
      appSource,
    ]);

    // Shortcut peer discovery through gossip and register all agents in every
    // conductor of the scenario.
    await scenario.shareAllAgents();

    // Bob gets all hellos
    let hellos: HelloWorld[] = await bob.cells[0].callZome({
      zome_name: "hello",
      fn_name: "get_all_hellos",
      payload: null,
    });
    assert.equal(hellos.length, 0);

    // Alice creates a HelloWorld
    const payload: HelloWorld = {
      content: "Hello, world!",
      author: alice.agentPubKey,
    };

    const createdRecord: Record = await alice.cells[0].callZome({
      zome_name: "hello",
      fn_name: "post_hello",
      payload: payload,
    });
    assert.ok(createdRecord);

    await dhtSync([alice, bob], alice.cells[0].cell_id[0]);

    // Bob gets all hellos again
    hellos = await bob.cells[0].callZome({
      zome_name: "hello",
      fn_name: "get_all_hellos",
      payload: null,
    });
    assert.equal(hellos.length, 1);
  });
});
