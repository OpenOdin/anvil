import {
    RiotModal,
    ModalOptions,
    riot,
} from "riotjs-simple-typescript";

//@ts-expect-error no typings
import riotComponentWrapper from "./modal-open-thread.riot";

export interface ModalOpenThreadProps {
    threads: string[];
}

export interface ModalOpenThreadState {}

export type ModalOpenThreadResult = string | undefined;

export class ModalOpenThread extends RiotModal<ModalOpenThreadProps, ModalOpenThreadState, ModalOpenThreadResult> {
    public static open(props: ModalOpenThreadProps, options?: ModalOptions) {
        return ModalOpenThread.openModal<ModalOpenThreadProps, ModalOpenThreadResult>(props, options,
            riotComponentWrapper);
    }

    public pick(name: string) {
        this.close(name);
    }
}
