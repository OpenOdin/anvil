import {
    Service,
    DataInterface,
    ThreadTemplate,
    ThreadFetchParams,
    CRDTViewItem,
    ParseUtil,
    StripObject,
    DeepCopy,
    Thread,
    FetchRequest,
} from "openodin";

export class AnvilThreadController {
    protected thread?: Thread;

    protected originalThreadTemplate: Record<string, any>;
    protected originalThreadFetchParams: Record<string, any>;

    protected autoSync: boolean = true;

    protected handlers: {[name: string]: ( (...args: any) => void)[]} = {};

    protected threadFetchParams: Record<string, any> = {};

    constructor(
        protected service: Service,
        protected id: number,
        protected name: string,
        protected threadTemplate: Record<string, any>,
        threadFetchParams?: Record<string, any>,
        thread?: Thread)
    {

        if (!threadFetchParams) {
            threadFetchParams = this.calcMissingFetchParams(threadTemplate);
        }

        this.threadFetchParams = threadFetchParams;

        this.originalThreadTemplate = DeepCopy(threadTemplate);
        this.originalThreadFetchParams = DeepCopy(threadFetchParams);

        // If already existing thread is provided we hook it straight away.
        //
        if (thread) {
            this.thread = thread;
            this.hookThread();
        }
    }

    public getTemplateJSON(): string {
        return JSON.stringify(StripObject(this.threadTemplate), null, 4);
    }

    public getFetchParamsJSON(): string {
        return JSON.stringify(StripObject(this.threadFetchParams), null, 4);
    }

    public resetTemplate() {
        this.threadTemplate = DeepCopy(this.originalThreadTemplate);
    }

    public saveTemplate(threadTemplate: Record<string, any>) {
        this.threadTemplate = threadTemplate;
    }

    public saveParams(threadFetchParams: Record<string, any>) {
        this.threadFetchParams = threadFetchParams;
    }

    public resetParams() {
        this.threadFetchParams = DeepCopy(this.originalThreadFetchParams);
    }


    //public hasChanged(obj: Record<string, any>) {
        //return !DeepEquals(this.threadTemplate, obj);
    //}

    /**
     * Parse given string and return template or error.
     *
     * @returns [threadTemplate?: ThreadTemplate, error?: string, message?: string]
     *  threadTemplate is set on success, error set on error.
     */
    public parseTemplate(template: string): [ThreadTemplate?, string?] {
        let obj;

        try {
            obj = JSON.parse(template);
        }
        catch(e) {
            return [undefined, `Could not parse as JSON: ${(e as Error).message}`];
        }

        try {
            const threadTemplate = ParseUtil.ParseThread(obj);

            return [threadTemplate];
        }
        catch(e) {
            return [undefined, `Could not parse ThreadTemplate: ${(e as Error).message}`];
        }
    }

    /**
     * Parse given string and return params or error.
     * This functions also merges params with the template to see if anything is missing.
     *
     * @returns [threadFetchParams?: ThreadFetchParams, error?: string, message?: string]
     *  threadFetchParams is set on success, error and message are set on error.
     */
    public parseFetchParams(params: string): [ThreadFetchParams?, string?] {
        let obj;

        try {
            obj = JSON.parse(params);
        }
        catch(e) {
            return [undefined, `Could not parse as JSON: ${(e as Error).message}`];
        }

        try {
            const threadTemplate = ParseUtil.ParseThread(this.threadTemplate);

            const threadFetchParams = ParseUtil.ParseThreadFetchParams(obj);

            const ret = this.validateFetchRequest(threadTemplate, threadFetchParams);

            if (!ret[0]) {
                return [undefined, ret[1]];
            }

            return [threadFetchParams];
        }
        catch(e) {
            return [undefined, `Could not parse ThreadFetchParams: ${(e as Error).message}`];
        }
    }

