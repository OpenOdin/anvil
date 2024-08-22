import {
    Base,
} from "riotjs-simple-typescript";

import {
    AnvilThreadController,
} from "../../lib/AnvilThreadController";

export interface AnvilThreadProps {
    controller: AnvilThreadController,
}

export interface AnvilThreadState {
    tab: string;
}

export class AnvilThread extends Base<AnvilThreadProps, AnvilThreadState> {
    public onBeforeMount(props: AnvilThreadProps, state: AnvilThreadState) {
        state.tab = "configure";
    }

    public tabClicked = (tab: string) => {
        this.update({tab});
    }
}
