import {
    RiotBase,
} from "riotjs-simple-typescript";

export interface UtilTabProps {
    title: string,
    name: string,
    id: number | string,
    clickCallback?: (id: number | string) => void,
}

export interface UtilTabState {}

export class UtilTab extends RiotBase<UtilTabProps, UtilTabState> {
    public clicked = (e: any) => {
        e.preventDefault();

        this.props.clickCallback?.(this.props.id);
    }
}
