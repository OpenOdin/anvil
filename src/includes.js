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

import AnvilData from "./components/anvil-data/anvil-data.riot";
riot.register("anvil-data", AnvilData);

import AnvilOpenthreadModal from "./components/anvil-data/anvil-openthread-modal/anvil-openthread-modal.riot";
riot.register("anvil-openthread-modal", AnvilOpenthreadModal);
console.log("register modal", AnvilOpenthreadModal);

import AnvilTab from "./components/anvil-tab/anvil-tab.riot";
riot.register("anvil-tab", AnvilTab);

import AnvilThreadTabular from "./components/anvil-thread-tabular/anvil-thread-tabular.riot";
riot.register("anvil-thread-tabular", AnvilThreadTabular);

import "./index.css";

export {
    riot,
};
