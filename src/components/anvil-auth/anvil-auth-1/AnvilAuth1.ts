import assert from "assert";

import {
    Base,
} from "riotjs-simple-typescript";

import {
    stateController,
} from "riotjs-simple-state";

import {
    router,
} from "riotjs-simple-router";

import {
    SharedAuthState,
} from "../AnvilAuth";

import {
    OpenOdin,
} from "openodin";

export interface AnvilAuth1Props {
    defaultUrl: string;
    openOdin: OpenOdin;
}

export interface AnvilAuth1State {}

export class AnvilAuth1 extends Base<AnvilAuth1Props, AnvilAuth1State> {
    protected authState?: SharedAuthState;
    protected stateController = stateController;
    protected router = router;

    public onMounted(props: AnvilAuth1Props, state: AnvilAuth1State) {
        this.initUI();

        this.stateController.load("auth").then( (authState: SharedAuthState) => {
            this.authState = authState;

            this.update();
        });
    }

    protected initUI() {
        ((this.$("#load-url") ?? {}) as HTMLInputElement).value = this.props.defaultUrl;
    }

    public load = () => {
        const elm = this.$("#load-url") as HTMLInputElement;

        if (!elm) {
            return;
        }

        return this.loadURL(elm.value);
    }

    public loadDefault = () => {
        return this.loadURL(this.props.defaultUrl);
    }

    public reset = () => {
        assert(this.authState, "Expected authState");

        if (this.authState) {
            delete this.authState.appJSON;

            return this.stateController.publish("auth", this.authState);
        }

        this.update();
    }

    protected async loadURL(url: string) {
        assert(this.authState, "Expected authState");

        let appJSON;

        try {
            appJSON = await (await fetch(url)).json();
        }
        catch(e) {
            console.error(`Could not load or parse ${url} JSON config file`, e);
            return;
        }

        if (appJSON) {
            this.authState = {appJSON};
            await this.stateController.publish("auth", this.authState);
            this.update();
            this.router.pushRoute("auth2");
        }
    }
}
