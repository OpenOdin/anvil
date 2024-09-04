import assert from "assert";

import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    Service,
} from "openodin";

import {
    ThreadWrapper,
} from "../../lib/ThreadWrapper";

import {
    modal,
} from "../../lib/modal";

import {
    ModalOpenThreadProps,
} from "../modal-open-thread/ModalOpenThread";

import {
    stateController,
} from "riotjs-simple-state";

import {
    SharedEditState,
} from "../anvil/Anvil";

export interface AnvilThreadsProps {
    service: Service;
}

export interface AnvilThreadsState {
    tabId: number;
    threadWrappers: ThreadWrapper[];
}

export class AnvilThreads extends RiotBase<AnvilThreadsProps, AnvilThreadsState> {
    protected threadId: number = 1;

    public onBeforeMount(props: AnvilThreadsProps, state: AnvilThreadsState) {
        state.threadWrappers = [];
        state.tabId = 0;

        // TODO hook service onClose kill all threads
    }

    public openThread = () => {
        stateController.load("editState").then( (editState: SharedEditState) => {
            if (editState.appConf?.threads) {
                const threads = Object.keys(editState.appConf.threads);

                const done = (name?: string) => {
                    if (name) {
                        const threadTemplate = editState.appConf?.threads[name];

                        assert(threadTemplate, "Expecting threadTemplate to exist");

                        this.initThread(name, threadTemplate);
                    }

                    this.update();
                };

                const props: ModalOpenThreadProps = {
                    threads,
                    done,
                };

                modal.open("modal-open-thread", props);
            }
        });
    }

    protected initThread(name: string, threadTemplate: Record<string, any>) {
        this.state.threadWrappers.push(
            new ThreadWrapper(this.props.service, this.threadId, `${name}#${this.threadId}`, threadTemplate),
        );

        this.state.tabId = this.threadId;

        this.threadId++;
    }

    public tabClicked = (id: number) => {
        this.state.tabId = id;

        this.update();
    }
}
