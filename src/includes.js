import "setimmediate";
import {StateController} from "riotjs-simple-state";
import {Router} from "riotjs-simple-router";
import * as riot from "riot";

import Raw from "./helpers/raw.riot";
riot.register("raw", Raw);

import Anvil404 from "./components/anvil-404/anvil-404.riot";
riot.register("anvil-404", Anvil404);

import AnvilMain from "./components/anvil-main/anvil-main.riot";
riot.register("anvil-main", AnvilMain);

import AnvilAuth from "./components/anvil-auth/anvil-auth.riot";
riot.register("anvil-auth", AnvilAuth);

import AnvilAuth1 from "./components/anvil-auth/anvil-auth-1/anvil-auth-1.riot";
riot.register("anvil-auth-1", AnvilAuth1);

import AnvilAuth2 from "./components/anvil-auth/anvil-auth-2/anvil-auth-2.riot";
riot.register("anvil-auth-2", AnvilAuth2);

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
