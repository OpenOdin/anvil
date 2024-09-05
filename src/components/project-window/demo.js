/**
 * To demo ProjectWindow we need to create and init a Service instance.
 */
import {
    riot,
} from "../../includes";

import {
    router,
} from "riotjs-simple-router";

import {
    stateController,
} from "riotjs-simple-state";

import {
    AuthFactory,
    SignatureOffloader,
    Service,
    ParseUtil,
} from "openodin";

import ProjectWindow from "./project-window.riot"

const appConfRaw = require("./demo-resources/appConf.json");
const appConf = ParseUtil.ParseApplicationConf(appConfRaw);
const walletConf = ParseUtil.ParseWalletConf(require("./demo-resources/wallet.json"));

async function main() {
    const handshakeFactoryFactory = new AuthFactory(walletConf.keyPairs[0]);

    const signatureOffloader = new SignatureOffloader();

    await signatureOffloader.init();

    const service = new Service(appConf, walletConf, signatureOffloader, handshakeFactoryFactory);

    await service.init();

    let entryComponent;

    router.onUpdate( () => setImmediate( () => entryComponent?.update() ) );

    const elm = document.createElement("project-window");

    document.querySelector("body").append(elm)

    // Change these values to effect the state of the component
    //
    const openOdin = {
        isAuthed: () => true,
        isPendingAuth: () => false,
        isClosed: () => false,
        onOpen: () => undefined,
        offOpen: () => undefined,
        close: () => undefined,
    };

    const props = {
        openOdin,
        service,
    };

    stateController.create("editState", {appConf: appConfRaw, isSaved:true});

    entryComponent = riot.component(ProjectWindow)(elm, props);
}

main();
