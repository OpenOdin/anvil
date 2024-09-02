import {
    RiotBase,
} from "riotjs-simple-typescript";

export interface AnvilOpenThreadModalProps {
    // populated by modal function
    //
    unmount?: () => void;

    done: (name?: string) => void;

    threads: string[];
}

export interface AnvilOpenThreadModalState {}

export class AnvilOpenThreadModal extends RiotBase<AnvilOpenThreadModalProps, AnvilOpenThreadModalState> {

    public onBeforeMount(props: AnvilOpenThreadModalProps, state: AnvilOpenThreadModalState) {
    }

    public onMounted(props: AnvilOpenThreadModalProps, state: AnvilOpenThreadModalState) {
    }

    public pick(name: string) {
        this.props.done(name);

        this.props.unmount?.();
    };

    public close = () => {
        this.props.done();

        this.props.unmount?.();
    }

    public onUnmounted(props: AnvilOpenThreadModalProps, state: AnvilOpenThreadModalState) {}
}
