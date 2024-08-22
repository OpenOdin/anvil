import {
    Base,
} from "riotjs-simple-typescript";

export interface AnvilTabProps {
    title: string,
    name: string,
    id: number,
    tabClicked?: (id: number) => void,
}

export interface AnvilTabState {}

export class AnvilTab extends Base<AnvilTabProps, AnvilTabState> {
    public clicked = (e: any) => {
        e.preventDefault();

        this.props.tabClicked?.(this.props.id);
    }
}
