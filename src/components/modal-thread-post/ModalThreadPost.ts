import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    ThreadDataParams,
} from "openodin";

export interface ModalThreadPostProps {
    // populated by modal function
    //
    unmount?: () => void;

    done: (threadDataParams: ThreadDataParams) => void;

    name: string;

    threadDataParams: ThreadDataParams;
}

export interface ModalThreadPostState {}

export class ModalThreadPost extends RiotBase<ModalThreadPostProps, ModalThreadPostState> {

    public onMounted(props: ModalThreadPostProps, state: ModalThreadPostState) {
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
