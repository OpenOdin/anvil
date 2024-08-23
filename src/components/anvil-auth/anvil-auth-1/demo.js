import {
    riot,
} from "../../../includes";

import {
    stateController,
} from "riotjs-simple-state";

stateController.create("auth");

const openOdin = {
    isAuthed: () => false,
    isPendingAuth: () => false,
    isClosed: () => false,
    onOpen: () => undefined,
    offOpen: () => undefined,
};

import AnvilAuth1 from "./anvil-auth-1.riot"

const elm = document.createElement("anvil-auth-1");
document.querySelector("body").append(elm)
riot.component(AnvilAuth1)(elm, {openOdin, defaultUrl: "/app-test.json"});
