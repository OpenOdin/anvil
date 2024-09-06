import assert from "assert";

import {
    RiotBase,
} from "riotjs-simple-typescript";

import {
    ThreadWrapper,
} from "../../lib/ThreadWrapper";

import {
    ModalThreadPost,
} from "../modal-thread-post/ModalThreadPost";

import {
    DataInterface,
    ThreadFetchParams,
    ThreadDataParams,
} from "openodin";

type Row = {
    index: number,
    isExpanded: boolean,
    isChecked: boolean,
    columns: {[name: string]: {
        display: string | undefined,
        value: string | number | undefined,
    }},
    item: {
        node: DataInterface,
    },
};

export interface ThreadTableProps {
    threadWrapper: ThreadWrapper,
}

export interface ThreadTableState {
    nodes: DataInterface[];
    length: number;
    pages: number;
    page: number;
    rowsPerPage: number;
    rowCache: {[id1: string]: Row};
    rows: Row[];
    autoUpdate: boolean;
    error?: string;
    headers: Array<{
        name: string,
        display: string,
        isChecked: boolean,
    }>;

    hasParamsChanged: boolean;

    parseParams: {
        success?: string,
        error?: string,
    };
}

export class ThreadTable extends RiotBase<ThreadTableProps, ThreadTableState> {
    public onBeforeMount(props: ThreadTableProps, state: ThreadTableState) {
        state.headers = [
            {name: "id1", display: "id1", isChecked: true},
            {name: "id2", display: "id2", isChecked: false},
            {name: "creationTime", display: "creationTime", isChecked: true},
        ];

        state.rows = [];
        state.rowsPerPage = 10;
        state.page = 0;
        state.pages = 0;
        state.length = 0;
        state.rowCache = {}; // {[id1: string]: Row}
        state.nodes = [];
        state.autoUpdate = true;
        state.parseParams = {};

        props.threadWrapper.onChange( () => {
            if (this.state.autoUpdate) {
                this.refreshNodes();
            }
        });

        props.threadWrapper.onUpdate(() => {
            this.update();
        });
    }

    public onMounted(props: ThreadTableProps, state: ThreadTableState) {
        const json2 = props.threadWrapper.getFetchParamsJSON();
        (this.$("#paramsjson") as HTMLInputElement).value = json2;
    }

    public run = () => {
        const ret = this.props.threadWrapper.start();

        if (ret[0]) {
            this.update({error: ""});

            console.log("FetchRequest", ret[2]);
        }
        else {
            this.update({error: ret[1]});
        }
    }

    public close = () => {
        this.props.threadWrapper.close();
        this.update();
    }

    public action = () => {
        // TODO
    }

    public post(name: string) {
        const thread = this.props.threadWrapper.getThread();

        assert(thread, "Expected thred to have been started");

        const done = async (threadDataParams: ThreadDataParams | undefined) => {
            console.log("threadDataParams", threadDataParams);

            if (!threadDataParams) {
                return;
            }

            const node = await thread.post(name, threadDataParams);

            console.log("node created", node);

            if (node.isLicensed() && node.getLicenseMinDistance() === 0) {
                // TODO spawn modal about license

                const service = this.props.threadWrapper.getService();

                const targets: Buffer[] = [service.getPublicKey()];

                await thread.postLicense("message", node, { targets });
            }
        };

        const threadDataParams = this.props.threadWrapper.getPostTemplate(name);

        ModalThreadPost.open({name, threadDataParams}).then( done );
    }

    public setAutoUpdate = (checked: boolean) => {
        this.state.autoUpdate = checked;

        if (this.state.autoUpdate) {
            this.refreshNodes();
        }
    }

    protected refreshNodes() {
        this.fetchNodes();
        this.updateRows();
        this.update();
    }

    public onBeforeUpdate(props: ThreadTableProps, state: ThreadTableState) {
        //if (state.autoUpdate && props.controller.isClosed()) {
            //this.fetchNodes();
            //this.updateRows();
        //}
    }

