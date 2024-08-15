import {
    riot,
    router,
} from "./includes";

router.onFallback( url => {
    console.error("ERROR could not navigate to", url);
});

let mainComponent;

router.onUpdate( () => mainComponent?.update() );

import Anvil from "./components/anvil/anvil.riot"

const elm = document.createElement("anvil");
document.querySelector("body").append(elm)
mainComponent = riot.component(Anvil)(elm);
