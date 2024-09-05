import {
    riot,
} from "./includes";

import {
    router,
} from "riotjs-simple-router";

router.onFallback( url => {
    console.error("ERROR could not navigate to", url);
});

let entryComponent;

router.onUpdate( () => setImmediate( () => entryComponent?.update() ) );

import AnvilApp from "./components/anvil-app"

const elm = document.createElement("anvil");
document.querySelector("body").append(elm)
entryComponent = riot.component(AnvilApp)(elm);
