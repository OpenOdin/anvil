import {
    riot,
    stateController,
    router,
} from "../../includes";

const openOdin = {
    isAuthed: () => false,
    isPendingAuth: () => false,
    onOpen: () => undefined,
    offOpen: () => undefined,
};

import AnvilAuth from "./anvil-auth.riot"

let entryComponent;

router.pushURL("/#/");

router.onUpdate( () => setImmediate( () => entryComponent?.update() ) );

const elm = document.createElement("anvil-auth");

document.querySelector("body").append(elm)

entryComponent = riot.component(AnvilAuth)(elm, {
    openOdin,
    defaultUrl: "/app-test.json",
    route: {
        args: [""],
    }
});
