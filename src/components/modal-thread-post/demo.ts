import "../../globals";

import {
    riot,
    ModalOptions,
} from "riotjs-simple-typescript";

import {
    ModalThreadPost,
    ModalThreadPostProps,
} from "./ModalThreadPost";

const props: ModalThreadPostProps = {
    name: "message",
    threadDataParams: {refId: Buffer.from("0001", "hex")},
};

const options: ModalOptions = {};

ModalThreadPost.open(props, options).then( console.log );
