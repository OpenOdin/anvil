import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    stateController,
} from "riotjs-simple-state";

import {
    SharedEditState,
} from "../anvil/Anvil";

export interface ProjectOpenProps {}

export interface ProjectOpenState {}

export class ProjectOpen extends RiotBase<ProjectOpenProps, ProjectOpenState> {
    public load = () => {
        this.loadURL("/app.json");
    }

    protected async loadURL(url: string) {
        let appConf;

        try {
            appConf = await (await fetch(url)).json();
        }
        catch(e) {
            console.error(`Could not load or parse ${url} JSON config file: ${e}`);

            return;
        }

        if (appConf) {
            const editState: SharedEditState = {
                appConf,
                isSaved: true,
            };

            stateController.publish("editState", editState);

            this.update();
        }
    }
}
