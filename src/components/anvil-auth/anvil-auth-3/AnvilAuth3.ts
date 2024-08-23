import assert from "assert";

import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    SharedAuthState,
} from "../AnvilAuth";

import {
    OpenOdin,
} from "openodin";

import {
    router,
} from "riotjs-simple-router";

import {
    stateController,
} from "riotjs-simple-state";

export interface AnvilAuth3Props {
    openOdin: OpenOdin;
}

export interface AnvilAuth3State {}

export class AnvilAuth3 extends RiotBase<AnvilAuth3Props, AnvilAuth3State> {
    protected authState?: SharedAuthState;
    protected router = router;
    protected stateController = stateController;

    public onBeforeMount(props: AnvilAuth3Props, state: AnvilAuth3State) {
        props.openOdin.onOpen(this.handleOpen);
    }

    protected handleOpen = () => {
        const appJSON = this.authState?.appJSON;

        assert(appJSON, "Expected appJSON to be set");

        const openOdin = this.props.openOdin;

        assert(openOdin, "Expected openOdin to be set");

        const appConf = OpenOdin.ParseAppConf(appJSON);

        if (openOdin.isPendingAuth() || openOdin.isClosed()) {
            return;
        }

        openOdin.auth(appConf);
    }

    public onMounted(props: AnvilAuth3Props, state: AnvilAuth3State) {
        this.stateController.load("auth").then( (authState: SharedAuthState) => {
            this.authState = authState;

            this.update();
        });
    }

    public onBeforeUpdate(props: AnvilAuth3Props, state: AnvilAuth3State) {
        if (this.authState) {
            if (!this.authState.appJSON) {
                this.router.pushRoute("auth1");
            }
        }
    }

    public onUnmounted(props: AnvilAuth3Props, state: AnvilAuth3State) {
        props.openOdin?.offOpen(this.handleOpen);
    }
}
