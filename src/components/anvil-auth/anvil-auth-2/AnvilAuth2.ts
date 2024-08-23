import assert from "assert";

import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    SharedAuthState,
} from "../AnvilAuth";

import {
    router,
} from "riotjs-simple-router";

import {
    stateController,
} from "riotjs-simple-state";

import {
    OpenOdin,
} from "openodin";

export interface AnvilAuth2Props {
    openOdin: OpenOdin;
}

export interface AnvilAuth2State {
    isEdited: boolean,
}

export class AnvilAuth2 extends RiotBase<AnvilAuth2Props, AnvilAuth2State> {
    protected authState?: SharedAuthState;
    protected router = router;
    protected stateController = stateController;

    public onBeforeMount(props: AnvilAuth2Props, state: AnvilAuth2State) {
        state.isEdited = false;
    }

    public onMounted(props: AnvilAuth2Props, state: AnvilAuth2State) {
        this.stateController.load("auth").then( (authState: SharedAuthState) => {
            this.authState = authState;

            this.update();

            this.resetUI();
        });
    }

    protected resetUI() {
        assert(this.authState, "Expected authState to be loaded");

        if (this.authState.appJSON) {
            const storageJSON = JSON.stringify(this.authState.appJSON ?? {}, null, 4);
            ((this.$("#app-storage") ?? {}) as HTMLInputElement).value = storageJSON;
        }
    }

    public onBeforeUpdate(props: AnvilAuth2Props, state: AnvilAuth2State) {
        if (this.authState) {
            if (!this.authState.appJSON) {
                this.router.pushRoute("auth1");
            }
        }
    }

    public onchange = () => {
        this.state.isEdited = true;

        this.update();
    }

    public save = () => {
        assert(this.authState, "Expected authState to be loaded");

        const value = (this.$("#app-storage") as HTMLInputElement).value;

        try {
            this.authState.appJSON = JSON.parse(value);
            this.stateController.publish("auth", this.authState);
        }
        catch(e) {
            alert("Error in JSON");
            return;
        }

        this.state.isEdited = false;

        this.update();
    }

    public discard = () => {
        this.state.isEdited = false;

        this.resetUI();

        this.update();
    }
}
