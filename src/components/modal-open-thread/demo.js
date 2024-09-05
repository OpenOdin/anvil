import {
    riot,
} from "../../globals";

import {
    modal,
} from "../../lib/modal";

import "../../index.css";

import ModalOpenThread from "./modal-open-thread.riot"

riot.register("modal-open-thread", ModalOpenThread);

modal.open("modal-open-thread", {threads:["presence", "channels", "channel"]});
