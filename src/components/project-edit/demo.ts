import "../../globals";

import {
    riot,
} from "riotjs-simple-typescript";

import {
    stateController,
} from "riotjs-simple-state";

stateController.create("editState", {appConf: {}, isSaved:true});

//@ts-expect-error no typings
import riotComponentWrapper from "./project-edit.riot"

if (!riotComponentWrapper.name) {
    throw new Error("Expected RiotComponentWrapper.name to be set");
}

const elm = document.createElement(riotComponentWrapper.name);

if (!elm) {
    throw new Error(`Expected ${riotComponentWrapper.name} element to have been created`);
}

document.querySelector("body")?.append(elm)

riot.component(riotComponentWrapper)(elm);
