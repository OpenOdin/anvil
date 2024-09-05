import {
    riot,
} from "../../globals";

import {
    stateController,
} from "riotjs-simple-state";

import "../../index.css";

stateController.create("editState", {appConf: {}, isSaved:true});

import ProjectEdit from "./project-edit.riot"

const elm = document.createElement("project-edit");
document.querySelector("body").append(elm)
riot.component(ProjectEdit)(elm, {});
