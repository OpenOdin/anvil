import {
    riot,
    ModalOptions,
} from "riotjs-simple-typescript";

import {
    ModalOpenThread,
    ModalOpenThreadProps,
} from "./ModalOpenThread";

const props: ModalOpenThreadProps = {
    threads: ["aaa", "bbb"],
};

const options: ModalOptions = {};

ModalOpenThread.open(props, options).then( console.log );
