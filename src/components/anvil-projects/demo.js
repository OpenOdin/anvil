import {
    riot,
} from "../../includes";

import {
    stateController,
} from "riotjs-simple-state";

import AnvilProjects from "./anvil-projects.riot"

stateController.create("editState");

const elm = document.createElement("anvil-projects");
document.querySelector("body").append(elm)
riot.component(AnvilProjects)(elm, {});
