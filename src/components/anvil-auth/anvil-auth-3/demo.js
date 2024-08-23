import {
    riot,
    stateController,
} from "../../../includes";

stateController.create("auth", {appJSON: {a:123}});

// Change these values to effect the state of the component
//
const openOdin = {
    isAuthed: () => false,
    isPendingAuth: () => false,
    isClosed: () => false,
    onOpen: () => undefined,
    offOpen: () => undefined,
};

import AnvilAuth3 from "./anvil-auth-3.riot"

const elm = document.createElement("anvil-auth-3");
document.querySelector("body").append(elm)
riot.component(AnvilAuth3)(elm, {openOdin});
