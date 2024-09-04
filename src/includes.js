import {
    riot,
} from "./globals";

import Raw from "./helpers/raw.riot";
riot.register("raw", Raw);

import Anvil404 from "./components/anvil-404/anvil-404.riot";
riot.register("anvil-404", Anvil404);

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

import AnvilOpenthreadModal from "./components/anvil-threads/anvil-openthread-modal/anvil-openthread-modal.riot";
riot.register("anvil-openthread-modal", AnvilOpenthreadModal);

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
