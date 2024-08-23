/**
 * This entry component is responsible for three things:
 * 1. Redirect to the auth flow (AnvilAuth) if not authed already.
 * 2. Load the main component (AnvilMain) if authed.
 * 3. Load the 404 component if the URL doesn't match any registered route.
 */
import {
    Base,
} from "riotjs-simple-typescript";

import {
    Routes,
} from "riotjs-simple-router";

import {
    OpenOdin,
    Service,
} from "openodin";

export interface AnvilProps {}

export interface AnvilState {
    /** Upon successful authentication Service is created. */
    service?: Service,

    openOdin?: OpenOdin,
}

export class Anvil extends Base<AnvilProps, AnvilState> {
    protected routes: Routes = {
        auth: {
            // We catch the "/auth" part so we can use it in the sub components,
            // just to not have to hard code that value.
            // It will be accessible as props.route.args[0]
            //
            match: "^(/auth)/.*$",

            // This route pushes to the route "auth0" registered in AnvilAuth.
            // We need to do it this way since AnvilAuth has not yet been created so we can't
            // simply use reroute: "auth0".
            //
            pushURL: "/#/auth/",
        },
        main: {
            match: "^(/main)/.*$",

            pushURL: "/#/main/",
        },
        root: {
            match: "^/$",

            reroute: "main",
        }
    };

    public createOpenOdin = () => {
        const openOdin = new OpenOdin();

        this.state.openOdin = openOdin;

        openOdin.onAuthFail(() => this.update());

        openOdin.onPreAuth(() => this.update());

        openOdin.onAuth((service) => {
            this.state.service = service;
            this.router.refresh();
        });

        openOdin.onAttentionNeeded(() => this.update());

        openOdin.onClose(() => {
            this.state.service?.close()
            delete this.state.service;
            this.update()
        });
    }

    public onBeforeMount(props: AnvilProps, state: AnvilState) {
        this.createOpenOdin();

        // Register a preRoute function so we can check auth status
        // and redirect the flow accordingly.
        //
        this.router.onPreRoute((active) => {
            if (!this.state.openOdin?.isAuthed()) {
                if (!active.auth) {
                    this.router.replaceRoute("auth");

                    return true;
                }
            }
            else {
                if (active.auth) {
                    this.router.replaceRoute("main");

                    return true;
                }
            }
        });

        this.router.register(this.routes);
    }

    public onUnmounted(props: AnvilProps, state: AnvilState) {
        this.router.unregister(this.routes);
    }
}
