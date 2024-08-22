import {
    Base,
} from "riotjs-simple-typescript";

import {
    Routes,
    RouteParams,
} from "riotjs-simple-router";

import {
    Service,
} from "openodin";

import {
    ServiceWrapper,
} from "../../lib/ServiceWrapper";

export interface AnvilMainProps {
    route: RouteParams,
    service: Service,
}

export interface AnvilMainState {
    serviceWrapper: ServiceWrapper,
}

export class AnvilMain extends Base<AnvilMainProps, AnvilMainState> {
    protected routes: Routes = {};

    public logout = (e: any) => {
        e.preventDefault();

        this.stateController.ref.openOdin?.close();
    }

    public onBeforeMount(props: AnvilMainProps, state: AnvilMainState) {
        state.serviceWrapper = new ServiceWrapper(props.service);

        state.serviceWrapper.onUpdate( () => this.update() );

        props.service.start();

        const base = props.route.args[0];

        this.routes = {
            welcome: {
                match: "^/$",

                pushURL: `/#${base}/`,

                base,

                subGroup: "main",
            },
            data: {
                match: "^/data/.*$",

                pushURL: "/#/data/",

                base,

                subGroup: "main",
            },
        };

        this.router.register(this.routes);
    }

    /**
     * @returns public key as hex-string
     */
    public getPublicKey(): string {
        return this.props.service.getPublicKey().toString("hex");
    }

    public onUnmounted(props: AnvilMainProps, state: AnvilMainState) {
        this.router.unregister(this.routes);
    }
}
