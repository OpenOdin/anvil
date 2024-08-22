import {
    Service,
} from "openodin";

export class ServiceWrapper {
    protected peersConnected: number = 0;
    protected storageConnected: boolean = false;
    protected handlers: {[name: string]: ( (...args: any) => void)[]} = {};

    constructor(protected service: Service) {
        service.onStorageConnect( () => {
            console.info("Connected to storage");

            this.update();
        });

        service.onStorageClose( () => {
            console.info("Disconnected from storage");

            this.update();
        });

        service.onStorageParseError( (error) => {
            console.error("Could not parse storage configuraton", error.message);
        });

        service.onPeerConnect( (p2pClient) => {
            this.peersConnected++;

            const pubKey = p2pClient.getRemotePublicKey();
            console.info(`Peer connected: ${pubKey.toString("hex")}`);

            p2pClient.onMessagingError( (message) => {
                console.error("Error in peer", message);
            });

            p2pClient.onMessagingPong( (roundTripTime) => {
                // TODO: show this round trip value in the UI instead of in the console.
                //console.info("Ping/pong round trip time [ms]", roundTripTime);
            });

            this.update();
        });

        service.onPeerClose( (p2pClient) => {
            this.peersConnected--;

            const pubKey = p2pClient.getRemotePublicKey();
            console.info(`Peer disconnected: ${pubKey.toString("hex")}`);

            this.update();
        });

        service.onPeerAuthCertError( (error, authCert) => {
            console.error("Peer's auth cert not valid");
        });

        service.onPeerParseError( (error) => {
            console.error("Could not parse peer configuraton", error.message);
        });

        service.onPeerFactoryCreate( (handshakeFactory) => {
            handshakeFactory.onSocketFactoryError( (name, error) => {
                console.error("Socket error", name, error.message);
            });

            handshakeFactory.onHandshakeError( (error) => {
                console.error("Handshake error", error.message);
            });
        });

        service.onStop( () => {
            this.update();
        });
    }

    protected update() {
        this.triggerEvent("update");
    }

    public onUpdate(cb: () => void) {
        this.hookEvent("update", cb);
    }

    public offUpdate(cb: () => void) {
        this.unhookEvent("update", cb);
    }

    public isRunning(): boolean {
        return this.service.isRunning();
    }

    public isStorageConnected(): boolean {
        return this.service.isConnected();
    }

    public getConnectedPeers(): number {
        return 0;
    }

    public getMaxPeers(): number {
        return 0;
    }
    protected hookEvent(name: string, callback: (...args: any[]) => void) {
        const cbs = this.handlers[name] || [];
        this.handlers[name] = cbs;
        cbs.push(callback);
    }

    protected unhookEvent(name: string, callback: (...args: any[]) => void) {
        const cbs = (this.handlers[name] || []).filter( (cb: ( (...args: any) => void)) => callback !== cb );
        this.handlers[name] = cbs;
    }

    protected triggerEvent(name: string, ...args: any[]) {
        const cbs = this.handlers[name] || [];
        cbs.forEach( (callback: ( (...args: any[]) => void)) => {
            setImmediate( () => callback(...args) );
        });
    }
}
