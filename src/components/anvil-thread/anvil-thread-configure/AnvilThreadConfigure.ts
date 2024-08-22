import {
    Base,
} from "riotjs-simple-typescript";

import {
    ThreadTemplate,
    ThreadFetchParams,
} from "openodin";

import {
    AnvilThreadController,
} from "../../../lib/AnvilThreadController";

export interface AnvilThreadConfigureProps {
    controller: AnvilThreadController,
}

export interface AnvilThreadConfigureState {
    hasChanged: boolean;

    parse: {
        success?: string,
        error?: string,
    };

    hasParamsChanged: boolean;

    parseParams: {
        success?: string,
        error?: string,
    };
}

export class AnvilThreadConfigure extends Base<AnvilThreadConfigureProps, AnvilThreadConfigureState> {
    public onBeforeMount(props: AnvilThreadConfigureProps, state: AnvilThreadConfigureState) {
        this.state = {
            hasChanged: false,
            parse: {
                success: "",
                error: "",
            },
            hasParamsChanged: false,
            parseParams: {
                success: "",
                error: "",
            },
        };

        props.controller.onUpdate( () => this.update() );
    }

    public onMounted(props: AnvilThreadConfigureProps, state: AnvilThreadConfigureState) {
        const json = props.controller.getTemplateJSON();
        (this.$("#threadjson") as HTMLInputElement).value = json;

        const json2 = props.controller.getFetchParamsJSON();
        (this.$("#paramsjson") as HTMLInputElement).value = json2;
    }

    public parse = (): ThreadTemplate | undefined => {
        const template = (this.$("#threadjson") as HTMLInputElement).value;

        let res;
        try {
            res = this.props.controller.parseTemplate(template);
        }
        catch(e) {
            this.update({parse: {error: (e as Error).message, success: ""}});

            return undefined;
        }

        const [threadTemplate, error] = res;

        if (!threadTemplate) {
            this.update({parse: {error, success: ""}});
            return undefined;
        }

        this.update({parse: {error: "", success: "Parse OK"}});

        return threadTemplate;
    }

    public reset = () => {
        this.props.controller.resetTemplate();

        const json = this.props.controller.getTemplateJSON();

        (this.$("#threadjson") as HTMLInputElement).value = json;

        this.update({parse: {error: "", success: "Reset to original"}, hasChanged: false});
    }

    public save = () => {
        const template = this.parse();

        if (template) {
            // We save the raw JSON object, not the parsed object.
            //
            const json = (this.$("#threadjson") as HTMLInputElement).value;
            const obj = JSON.parse(json);
            this.props.controller.saveTemplate(obj);

            this.update({parse: {error: "", success: "Saved"}, hasChanged: false});
        }
    }

    public setName = (e: any) => {
        const name = e.target.value || "unknown";

        this.props.controller.setName(name);

        this.update();
    }

    public parseParams = (): ThreadFetchParams | undefined => {
        const template = (this.$("#paramsjson") as HTMLInputElement).value;

        let res;
        try {
            res = this.props.controller.parseFetchParams(template);
        }
        catch(e) {
            this.update({parseParams: {error: (e as Error).message, success: ""}});

            return undefined;
        }

        const [threadParams, error] = res;

        if (!threadParams) {
            this.update({parseParams: {error, success: ""}});
            return undefined;
        }

        this.update({parseParams: {error: "", success: "Parse OK"}});

        return threadParams;
    }

    public resetParams = () => {
        this.props.controller.resetParams();

        const json = this.props.controller.getFetchParamsJSON();

        (this.$("#paramsjson") as HTMLInputElement).value = json;

        this.update({parseParams: {error: "", success: "Reset to original"}, hasParamsChanged: false});
    }

    public saveParams = () => {
        const template = this.parseParams();

        if (template) {
            // We save the raw JSON object, not the parsed object.
            //
            const json = (this.$("#paramsjson") as HTMLInputElement).value;
            const obj = JSON.parse(json);
            this.props.controller.saveParams(obj);

            this.update({parseParams: {error: "", success: "Saved"}, hasParamsChanged: false});
        }
    }
}
