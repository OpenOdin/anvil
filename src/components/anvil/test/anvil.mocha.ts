import fs from "fs";

import assert from "assert";

import {
    Wrapped,
} from "riotjs-simple-typescript";

import {
    RouterCtrl,
    router,
} from "riotjs-simple-router";

// Here we are specific that we are importing the Anvil.ts file and not implicitly the Anvil.js file.
// This gives us the error lines in Anvil.ts instead of in Anvil.js on errors in the tests.
//
import {Anvil} from "../Anvil.ts";  // Note: .ts

describe("anvil (application entry point)", function() {
    beforeEach(function() {
        // Clear out router configurations.
        //
        router.reset();

        // Mock for OpenOdin
        //
        global.addEventListener = () => {};

        //@ts-expect-error
        global.window = {
            addEventListener: () => {},
        };
    });

    it("should redirect to auth when not authed", function() {
        const routerCtrl = new RouterCtrl(router, "https://example.org/#/main/");

        const viewpath = `${__dirname}/../anvil.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const props = {};

        new Wrapped(Anvil, html, props);

        assert(router.getLocation() === "https://example.org/#/", "Expected location to be reset to /#/");

        assert(routerCtrl.getHistory().length === 2, "Expected two history elements");

        assert(routerCtrl.getHistory()[0] === "https://example.org/#/main/",
            "Expected last history element to be auth0 route");

        assert(routerCtrl.getHistory()[1] === "https://example.org/#/",
            "Expected last history element to be auth0 route");
    });
});
