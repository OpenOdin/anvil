import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    Routes,
    RouteParams,
    router,
} from "riotjs-simple-router";

import {
    stateController,
} from "riotjs-simple-state";

import {
    OpenOdin,
} from "openodin";

// This shared auth object is for the sub components to use.
//
export type SharedAuthState = {
    appJSON?: Record<string, any>,
};

export interface AnvilAuthProps {
    route: RouteParams;
    openOdin: OpenOdin;
}

export interface AnvilAuthState {}

export class AnvilAuth extends RiotBase<AnvilAuthProps, AnvilAuthState> {
    protected routes: Routes = {};
    protected router = router;
    protected stateController = stateController;

    public onBeforeMount(props: AnvilAuthProps, state: AnvilAuthState) {
        this.stateController.create("auth");

        this.routes = {
            auth0: {
                match: "^/$",
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

    public onUnmounted(props: AnvilAuthProps, state: AnvilAuthState) {
        this.router.unregister(this.routes);
    }
}
