import {
    riot,
    stateController,
    router,
} from "../../includes";

import AnvilAuth from "./anvil-auth.riot"

let entryComponent;

router.onUpdate( () => entryComponent?.update() );

const elm = document.createElement("anvil-auth");

document.querySelector("body").append(elm)

entryComponent = riot.component(AnvilAuth)(elm, {
    defaultUrl: "/app-test.json",
    route: {
        args: ["/auth"],
    }
});
