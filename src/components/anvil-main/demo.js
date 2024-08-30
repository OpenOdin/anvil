/**
 * To demo AnvilMain we need to create and init a Service instance.
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

import AnvilMain from "./anvil-main.riot"

const appConf = ParseUtil.ParseApplicationConf(require("./demo-resources/appConf.json"));
const walletConf = ParseUtil.ParseWalletConf(require("./demo-resources/wallet.json"));

async function main() {
    const handshakeFactoryFactory = new AuthFactory(walletConf.keyPairs[0]);

    const signatureOffloader = new SignatureOffloader();

    await signatureOffloader.init();

    const service = new Service(appConf, walletConf, signatureOffloader, handshakeFactoryFactory);

    await service.init();

    let entryComponent;

    router.onUpdate( () => setImmediate( () => entryComponent?.update() ) );

    const elm = document.createElement("anvil-main");

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

    stateController.create("editState", {appConf: {}, isSaved:true});

    entryComponent = riot.component(AnvilMain)(elm, props);
}

main();
