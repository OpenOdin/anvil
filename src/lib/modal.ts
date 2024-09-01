import assert from "assert";

import {
    riot,
} from "../globals";

let lastIndex = 0;

function open(name: string, props: Record<string, any>, parentElm?: HTMLElement) {
    const body = document.querySelector("body") as HTMLElement;

    parentElm = parentElm ?? body;

    assert(parentElm, "Expected parent element");

    const overlay = document.createElement("div");

    overlay.setAttribute("class", "overlay");

    parentElm.append(overlay);

    const keySinkElm = parentElm === body ? body : overlay;

    const indexThis = lastIndex;

    // key down on overlay, mute event.
    //
    const keydown = (e: KeyboardEvent) => {
        if (e.key == "Escape") {
            if (indexThis === lastIndex - 1) {
                unmount();
            }
        }

        e.stopPropagation();
    };

    const bodyKeydown = (e: KeyboardEvent) => {
        if (e.key == "Escape") {
            if (indexThis === lastIndex - 1) {
                unmount();
            }
        }

        e.stopPropagation();
        e.preventDefault();
    };

    // mouse click on overlay, close modal.
    //
    const muteClick = (e: Event) => {
        if (e.target === overlay && indexThis === lastIndex - 1) {
            e.stopPropagation();

            unmount();
        }
    };

    overlay.addEventListener("click", muteClick);

    let elm: HTMLElement | undefined;

    let component: any;

    const unmount = () => {
        component?.unmount();
        elm?.remove();
        overlay.remove();

        overlay.removeEventListener("keydown", keydown);

        if (parentElm === body) {
            body.removeEventListener("keydown", bodyKeydown);
        }

        overlay.removeEventListener("click", muteClick);

        lastIndex--;
    };

    elm = document.createElement("div");

    elm.setAttribute("id", "model_" + lastIndex);

    const selector = "#model_" + lastIndex;

    lastIndex++;

    overlay.append(elm);

    component = riot.mount(selector, {...props, unmount}, name)[0];

    overlay.addEventListener("keydown", keydown);

    if (parentElm === body) {
        // Also hook body for ESC keypress if modal covers whole window.
        //
        body.addEventListener("keydown", bodyKeydown);
    }
}

export const modal = {
    open,
};
