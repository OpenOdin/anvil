import {
    Base,
} from "riotjs-simple-typescript";

import {
    Service,
} from "openodin";

import {
    AnvilThreadController,
} from "../../lib/AnvilThreadController";

export interface AnvilDataProps {
    service: Service;
}

export interface AnvilDataState {
    tabId: number;
    threads: AnvilThreadController[];
}

export class AnvilData extends Base<AnvilDataProps, AnvilDataState> {
    protected threadId: number = 1;

    public onBeforeMount(props: AnvilDataProps, state: AnvilDataState) {
        state.tabId = 0;

        const name = "presence";

        const threadTemplate = props.service.getThreadTemplates()[name];

        state.threads = [
            new AnvilThreadController(props.service, this.threadId++, name, threadTemplate),
        ];

        // TODO hook service onClose kill all threads
    }

    public tabClicked = (id: number) => {
        this.state.tabId = id;

        this.update();
    }
}
