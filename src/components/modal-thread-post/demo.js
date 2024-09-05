import {
    riot,
} from "../../globals";

import {
    modal,
} from "../../lib/modal";

import "../../index.css";

import ModalThreadPost from "./modal-thread-post.riot"

riot.register("modal-thread-post", ModalThreadPost);

const done = (threadDataParams) => {
    console.log("Done", threadDataParams);
};

modal.open("modal-thread-post", {
    name: "message",
    threadDataParams: {refId: "0001"},
    done,
});
