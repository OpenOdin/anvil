import {
    riot,
} from "../../includes";

import {
    stateController,
} from "riotjs-simple-state";

stateController.create("editState", {appConf: {}, isSaved:true});

import AnvilEdit from "./anvil-edit.riot"

const elm = document.createElement("anvil-edit");
document.querySelector("body").append(elm)
riot.component(AnvilEdit)(elm, {});
