import {
    riot,
} from "./globals";

import UtilRaw from "./components/util-raw";
riot.register("util-raw", UtilRaw);

import Page404 from "./components/page-404";
riot.register("page-404", Page404);

import ProjectWindow from "./components/project-window";
riot.register("project-window", ProjectWindow);

import ProjectOpen from "./components/project-open";
riot.register("project-open", ProjectOpen);

import ProjectEdit from "./components/project-edit";
riot.register("project-edit", ProjectEdit);

import ProjectExplore from "./components/project-explore";
riot.register("project-explore", ProjectExplore);

import ModalOpenThread from "./components/modal-open-thread";
riot.register("modal-open-thread", ModalOpenThread);

import UtilTab from "./components/util-tab";
riot.register("util-tab", UtilTab);

import ThreadTable from "./components/thread-table";
riot.register("thread-table", ThreadTable);

import ModalThreadPost from "./components/modal-thread-post";
riot.register("modal-thread-post", ModalThreadPost);

import "./index.css";

export {
    riot,
};
