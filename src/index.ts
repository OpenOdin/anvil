import "./globals";

import "./includes";

import {
    riot,
} from "riotjs-simple-typescript";

import {
    router,
} from "riotjs-simple-router";

router.onFallback( url => {
    console.error("ERROR could not navigate to", url);

    return undefined;
});

//@ts-expect-error no typings
import riotComponentWrapper from "./components/anvil-app";

if (!riotComponentWrapper.name) {
    throw new Error("Expected RiotComponentWrapper.name to be set");
}

const elm = document.createElement(riotComponentWrapper.name);

if (!elm) {
    throw new Error(`Expected ${riotComponentWrapper.name} element to have been created`);
}

document.querySelector("body")?.append(elm)

const entryComponent = riot.component(riotComponentWrapper)(elm);

router.onUpdate( () => setImmediate( () => entryComponent?.update() ) );
