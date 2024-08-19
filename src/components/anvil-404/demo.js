import {
    riot,
} from "../../includes";

import Anvil404 from "./anvil-404.riot"

const elm = document.createElement("anvil-404");
document.querySelector("body").append(elm)
riot.component(Anvil404)(elm);
