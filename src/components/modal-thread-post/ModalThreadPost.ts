import {
    RiotModal,
    ModalOptions,
    riot,
} from "riotjs-simple-typescript";

import {
    ThreadDataParams,
} from "openodin";

//@ts-expect-error no typings
import riotComponentWrapper from "./modal-thread-post.riot";

export interface ModalThreadPostProps {
    name: string;

    threadDataParams: ThreadDataParams;
}

export interface ModalThreadPostState {}

export type ModalThreadPostResult = ThreadDataParams | undefined;

export class ModalThreadPost extends RiotModal<ModalThreadPostProps, ModalThreadPostState, ModalThreadPostResult> {
    public static open(props: ModalThreadPostProps, options?: ModalOptions) {
        return ModalThreadPost.openModal<ModalThreadPostProps, ModalThreadPostResult>(props, options,
            riotComponentWrapper);
    }

    public onBeforeMount(props: ModalThreadPostProps, state: ModalThreadPostState) {}

    public onMounted(props: ModalThreadPostProps, state: ModalThreadPostState) {
        (this.$("#postparams") as HTMLInputElement).value =
            JSON.stringify(props.threadDataParams, null, 4);
    }

    public next = () => {
        try {
            const json = (this.$("#postparams") as HTMLInputElement).value;

            const params: ThreadDataParams = JSON.parse(json);

            this.close(params);
        }
        catch(e) {
            console.error(e);
        }
    }
}
