import {
    RiotBase,
} from "riotjs-simple-typescript";

export interface ModalOpenThreadProps {
    // populated by modal function
    //
    unmount?: () => void;

    done: (name?: string) => void;

    threads: string[];
}

export interface ModalOpenThreadState {}

export class ModalOpenThread extends RiotBase<ModalOpenThreadProps, ModalOpenThreadState> {

    public onBeforeMount(props: ModalOpenThreadProps, state: ModalOpenThreadState) {
    }

    public onMounted(props: ModalOpenThreadProps, state: ModalOpenThreadState) {
    }

    public pick(name: string) {
        this.props.done(name);

        this.props.unmount?.();
    };

    public close = () => {
        this.props.done();

        this.props.unmount?.();
    }

    public onUnmounted(props: ModalOpenThreadProps, state: ModalOpenThreadState) {}
}
