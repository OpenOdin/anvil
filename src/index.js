import {
    riot,
    router,
} from "./includes";

router.onFallback( url => {
    console.error("ERROR could not navigate to", url);
});

let entryComponent;

router.onUpdate( () => entryComponent?.update() );

import Anvil from "./components/anvil/anvil.riot"

const elm = document.createElement("anvil");
document.querySelector("body").append(elm)
entryComponent = riot.component(Anvil)(elm);
