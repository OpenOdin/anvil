import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    Routes,
    router,
} from "riotjs-simple-router";

import {
    Service,
} from "openodin";

import {
    ServiceWrapper,
} from "../../lib/ServiceWrapper";

import {
    OpenOdin,
} from "openodin";

export interface ProjectWindowProps {
    // set when authed
    //
    service?: Service;

    openOdin: OpenOdin;
}

export interface ProjectWindowState {
    service?: Service;
    serviceWrapper?: ServiceWrapper;
}

function Intersection(a: string[], b: string[]): string[] {
    const o: {[key: string]: boolean} = {};
    a.forEach( key => o[key] = true );
    return b.filter( key => o[key] );
}

export class ProjectWindow extends RiotBase<ProjectWindowProps, ProjectWindowState> {
    // Place router here so the .riot template can access it.
    //
    protected router = router;

    protected routes: Routes = {};

    public logout = (e: any) => {
        e.preventDefault();

        this.props.openOdin.close();
    }

    public onBeforeUpdate(props: ProjectWindowProps, state: ProjectWindowState) {

        // If the Service object has been set/reset
        //
        if (props.service !== state.service) {
            state.service = props.service;

            if (!state.service) {
                delete state.serviceWrapper;
            }
            else {
                state.serviceWrapper = new ServiceWrapper(state.service);

                state.serviceWrapper.onUpdate( () => this.update() );
            }
        }
    }

    public onBeforeMount(props: ProjectWindowProps, state: ProjectWindowState) {

        // Register a preRoute function so we can check auth status
        // and redirect the flow accordingly.
        //
        router.onPreRoute((active, requireAuth) => {
            if (requireAuth && !this.props.openOdin?.isAuthed()) {
                router.replaceRoute("welcome");

                return true;
            }

            if (!this.state.service) {
                if (Intersection(Object.keys(active), ["data", "peers", "storage"]).length > 0) {
                    router.replaceRoute("edit");

                    return true;
                }
            }
        });

        this.routes = {
            welcome: {
                match: "^/$",
                pushURL: `/#/`,
            },
            help: {
                match: "^/help/.*$",
                pushURL: `/#/help/`,
            },
            edit: {
                match: "^/edit/.*$",
                pushURL: "/#/edit/",
            },
            data: {
                match: "^/data/.*$",
                pushURL: "/#/data/",
                requireAuth: true,
            },
            peers: {
                match: "^/peers/.*$",
                pushURL: "/#/peers/",
                requireAuth: true,
            },
            storage: {
                match: "^/storage/.*$",
                pushURL: "/#/storage/",
                requireAuth: true,
            },
        };

        router.register(this.routes);
    }

    public onMounted(props: ProjectWindowProps, state: ProjectWindowState) {
        // We do this to reset any existing URL.
        //
        router.pushRoute("edit");
    }

    public startService = () => {
        // TODO: hook error event on service
        if (this.state.service && !this.state.service.isRunning()) {
            // TODO display waiting modal
            this.state.service.start();

            this.update();
        }
    }

    public stopService = () => {
        if (this.state.service && this.state.service.isRunning()) {
            this.state.service.stop();

            router.pushRoute("edit");
        }
    }

    /**
     * @returns public key as hex-string
     */
    public getPublicKey(): string | undefined {
        return this.state.service?.getPublicKey().toString("hex");
    }

    public onUnmounted(props: ProjectWindowProps, state: ProjectWindowState) {
        router.reset();
    }
}
