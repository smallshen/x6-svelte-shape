import { Graph, Node } from "@antv/x6"
import type { ComponentType } from "svelte"

export type SvelteNodeConfig = Node.Properties & {
    shape: string
    component: ComponentType
    effect?: (keyof Node.Properties)[]
    inherit?: string
}

export const shapeMaps: Record<
    string,
    {
        component: ComponentType
        effect?: (keyof Node.Properties)[]
    }
> = {}

export function register(config: SvelteNodeConfig) {
    const { shape, component, effect, inherit, ...others } = config
    if (!shape) {
        throw new Error("should specify shape in config")
    }
    shapeMaps[shape] = {
        component,
        effect
    }

    Graph.registerNode(
        shape,
        {
            inherit: inherit || "svelte-shape",
            ...others
        },
        true
    )
}
