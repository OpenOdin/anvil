import {
    riot,
} from "../../globals";

import {
    stateController,
} from "riotjs-simple-state";

import "../../index.css";

import ProjectOpen from "./project-open.riot"

stateController.create("editState");

const elm = document.createElement("project-open");
document.querySelector("body").append(elm)
riot.component(ProjectOpen)(elm, {});
