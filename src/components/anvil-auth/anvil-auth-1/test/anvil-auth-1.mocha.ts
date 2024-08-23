import fs from "fs";

import assert from "assert";

import {
    Wrapped,
} from "riotjs-simple-typescript";

import {
    router,
} from "riotjs-simple-router";

import {
    stateController
} from "riotjs-simple-state";

import {AnvilAuth1} from "../AnvilAuth1.ts";  // Note: .ts

const sleep = function(delay: number): Promise<void> {
    return new Promise( resolve => {
        setTimeout(resolve, delay);
    });
}

describe("anvil-auth-1 component", function() {
    beforeEach(function() {
        // Clear out configurations.
        //
        router.reset();

        stateController.reset();
    });

    it("should set html input value on mount", function() {
        const viewpath = `${__dirname}/../anvil-auth-1.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const defaultUrl = "https://raw.githubusercontent.com/OpenOdin/anvil/main/package.json";

        // openOdin is only used in the view so it can be empty.
        const openOdin: any = {};

        const wrapped = new Wrapped(AnvilAuth1, html, {defaultUrl, openOdin});

        assert((wrapped.component.$("#load-url") as HTMLInputElement).value === defaultUrl,
            "Expected #load-url value to have been set");
    });

    it("should load state and fetch json", async function() {
        await stateController.create("auth");

        const viewpath = `${__dirname}/../anvil-auth-1.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const defaultUrl = "https://raw.githubusercontent.com/OpenOdin/anvil/main/package.json";

        // openOdin is only used in the view so it can be empty.
        const openOdin: any = {};

        const wrapped = new Wrapped(AnvilAuth1, html, {defaultUrl, openOdin});

        router.updateLocation("https://example.org");

        router.register({
            auth2: {
                match: "",
                pushURL: "/",
            }
        });

        // We need to sleep to let the component load the state.
        //
        await sleep(1);

        await wrapped.component.load();

        const authState = await stateController.load("auth");

        assert(authState.appJSON, "Expected authState.appJSON to be set");

        assert(authState.appJSON.name === "anvil", "Expected authState.appJSON name field to be set");

        await wrapped.component.reset();

        const authState2 = await stateController.load("auth");

        assert(!authState2.appJSON, "Expected authState.appJSON not to be set");
    });
});