    protected validateFetchRequest(threadTemplate: ThreadTemplate,
        threadFetchParams: ThreadFetchParams): [boolean, string?, FetchRequest?]
    {
        // Attempt to merge template with params.
        //
        const fetchRequest = Thread.GetFetchRequest(threadTemplate, threadFetchParams, true);

        if (fetchRequest.query.parentId.length !== 32 &&
            fetchRequest.query.rootNodeId1.length !== 32)
        {
            return [false, "Missing parentId or rootNodeId1"];
        }

        if (fetchRequest.query.parentId.length > 0 && fetchRequest.query.rootNodeId1.length > 0) {
            return [false, "parentId and rootNodeId1 cannot be set together"];
        }

        if (fetchRequest.query.match.length === 0) {
            return [false, "Missing match array of Match objects"];
        }

        return [true, undefined, fetchRequest];
    }

    public calcMissingFetchParams(threadTemplate: Record<string, any>): Record<string, any> {
        const params: Record<string, any> = {
            query: {},
        };

        if (!threadTemplate.query?.parentId?.length) {
            params.query.parentId = "0000000000000000000000000000000000000000000000000000000000000000";
        }

        return params;
    }

    public getId(): number {
        return this.id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;

        this.triggerEvent("update");
    }

    public getThread(): Thread | undefined {
        return this.thread;
    }

    public onUpdate(cb: (...args: any[]) => void) {
        this.hookEvent("update", cb);
    }

    public onChange(cb: (...args: any[]) => void) {
        this.hookEvent("change", cb);
    }

    public start(): [boolean, string?, FetchRequest?] {
        if (this.thread) {
            throw new Error("Thread already running");
        }

        try {
            const threadTemplate = ParseUtil.ParseThread(this.threadTemplate);
            const threadFetchParams = ParseUtil.ParseThreadFetchParams(this.threadFetchParams);

            const ret = this.validateFetchRequest(threadTemplate, threadFetchParams);

            if (!ret[0]) {
                return [false, ret[1]];
            }

            this.thread = Thread.fromService(threadTemplate, threadFetchParams, this.service);

            this.hookThread();

            this.setAutoSync(this.autoSync);

            return [true, undefined, ret[2]];
        }
        catch(e) {
            console.error(e);

            return [false, (e as Error).message];
        }
    }

    protected hookThread() {
        if (!this.thread) {
            return;
        }

        this.thread.onChange( () => {
            this.triggerEvent("change");
        });

        this.thread.onClose( () => {
            delete this.thread;

            this.triggerEvent("update");
        });
    }

    public isClosed(): boolean {
        return Boolean(this.thread?.isClosed());
    }

    public close() {
        this.thread?.close();
    }

    public getItems(): CRDTViewItem[] {
        if (this.thread?.isStreaming()) {
            return this.thread.getStream().getView().getItems();
        }

        return [];
    }

    // Return list of post actions for this thread.
    //
    public getPostTemplateList(): string[] {
        return Object.keys(this.threadTemplate?.post ?? {});
    }

    public getLicenseTemplateList(): string[] {
        return Object.keys(this.threadTemplate?.postLicense ?? {});
    }

    /**
     * @throws on parse error or thread not running
     */
    public async post(name: string, params: any): Promise<DataInterface> {
        if (!this.thread) {
            throw new Error("Thread not running");
        }

        ParseUtil.ParseThreadDataParams(params);

        const node = await this.thread.post(name, params);

        return node;
    }

    public toHex(s: string): string {
        return Buffer.from(s).toString("hex");
    }

    public fromHex(hex: string): string {
        return Buffer.from(hex, "hex").toString();
    }

    public isAutoSync(): boolean {
        return this.autoSync;
    }

    public setAutoSync(autoSync: boolean) {
        this.autoSync = autoSync;

        if (autoSync) {
            this.thread?.addAutoSync();
        }
        else {
            this.thread?.removeAutoSync();
        }

        this.triggerEvent("update");
    }

    protected hookEvent(name: string, callback: ( (...args: any[]) => void)) {
        const cbs = this.handlers[name] || [];
        this.handlers[name] = cbs;
        cbs.push(callback);
    }

    protected unhookEvent(name: string, callback: ( (...args: any[]) => void)) {
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
