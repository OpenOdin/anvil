import {
    riot,
} from "../../globals";

import Page404 from "./page-404.riot"

const elm = document.createElement("page-404");
document.querySelector("body").append(elm)
riot.component(Page404)(elm);
