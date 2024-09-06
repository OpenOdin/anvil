import "../../globals";

import "../../includes";

import {
    riot,
} from "riotjs-simple-typescript";

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

import {
    ProjectWindowProps,
} from "./ProjectWindow";

//@ts-expect-error no typings
import riotComponentWrapper from "./project-window.riot"

const appConfRaw = require("./demo-resources/appConf.json");
const appConf = ParseUtil.ParseApplicationConf(appConfRaw);
const walletConf = ParseUtil.ParseWalletConf(require("./demo-resources/wallet.json"));

async function main() {
    const handshakeFactoryFactory = new AuthFactory(walletConf.keyPairs[0]);

    const signatureOffloader = new SignatureOffloader();

    await signatureOffloader.init();

    const service = new Service(appConf, walletConf, signatureOffloader, handshakeFactoryFactory);

    await service.init();

    const elm = document.createElement("project-window");

    document.querySelector("body")?.append(elm)

    // Change these values to effect the state of the component
    //
    const openOdin: any = {
        isAuthed: () => true,
        isPendingAuth: () => false,
        isClosed: () => false,
        onOpen: () => undefined,
        offOpen: () => undefined,
        close: () => undefined,
    };

    const props: ProjectWindowProps = {
        openOdin,
        service,
    };

    stateController.create("editState", {appConf: appConfRaw, isSaved:true});

    const entryComponent = riot.component(riotComponentWrapper)(elm, props);

    router.onUpdate( () => setImmediate( () => entryComponent?.update() ) );
}

main();
