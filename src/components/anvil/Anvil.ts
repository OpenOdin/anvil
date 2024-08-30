/**
 * This is the entry point for the application.
 * The application has three overarching states as defined below.
 *
 * This entry component is responsible for three things:
 * 1. Redirect to the auth flow (AnvilAuth) if not authed already.
 * 2. Load the main component (AnvilMain) if authed.
 * 3. Load the 404 component if the URL doesn't match any registered route.
 */
import assert from "assert";

import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    OpenOdin,
    Service,
} from "openodin";

import {
    router,
} from "riotjs-simple-router";

import {
    stateController,
} from "riotjs-simple-state";

export type SharedEditState = {
    appConf?: Record<string, any>,
    isSaved?: boolean,
};

export interface AnvilProps {}

export interface AnvilState {
    /** Upon successful authentication Service is created. */
    service?: Service,

    openOdin: OpenOdin,
}

export class Anvil extends RiotBase<AnvilProps, AnvilState> {
    // Place router here so the .riot template can access it.
    //
    protected router = router;

    protected editState: SharedEditState = {};

    protected createOpenOdin() {
        const openOdin = new OpenOdin();

        this.state.openOdin = openOdin;

        openOdin.onAuthFail(() => this.update());

        openOdin.onPreAuth(() => this.update());

        openOdin.onAuth((service) => {
            this.state.service = service;

            router.refresh();
        });

        openOdin.onAttentionNeeded(() => this.update());

        openOdin.onClose(() => {
            this.state.service?.close()

            delete this.state.service;

            this.createOpenOdin();

            this.update()
        });

        openOdin.onOpen(this.handleOpen);
    }

    protected handleOpen = () => {
        const openOdin = this.state.openOdin;

        assert(openOdin, "Expected openOdin to be set");

        if (openOdin.isAuthed() || openOdin.isPendingAuth() || openOdin.isClosed()) {
            return;
        }

        if (!this.editState.appConf) {
            console.error("Project needs to be loaded before authenticating");
            return;
        }

        if (!this.editState.isSaved) {
            console.error("Project needs to be saved before authenticating");
            return;
        }

        let appConf;
        try {
            appConf = OpenOdin.ParseAppConf(this.editState.appConf);
        }
        catch(e) {
            console.error(`Could not parse app conf: ${e}`);
            return;
        }

        openOdin.auth(appConf);
    }

    public onBeforeMount(props: AnvilProps, state: AnvilState) {
        stateController.create("editState", this.editState);

        this.createOpenOdin();
    }

    public onMounted(props: AnvilProps, state: AnvilState) {
        stateController.watch("editState", (editState: SharedEditState) => {
            this.editState = editState;

            this.update();
        });

        // We do this to reset any existing URL.
        //
        router.pushURL("/#/");
    }
}