    public onUpdated(props: ThreadTableProps, state: ThreadTableState) {
        // We need to explicitly update the value because browsers remember checkbox values.
        //
        this.$$("input.rowcheckbox").forEach( elm => {
            const id1Str = (elm as HTMLInputElement).value;
            (elm as HTMLInputElement).checked = state.rowCache[id1Str]?.isChecked;
        });
    }

    protected fetchNodes() {
        // Cache current view of nodes.
        //
        this.state.nodes = this.props.threadWrapper.getItems().map(item => item.node);
    }

    protected updateRows() {
        this.state.length = this.state.nodes.length;
        this.state.pages = Math.ceil(this.state.length / this.state.rowsPerPage);

        this.state.page = Math.min(this.state.page, this.state.pages - 1);
        this.state.page = Math.max(0, this.state.page);

        const startIndex = this.state.page * this.state.rowsPerPage;

        const nodes = this.state.nodes.slice(startIndex, startIndex + this.state.rowsPerPage);

        const rows = nodes.map( (node, index) => {
            const idStr = node.getId()?.toString("hex");
            const id1Str = node.getId1()?.toString("hex");
            const id2Str = node.getId2()?.toString("hex");

            assert(idStr);
            assert(id1Str);

            let row = this.state.rowCache[id1Str];

            if (!row) {
                const columns = {
                    id: {
                        display: idStr,
                        value: idStr,
                    },
                    id1: {
                        display: id1Str,
                        value: id1Str,
                    },
                    id2: {
                        display: id2Str,
                        value: id2Str,
                    },
                    creationTime: {
                        display: (node.getCreationTime() ?? 0).toString(),
                        value: node.getCreationTime() ?? 0,
                    },
                };

                row = {
                    index: -1,
                    isExpanded: false,
                    isChecked: false,
                    columns,
                    item: {
                        node,
                    },
                };

                this.state.rowCache[id1Str] = row;
            }

            row.index = index + startIndex;

            return row;
        });

        this.state.rows = rows;
    }

    public expand = (row: Row) => {
        row.isExpanded = true;

        this.update();
    }

    public collapse = (row: Row) => {
        row.isExpanded = false;

        this.update();
    }

    public firstPage = () => {
        this.state.page = 0;
        this.updateRows();
        this.update();
    }

    public prevPage = () => {
        this.state.page--;
        this.updateRows();
        this.update();
    }

    public nextPage = () => {
        this.state.page++;
        this.updateRows();
        this.update();
    }

    public lastPage = () => {
        this.state.page = this.state.pages - 1;
        this.updateRows();
        this.update();
    }

    public setRowsPerPage = (value: number) => {
        this.state.rowsPerPage = value || 10;
        this.updateRows();
        this.update();
    }

    public toggleAltered() {
        // Signal altered state
        //
        const isChecked = (this.$(".toggleAllCheckbox") as HTMLInputElement).checked;

        if (isChecked) {
            (this.$(".toggleAllCheckbox") as HTMLInputElement).indeterminate = true;
        }
    }

    public toggleSelectAll = (isChecked: boolean) => {
        (this.$(".toggleAllCheckbox") as HTMLInputElement).indeterminate = false;

        Object.values(this.state.rowCache).forEach( row => row.isChecked = isChecked );

        this.update();
    }

    public parseParams = (): ThreadFetchParams | undefined => {
        const template = (this.$("#paramsjson") as HTMLInputElement).value;

        let res;
        try {
            res = this.props.threadWrapper.parseFetchParams(template);
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
        this.props.threadWrapper.resetParams();

        const json = this.props.threadWrapper.getFetchParamsJSON();

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
            this.props.threadWrapper.saveParams(obj);

            this.update({parseParams: {error: "", success: "Saved"}, hasParamsChanged: false});
        }
    }
}
