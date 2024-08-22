import fs from "fs";

import assert from "assert";

import {
    Wrapped,
    StateController,
    Router,
    RouterCtrl,
} from "riotjs-simple-typescript";

import {AnvilAuth} from "../AnvilAuth.ts";  // Note: .ts

describe("anvil-auth component", function() {
    beforeEach(function() {
        // Mock for OpenOdin
        //
        global.addEventListener = () => {};

        //@ts-expect-error
        global.window = {
            addEventListener: () => {},
        };
    });

    it("should create shared state auth", async function() {
        const stateController = new StateController();

        const router = new Router();

        const viewpath = `${__dirname}/../anvil-auth.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const props = {
            route: {
                name: "auth",
                location: "",
                args: ["/auth"],
                search: {},
            },
        };

        new Wrapped(AnvilAuth, html, props, stateController, router);

        const authState = await stateController.load("auth");

        assert(authState, "Expected auth state to be loadable");
    });

    it("should reroute from auth0 to auth1", async function() {
        const stateController = new StateController();

        const router = new Router();

        const routerCtrl = new RouterCtrl(router, "https://example.org/#/auth/0");

        const viewpath = `${__dirname}/../anvil-auth.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const props = {
            route: {
                name: "auth",
                location: "",
                args: ["/auth"],
                search: {},
            },
        };

        new Wrapped(AnvilAuth, html, props, stateController, router);

        assert(router.active.auth1, "Expected auth route to be active");

        assert(Object.keys(router.active).length === 1, "Expected only one route to be active");

        assert(routerCtrl.getHistory().length === 2, "Expected two history elements");

        assert(routerCtrl.getHistory()[1] === "https://example.org/#/auth/1",
            "Expected last history element to be auth1 route");
    });

    it("should match auth2 route", async function() {
        const stateController = new StateController();

        const router = new Router();

        const routerCtrl = new RouterCtrl(router, "https://example.org/#/auth/2");

        const viewpath = `${__dirname}/../anvil-auth.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const props = {
            route: {
                name: "auth",
                location: "",
                args: ["/auth"],
                search: {},
            },
        };

        new Wrapped(AnvilAuth, html, props, stateController, router);

        assert(router.active.auth2, "Expected auth2 route to be active");

        assert(Object.keys(router.active).length === 1, "Expected only one route to be active");

        assert(routerCtrl.getHistory().length === 1, "Expected one history element");

        assert(routerCtrl.getHistory()[0] === "https://example.org/#/auth/2",
            "Expected last history element to be auth2 url");
    });

    it("should match auth3 route", async function() {
        const stateController = new StateController();

        const router = new Router();

        const routerCtrl = new RouterCtrl(router, "https://example.org/#/auth/3");

        const viewpath = `${__dirname}/../anvil-auth.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const props = {
            route: {
                name: "auth",
                location: "",
                args: ["/auth"],
                search: {},
            },
        };

        new Wrapped(AnvilAuth, html, props, stateController, router);

        assert(router.active.auth3, "Expected auth2 route to be active");

        assert(Object.keys(router.active).length === 1, "Expected only one route to be active");

        assert(routerCtrl.getHistory().length === 1, "Expected one history element");

        assert(routerCtrl.getHistory()[0] === "https://example.org/#/auth/3",
            "Expected last history element to be auth3 url");
    });

    it("should yield 404 when no auth route is matched", async function() {
        const stateController = new StateController();

        const router = new Router();

        const routerCtrl = new RouterCtrl(router, "https://example.org/#/auth/4");

        const viewpath = `${__dirname}/../anvil-auth.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const props = {
            route: {
                name: "auth",
                location: "",
                args: ["/auth"],
                search: {},
            },
        };

        new Wrapped(AnvilAuth, html, props, stateController, router);

        assert(router.active["404"], "Expected 404 route to be active");

        assert(Object.keys(router.active).length === 1, "Expected only one route to be active");

        assert(routerCtrl.getHistory().length === 1, "Expected one history element");

        assert(routerCtrl.getHistory()[0] === "https://example.org/#/auth/4",
            "Expected last history element to be non valid url");
    });
});
