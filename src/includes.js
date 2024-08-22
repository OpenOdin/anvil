import "setimmediate";
import {StateController} from "riotjs-simple-state";
import {Router} from "riotjs-simple-router";
import * as riot from "riot";

import Raw from "./helpers/raw.riot";
riot.register("raw", Raw);

import Anvil404 from "./components/anvil-404/anvil-404.riot";
riot.register("anvil-404", Anvil404);

import AnvilWaiting from "./components/anvil-waiting/anvil-waiting.riot";
riot.register("anvil-waiting", AnvilWaiting);

import AnvilMain from "./components/anvil-main/anvil-main.riot";
riot.register("anvil-main", AnvilMain);

import AnvilAuth from "./components/anvil-auth/anvil-auth.riot";
riot.register("anvil-auth", AnvilAuth);

import AnvilAuth1 from "./components/anvil-auth/anvil-auth-1/anvil-auth-1.riot";
riot.register("anvil-auth-1", AnvilAuth1);

import AnvilAuth2 from "./components/anvil-auth/anvil-auth-2/anvil-auth-2.riot";
riot.register("anvil-auth-2", AnvilAuth2);

import AnvilAuth3 from "./components/anvil-auth/anvil-auth-3/anvil-auth-3.riot";
riot.register("anvil-auth-3", AnvilAuth3);

import AnvilData from "./components/anvil-data/anvil-data.riot";
riot.register("anvil-data", AnvilData);

import AnvilTab from "./components/anvil-tab/anvil-tab.riot";
riot.register("anvil-tab", AnvilTab);

import AnvilThread from "./components/anvil-thread/anvil-thread.riot";
riot.register("anvil-thread", AnvilThread);

import AnvilThreadConfigure from "./components/anvil-thread/anvil-thread-configure/anvil-thread-configure.riot";
riot.register("anvil-thread-configure", AnvilThreadConfigure);

import AnvilThreadTabular from "./components/anvil-thread/anvil-thread-tabular/anvil-thread-tabular.riot";
riot.register("anvil-thread-tabular", AnvilThreadTabular);

import "./index.css";

import { minidenticon } from 'minidenticons'
minidenticon();  // Need to call minidenticon to activate it.

const router = new Router(window);

const stateController = new StateController();

riot.install(function(c) {
    c.router = router;
    c.stateController = stateController;
});

export {
    riot,
    stateController,
    router,
};
