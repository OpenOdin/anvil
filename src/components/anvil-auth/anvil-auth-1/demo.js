import {
    riot,
    stateController,
} from "../../../includes";

stateController.create("auth");

import AnvilAuth1 from "./anvil-auth-1.riot"

const elm = document.createElement("anvil-auth-1");
document.querySelector("body").append(elm)
riot.component(AnvilAuth1)(elm, {defaultUrl: "/app-test.json"});
