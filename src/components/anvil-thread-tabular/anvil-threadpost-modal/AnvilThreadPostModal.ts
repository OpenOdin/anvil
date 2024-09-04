import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    ThreadDataParams,
} from "openodin";

export interface AnvilThreadPostModalProps {
    // populated by modal function
    //
    unmount?: () => void;

    done: (threadDataParams: ThreadDataParams) => void;

    name: string;

    threadDataParams: ThreadDataParams;
}

export interface AnvilThreadPostModalState {}

export class AnvilThreadPostModal extends RiotBase<AnvilThreadPostModalProps, AnvilThreadPostModalState> {

    public onMounted(props: AnvilThreadPostModalProps, state: AnvilThreadPostModalState) {
        (this.$("#postparams") as HTMLInputElement).value =
            JSON.stringify(props.threadDataParams, null, 4);
    }

    public next = () => {
        try {
            const json = (this.$("#postparams") as HTMLInputElement).value;

            const params: ThreadDataParams = JSON.parse(json);

            this.props.unmount?.();

            this.props.done(params);
        }
        catch(e) {
            console.error(e);
        }
    };

    public close = () => {
        this.props.unmount?.();
    }
}
