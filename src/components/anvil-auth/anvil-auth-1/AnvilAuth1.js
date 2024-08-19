"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnvilAuth1 = void 0;
const assert_1 = __importDefault(require("assert"));
const riotjs_simple_typescript_1 = require("riotjs-simple-typescript");
class AnvilAuth1 extends riotjs_simple_typescript_1.Base {
    constructor() {
        super(...arguments);
        this.load = async () => {
            const elm = this.$("#load-url");
            if (!elm) {
                return;
            }
            return this.loadURL(elm.value);
        };
        this.loadDefault = async () => {
            return this.loadURL(this.props.defaultUrl);
        };
        this.reset = async () => {
            (0, assert_1.default)(this.authState, "Expected authState");
            if (this.authState) {
                delete this.authState.appJSON;
                return this.stateController.publish("auth", this.authState);
            }
            this.update();
        };
    }
    onMounted(props, state) {
        this.initUI();
        this.stateController.load("auth").then((authState) => {
            this.authState = authState;
            this.update();
        });
    }
    initUI() {
        (this.$("#load-url") ?? {}).value = this.props.defaultUrl;
    }
    async loadURL(url) {
        (0, assert_1.default)(this.authState, "Expected authState");
        let appJSON;
        try {
            appJSON = await (await fetch(url)).json();
        }
        catch (e) {
            console.error(`Could not load or parse ${url} JSON config file`, e);
            return;
        }
        if (appJSON) {
            this.authState = { appJSON };
            await this.stateController.publish("auth", this.authState);
            this.update();
            this.router.pushRoute("auth2");
        }
    }
}
exports.AnvilAuth1 = AnvilAuth1;
