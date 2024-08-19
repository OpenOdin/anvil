"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Anvil = void 0;
/**
 * This entry component is responsible for three things:
 * 1. Redirect to the auth flow (AnvilAuth) if not authed already.
 * 2. Load the main component (AnvilMain) if authed.
 * 3. Load the 404 component if the URL doesn't match any registered route.
 */
const riotjs_simple_typescript_1 = require("riotjs-simple-typescript");
const openodin_1 = require("openodin");
class Anvil extends riotjs_simple_typescript_1.Base {
    constructor() {
        super(...arguments);
        this.routes = {
            auth: {
                // We catch the "/auth" part so we can use it in the sub components, just to not have to hard code that value.
                // It will be accessible as props.route.args[0]
                //
                match: "^(/auth)/.*$",
                // This route pushes to the route "auth0" registered in AnvilAuth.
                // We need to do it this way since AnvilAuth has not yet been created so we can't
                // simply use reroute: "auth0".
                //
                pushURL: "/#/auth/0",
            },
            main: {
                match: "^/",
                nomatch: "^/auth/",
                pushURL: "/#/",
            },
        };
        this.createOpenOdin = () => {
            const openOdin = new openodin_1.OpenOdin();
            this.stateController.ref.openOdin = openOdin;
            openOdin.onAuthFail(() => this.update());
            openOdin.onPreAuth(() => this.update());
            openOdin.onAuth(() => {
                this.router.refresh();
            });
            openOdin.onAttentionNeeded(() => this.update());
            openOdin.onClose(() => this.update());
        };
    }
    onBeforeMount(props, state) {
        this.createOpenOdin();
        // Register a preRoute function so we can check auth status
        // and redirect the flow accordingly.
        //
        this.router.onPreRoute((active) => {
            // If no route was matched we don't want to mess with the flow.
            //
            if (active["404"]) {
                return;
            }
            if (active.auth) {
                if (this.stateController.ref.openOdin?.isAuthed()) {
                    this.router.replaceRoute("main");
                    // Returning true will signal to Router that we have changed stuff and that it
                    // should not perform an update() before it ends. This is since the match function will rerun anyways.
                    //
                    return true;
                }
            }
            else {
                if (!this.stateController.ref.openOdin?.isAuthed()) {
                    this.router.replaceRoute("auth");
                    return true;
                }
            }
        });
        this.router.register(this.routes);
    }
    onUnmounted(props, state) {
        this.router.unregister(this.routes);
    }
}
exports.Anvil = Anvil;
