import fs from "fs";

import assert from "assert";

import {
    Wrapped,
    StateController,
    Router,
    RouterCtrl,
} from "riotjs-simple-typescript";

// Here we are specific that we are importing the Anvil.ts file and not implicitly the Anvil.js file.
// This gives us the error lines in Anvil.ts instead of in Anvil.js on errors in the tests.
//
import {Anvil} from "../Anvil.ts";  // Note: .ts

describe("anvil component (application entry point)", function() {
    it("should redirect to auth when not authed", function() {
        const stateController = new StateController();

        const router = new Router();

        const routerCtrl = new RouterCtrl(router, "https://example.org/#/main/");

        const viewpath = `${__dirname}/../anvil.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const props = {};

        new Wrapped(Anvil, html, props, stateController, router);

        assert(router.active.auth, "Expected auth route to be active");

        assert(Object.keys(router.active).length === 1, "Expected only one route to be active");

        assert(routerCtrl.getHistory().length === 2, "Expected two history elements");

        assert(routerCtrl.getHistory()[1] === "https://example.org/#/auth/0",
            "Expected last history element to be auth0 route");
    });

    it("should redirect to main when authed", function() {
        const stateController = new StateController();

        const router = new Router();

        const routerCtrl = new RouterCtrl(router, "https://example.org/#/auth/1");

        const viewpath = `${__dirname}/../anvil.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const props = {};

        const wrapped = new Wrapped(Anvil, html, props, stateController, router, false);

        // Override the creation of the OpenOdin instance.
        //
        wrapped.component.createOpenOdin = () => {
            stateController.ref.openOdin = {
                isAuthed: () => true,
            };
        };

        wrapped.init();

        wrapped.component.createOpenOdin();

        assert(router.active.main, "Expected main route to be active");

        assert(Object.keys(router.active).length === 1, "Expected only one route to be active");

        assert(routerCtrl.getHistory().length === 2, "Expected two history elements");

        assert(routerCtrl.getHistory()[1] === "https://example.org/#/main/",
            "Expected last history element to be main route");
    });
});
