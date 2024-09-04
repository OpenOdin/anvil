import {
    riot,
} from "./globals";

import Raw from "./helpers/raw.riot";
riot.register("raw", Raw);

import Page404 from "./components/page-404";
riot.register("page-404", Page404);

import AnvilWaiting from "./components/anvil-waiting/anvil-waiting.riot";
riot.register("anvil-waiting", AnvilWaiting);

import AnvilMain from "./components/anvil-main/anvil-main.riot";
riot.register("anvil-main", AnvilMain);

import AnvilProjects from "./components/anvil-projects/anvil-projects.riot";
riot.register("anvil-projects", AnvilProjects);

import AnvilEdit from "./components/anvil-edit/anvil-edit.riot";
riot.register("anvil-edit", AnvilEdit);

import AnvilThreads from "./components/anvil-threads/anvil-threads.riot";
riot.register("anvil-threads", AnvilThreads);

import ModalOpenThread from "./components/modal-open-thread";
riot.register("modal-open-thread", ModalOpenThread);

import AnvilTab from "./components/anvil-tab/anvil-tab.riot";
riot.register("anvil-tab", AnvilTab);

import AnvilThreadTabular from "./components/anvil-thread-tabular/anvil-thread-tabular.riot";
riot.register("anvil-thread-tabular", AnvilThreadTabular);

import AnvilThreadPostModal from "./components/anvil-thread-tabular/anvil-threadpost-modal/anvil-threadpost-modal.riot";
riot.register("anvil-threadpost-modal", AnvilThreadPostModal);

import "./index.css";

export {
    riot,
};
