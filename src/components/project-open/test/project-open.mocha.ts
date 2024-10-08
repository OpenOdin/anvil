import fs from "fs";

import assert from "assert";

import {
    Wrapped,
} from "riotjs-simple-typescript";

import {
    stateController
} from "riotjs-simple-state";

import {ProjectOpen} from "../ProjectOpen.ts";  // Note: .ts

describe("project-open component", function() {
    beforeEach(function() {
        // Clear out configurations.
        //
        stateController.reset();
    });

    it("should load state and fetch json", async function() {
        await stateController.create("editState");

        const viewpath = `${__dirname}/../project-open.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const url = "https://raw.githubusercontent.com/OpenOdin/anvil/main/package.json";

        const wrapped = new Wrapped(ProjectOpen, html, {});

        // @ts-expect-error accessing protected field.
        await wrapped.component.loadURL(url);

        const editState = await stateController.load("editState");

        assert(editState.appConf, "Expected editState.appConf to be set");

        assert(editState.appConf.name === "anvil", "Expected editState.appConf name field to be set");
    });
});
