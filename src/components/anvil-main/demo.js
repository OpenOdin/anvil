/**
 * To demo AnvilMain we need to create and init a Service instance.
 */
import {
    riot,
    stateController,
    router,
} from "../../includes";

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

    const props = {
        service,

        route: {
            args: [""],
        }
    };

    entryComponent = riot.component(AnvilMain)(elm, props);
}

main();
