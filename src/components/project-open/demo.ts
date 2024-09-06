import "../../globals";

import {
    riot,
} from "riotjs-simple-typescript";

import {
    ProjectOpenProps,
} from "./ProjectOpen";

import {
    stateController,
} from "riotjs-simple-state";

//@ts-expect-error no typings
import riotComponentWrapper from "./project-open.riot";

const props: ProjectOpenProps = {};

stateController.create("editState");

if (!riotComponentWrapper.name) {
    throw new Error("Expected RiotComponentWrapper.name to be set");
}

const elm = document.createElement(riotComponentWrapper.name);

if (!elm) {
    throw new Error(`Expected ${riotComponentWrapper.name} element to have been created`);
}

document.querySelector("body")?.append(elm)

riot.component(riotComponentWrapper)(elm, props);
