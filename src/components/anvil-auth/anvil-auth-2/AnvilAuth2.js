"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnvilAuth2 = void 0;
const assert_1 = __importDefault(require("assert"));
const riotjs_simple_typescript_1 = require("riotjs-simple-typescript");
class AnvilAuth2 extends riotjs_simple_typescript_1.Base {
    constructor() {
        super(...arguments);
        this.onchange = () => {
            this.state.isEdited = true;
            this.update();
        };
        this.save = () => {
            (0, assert_1.default)(this.authState, "Expected authState to be loaded");
            const value = this.$("#app-storage").value;
            try {
                this.authState.appJSON = JSON.parse(value);
                this.stateController.publish("auth", this.authState);
            }
            catch (e) {
                alert("Error in JSON");
                return;
            }
            this.state.isEdited = false;
            this.update();
        };
        this.discard = () => {
            this.state.isEdited = false;
            this.resetUI();
            this.update();
        };
    }
    onBeforeMount(props, state) {
        state.isEdited = false;
    }
    onMounted(props, state) {
        this.stateController.load("auth").then((authState) => {
            this.authState = authState;
            this.update();
            this.resetUI();
        });
    }
    resetUI() {
        (0, assert_1.default)(this.authState, "Expected authState to be loaded");
        if (this.authState.appJSON) {
            const storageJSON = JSON.stringify(this.authState.appJSON ?? {}, null, 4);
            (this.$("#app-storage") ?? {}).value = storageJSON;
        }
    }
    onBeforeUpdate(props, state) {
        if (this.authState) {
            if (!this.authState.appJSON) {
                this.router.pushRoute("auth1");
            }
        }
    }
}
exports.AnvilAuth2 = AnvilAuth2;
