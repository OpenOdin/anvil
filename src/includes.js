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

import AnvilProjects from "./components/anvil-projects/anvil-projects.riot";
riot.register("anvil-projects", AnvilProjects);

import ProjectEdit from "./components/project-edit";
riot.register("project-edit", ProjectEdit);

import ProjectExplore from "./components/project-explore";
riot.register("project-explore", ProjectExplore);

import ModalOpenThread from "./components/modal-open-thread";
riot.register("modal-open-thread", ModalOpenThread);

import AnvilTab from "./components/anvil-tab/anvil-tab.riot";
riot.register("anvil-tab", AnvilTab);

import AnvilThreadTabular from "./components/anvil-thread-tabular/anvil-thread-tabular.riot";
riot.register("anvil-thread-tabular", AnvilThreadTabular);

import ModalThreadPost from "./components/modal-thread-post";
riot.register("modal-thread-post", ModalThreadPost);

import "./index.css";

export {
    riot,
};
