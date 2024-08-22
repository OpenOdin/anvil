import {
    riot,
} from "../../includes";

import AnvilWaiting from "./anvil-waiting.riot"

const elm = document.createElement("anvil-waiting");
document.querySelector("body").append(elm)
riot.component(AnvilWaiting)(elm);
