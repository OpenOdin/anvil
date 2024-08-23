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

import AnvilAuth2 from "./anvil-auth-2.riot"

const elm = document.createElement("anvil-auth-2");
document.querySelector("body").append(elm)
riot.component(AnvilAuth2)(elm, {openOdin});
