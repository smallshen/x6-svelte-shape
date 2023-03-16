import { Dom, NodeView } from "@antv/x6"
import type { SvelteComponentTyped } from "svelte"
import type { SvelteShape } from "./node"
import { shapeMaps } from "./registry"
import NodeWrapper from "./NodeWrapper.svelte"

export class SvelteShapeView extends NodeView<SvelteShape> {
    component?: SvelteComponentTyped

    getComponentContainer() {
        return this.selectors && (this.selectors.foContent as HTMLDivElement)
    }

    confirmUpdate(flag: number) {
        const ret = super.confirmUpdate(flag)
        return this.handleAction(ret, SvelteShapeView.action, () => {
            this.renderSvelteComponent()
        })
    }

    protected renderSvelteComponent() {
        this.unmountSvelteComponent()
        const container = this.getComponentContainer()
        const node = this.cell

        if (container) {
            const content = shapeMaps[node.shape]

            this.component = new NodeWrapper({
                target: container,
                props: {
                    component: content.component,
                    node: node
                }
            })
        }
    }

    protected unmountSvelteComponent() {
        // const container = this.getComponentContainer()

        if (this.component) {
            this.component.$destroy()
            this.component = undefined
        }
    }

    onMouseDown(e: Dom.MouseDownEvent, x: number, y: number) {
        const target = e.target as Element
        const tagName = target.tagName.toLowerCase()
        if (tagName === "input") {
            const type = target.getAttribute("type")
            if (type == null || ["text", "password", "number", "email", "search", "tel", "url"].includes(type)) {
                return
            }
        }

        super.onMouseDown(e, x, y)
    }

    unmount() {
        this.unmountSvelteComponent()
        super.unmount()
        return this
    }
}

export namespace SvelteShapeView {
    export const action = "svelte" as any

    SvelteShapeView.config({
        bootstrap: [action],
        actions: {
            component: action
        }
    })

    NodeView.registry.register("svelte-shape-view", SvelteShapeView, true)
}
