import "../../globals";

import {
    riot,
} from "riotjs-simple-typescript";

//@ts-expect-error no typings
import riotComponentWrapper from "./page-404.riot"

if (!riotComponentWrapper.name) {
    throw new Error("Expected RiotComponentWrapper.name to be set");
}

const elm = document.createElement(riotComponentWrapper.name);

if (!elm) {
    throw new Error(`Expected ${riotComponentWrapper.name} element to have been created`);
}

document.querySelector("body")?.append(elm)

riot.component(riotComponentWrapper)(elm);
