"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnvilAuth3 = void 0;
const assert_1 = __importDefault(require("assert"));
const riotjs_simple_typescript_1 = require("riotjs-simple-typescript");
const openodin_1 = require("openodin");
class AnvilAuth3 extends riotjs_simple_typescript_1.Base {
    constructor() {
        super(...arguments);
        this.handleOpen = () => {
            const appJSON = this.authState?.appJSON;
            (0, assert_1.default)(appJSON, "Expected appJSON to be set");
            const openOdin = this.stateController.ref.openOdin;
            (0, assert_1.default)(openOdin, "Expected openOdin to be set");
            const appConf = openodin_1.OpenOdin.ParseAppConf(appJSON);
            if (openOdin.isPendingAuth() || openOdin.isClosed()) {
                return;
            }
            openOdin.auth(appConf);
        };
    }
    onBeforeMount(props, state) {
        this.stateController.ref.openOdin?.onOpen(this.handleOpen);
    }
    onMounted(props, state) {
        this.stateController.load("auth").then((authState) => {
            this.authState = authState;
            this.update();
        });
    }
    onBeforeUpdate(props, state) {
        if (this.authState) {
            if (!this.authState.appJSON) {
                this.router.pushRoute("auth1");
            }
        }
    }
    onUnmounted(props, state) {
        this.stateController.ref.openOdin?.offOpen(this.handleOpen);
    }
}
exports.AnvilAuth3 = AnvilAuth3;
