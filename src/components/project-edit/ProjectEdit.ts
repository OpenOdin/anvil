import assert from "assert";

import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    SharedEditState,
} from "../anvil/Anvil";

import {
    router,
} from "riotjs-simple-router";

import {
    stateController,
} from "riotjs-simple-state";

export interface ProjectEditProps {}

export interface ProjectEditState {}

export class ProjectEdit extends RiotBase<ProjectEditProps, ProjectEditState> {
    protected editState: SharedEditState = {};
    protected router = router;

    public onBeforeMount(props: ProjectEditProps, state: ProjectEditState) {}

    public onMounted(props: ProjectEditProps, state: ProjectEditState) {
        stateController.load("editState").then( (editState: SharedEditState) => {
            this.editState = editState;

            this.update();

            this.resetUI();
        });
    }

    protected resetUI() {
        assert(this.editState, "Expected editState to be loaded");

        if (this.editState.appConf) {
            const json = JSON.stringify(this.editState.appConf ?? {}, null, 4);

            ((this.$("#edit-area") ?? {}) as HTMLInputElement).value = json;
        }
    }

    public onBeforeUpdate(props: ProjectEditProps, state: ProjectEditState) {}

    public onchange = () => {
        assert(this.editState, "Expected editState to be loaded");

        if (this.editState.isSaved) {
            this.editState.isSaved = false;

            stateController.publish("editState", this.editState);

            this.update();
        }
    }

    public save = () => {
        assert(this.editState, "Expected editState to be loaded");

        const value = (this.$("#edit-area") as HTMLInputElement).value;

        try {
            this.editState.appConf = JSON.parse(value);
        }
        catch(e) {
            alert("Error in JSON");

            return;
        }

        this.editState.isSaved = true;

        stateController.publish("editState", this.editState);

        this.update();
    }

    public discard = () => {
        this.editState.isSaved = true;

        stateController.publish("editState", this.editState);

        this.resetUI();

        this.update();
    }
}
