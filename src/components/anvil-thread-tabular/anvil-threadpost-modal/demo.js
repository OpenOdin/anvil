import {
    riot,
} from "../../../includes";

import {
    modal,
} from "../../../lib/modal";

const done = (threadDataParams) => {
    console.log("Done", threadDataParams);
};

modal.open("anvil-threadpost-modal", {
    name: "message",
    threadDataParams: {refId: "0001"},
    done,
});
