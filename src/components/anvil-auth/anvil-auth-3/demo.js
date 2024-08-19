import {
    riot,
    stateController,
} from "../../../includes";

stateController.create("auth", {appJSON: {a:123}});

// Change these values to effect the state of the component
//
stateController.ref.openOdin = {
    isAuthed: () => false,
    isPendingAuth: () => false,
    isClosed: () => false,
    onOpen: () => false,
    offOpen: () => false,
};

import AnvilAuth3 from "./anvil-auth-3.riot"

const elm = document.createElement("anvil-auth-3");
document.querySelector("body").append(elm)
riot.component(AnvilAuth3)(elm, {});
