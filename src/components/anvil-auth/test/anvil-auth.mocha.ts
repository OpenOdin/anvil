import fs from "fs";

import assert from "assert";

import {
    Wrapped,
} from "riotjs-simple-typescript";

import {
    RouterCtrl,
    router,
} from "riotjs-simple-router";

import {
    stateController,
} from "riotjs-simple-state";

import {AnvilAuth} from "../AnvilAuth.ts";  // Note: .ts

describe("anvil-auth component", function() {
    beforeEach(function() {
        // Clear out router configurations.
        //
        router.reset();

        stateController.reset();
    });

    it("should create shared state auth", async function() {
        const viewpath = `${__dirname}/../anvil-auth.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const openOdin: any = {};

        const props = {
            route: {
                name: "auth",
                location: "",
                args: ["/auth"],
                search: {},
            },
            openOdin,
        };

        const wrapped = new Wrapped(AnvilAuth, html, props);

        const authState = await stateController.load("auth");

        assert(authState, "Expected auth state to be created");
    });

    it("should reroute from auth0 to auth1", function() {
        const viewpath = `${__dirname}/../anvil-auth.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const openOdin: any = {};

        const props = {
            route: {
                name: "auth",
                location: "",
                args: ["/auth"],
                search: {},
            },
            openOdin,
        };

        new Wrapped(AnvilAuth, html, props);

        const routerCtrl = new RouterCtrl(router, "https://example.org/#/auth/");

        assert(router.active.auth1, "Expected auth1 route to be active");

        assert(Object.keys(router.active).length === 1, "Expected only one route to be active");

        assert(routerCtrl.getHistory().length === 2, "Expected two history elements");

        assert(routerCtrl.getHistory()[1] === "https://example.org/#/auth/1",
            "Expected last history element to be auth1 route");
    });

    it("should match auth2 route", function() {
        const viewpath = `${__dirname}/../anvil-auth.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const openOdin: any = {};

        const props = {
            route: {
                name: "auth",
                location: "",
                args: ["/auth"],
                search: {},
            },
            openOdin,
        };

        new Wrapped(AnvilAuth, html, props);

        const routerCtrl = new RouterCtrl(router, "https://example.org/#/auth/2");

        assert(router.active.auth2, "Expected auth2 route to be active");

        assert(Object.keys(router.active).length === 1, "Expected only one route to be active");

        assert(routerCtrl.getHistory().length === 1, "Expected one history element");

        assert(routerCtrl.getHistory()[0] === "https://example.org/#/auth/2",
            "Expected last history element to be auth2 url");
    });

    it("should match auth3 route", function() {
        const viewpath = `${__dirname}/../anvil-auth.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const openOdin: any = {};

        const props = {
            route: {
                name: "auth",
                location: "",
                args: ["/auth"],
                search: {},
            },
            openOdin,
        };

        new Wrapped(AnvilAuth, html, props);

        const routerCtrl = new RouterCtrl(router, "https://example.org/#/auth/3");

        assert(router.active.auth3, "Expected auth2 route to be active");

        assert(Object.keys(router.active).length === 1, "Expected only one route to be active");

        assert(routerCtrl.getHistory().length === 1, "Expected one history element");

        assert(routerCtrl.getHistory()[0] === "https://example.org/#/auth/3",
            "Expected last history element to be auth3 url");
    });

    it("should yield 404 when no auth route is matched", function() {
        const viewpath = `${__dirname}/../anvil-auth.riot`;
        const html = fs.readFileSync(viewpath, "utf-8");

        const openOdin: any = {};

        const props = {
            route: {
                name: "auth",
                location: "",
                args: ["/auth"],
                search: {},
            },
            openOdin,
        };

        new Wrapped(AnvilAuth, html, props);

        const routerCtrl = new RouterCtrl(router, "https://example.org/#/auth/4");

        assert(router.active["404"], "Expected 404 route to be active");

        assert(Object.keys(router.active).length === 1, "Expected only one route to be active");

        assert(routerCtrl.getHistory().length === 1, "Expected one history element");

        assert(routerCtrl.getHistory()[0] === "https://example.org/#/auth/4",
            "Expected last history element to be non valid url");
    });
});
