"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnvilAuth = void 0;
const riotjs_simple_typescript_1 = require("riotjs-simple-typescript");
class AnvilAuth extends riotjs_simple_typescript_1.Base {
    constructor() {
        super(...arguments);
        this.routes = {};
    }
    onBeforeMount(props, state) {
        this.stateController.create("auth");
        this.routes = {
            auth0: {
                match: "^/0[/]?$",
                base: props.route.args[0],
                // If matched then immediately replace url with auth1 and have the auth process rerun.
                //
                reroute: "auth1",
            },
            auth1: {
                match: "^/1[/]?$",
                pushURL: `/#${props.route.args[0]}/1`,
                base: props.route.args[0],
                subGroup: "any-auth",
            },
            auth2: {
                match: "^/2[/]?$",
                pushURL: `/#${props.route.args[0]}/2`,
                base: props.route.args[0],
                subGroup: "any-auth",
            },
            auth3: {
                match: "^/3[/]?$",
                pushURL: `/#${props.route.args[0]}/3`,
                base: props.route.args[0],
                subGroup: "any-auth",
            },
        };
        this.router.register(this.routes);
    }
    onUnmounted(props, state) {
        this.router.unregister(this.routes);
    }
}
exports.AnvilAuth = AnvilAuth;
