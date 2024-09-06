import {
    riot,
} from "riotjs-simple-typescript";

//@ts-expect-error no typings
import ProjectWindow from "./components/project-window";
riot.register("project-window", ProjectWindow);

//@ts-expect-error no typings
import ProjectOpen from "./components/project-open";
riot.register("project-open", ProjectOpen);

//@ts-expect-error no typings
import ProjectEdit from "./components/project-edit";
riot.register("project-edit", ProjectEdit);

//@ts-expect-error no typings
import ProjectExplore from "./components/project-explore";
riot.register("project-explore", ProjectExplore);

//@ts-expect-error no typings
import ThreadTable from "./components/thread-table";
riot.register("thread-table", ThreadTable);

//@ts-expect-error no typings
import UtilTab from "./components/util-tab";
riot.register("util-tab", UtilTab);

//@ts-expect-error no typings
import UtilRaw from "./components/util-raw";
riot.register("util-raw", UtilRaw);

//@ts-expect-error no typings
import Page404 from "./components/page-404";
riot.register("page-404", Page404);
