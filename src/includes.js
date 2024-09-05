import {
    riot,
} from "./globals";

import Raw from "./helpers/raw.riot";
riot.register("raw", Raw);

import Page404 from "./components/page-404";
riot.register("page-404", Page404);

import AnvilWaiting from "./components/anvil-waiting/anvil-waiting.riot";
riot.register("anvil-waiting", AnvilWaiting);

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

import AnvilTab from "./components/anvil-tab/anvil-tab.riot";
riot.register("anvil-tab", AnvilTab);

import ThreadTable from "./components/thread-table";
riot.register("thread-table", ThreadTable);

import ModalThreadPost from "./components/modal-thread-post";
riot.register("modal-thread-post", ModalThreadPost);

import "./index.css";

export {
    riot,
};
