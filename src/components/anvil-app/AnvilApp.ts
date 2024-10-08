/**
 * This is the entry point for the application.
 *
 * This entry component is responsible for:
 * 1. Show the open project component if no project is loaded.
 * 2. Show the main component (ProjectWindow) if project is loaded.
 * 3. Show the 404 component if the URL doesn't match any registered route.
 * 4. Create and manage the OpenOdin and Service instances.
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

export interface AnvilAppProps {}

export interface AnvilAppState {
    /** Upon successful authentication Service is created. */
    service?: Service,

    openOdin: OpenOdin,
}

export class AnvilApp extends RiotBase<AnvilAppProps, AnvilAppState> {
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

    public onBeforeMount(props: AnvilAppProps, state: AnvilAppState) {
        stateController.create("editState", this.editState);

        this.createOpenOdin();
    }

    public onMounted(props: AnvilAppProps, state: AnvilAppState) {
        stateController.watch("editState", (editState: SharedEditState) => {
            this.editState = editState;

            this.update();
        });

        // We do this to reset any existing URL.
        //
        router.pushURL("/#/");
    }
}
