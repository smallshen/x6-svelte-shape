# X6-Svelte-Shape
Svelte Shape registry for x6 graph library

# Example

> register
```typescript
register({
    shape: "player-node",
    component: PlayerNode,
    attrs: ...,
})
 ```

> BaseNode.svelte
```svelte
<script lang="ts">
    export let width: number
    export let height: number
</script>

<div bind:offsetWidth={width} bind:offsetHeight={height} on:contextmenu>
    <slot />
</div>

<style>
    div {
        display: flex;
        flex-direction: row;
        gap: 10px;
        padding: 10px 20px;

        background-color: var(--gray2);

        border: 1px solid var(--gray8);
        border-radius: 12px;

        width: fit-content;
        height: fit-content;
    }

    div :global(h1) {
        font-size: 1.5em;
    }
</style>
```

> PlayerNode.svelte
```svelte
<script lang="ts">
    import { nodeDataStore } from "../stores"
    import type { Node } from "@antv/x6"
    import BaseNode from "./BaseNode.svelte"

    export let node: Node
    export let width: number
    export let height: number

    $: node.attr("movable", false)
    $: data = nodeDataStore(node)
</script>

<BaseNode bind:width bind:height on:contextmenu={(e) => {}}>
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 96 960 960">
        <path
            d="M480 575q-66 0-108-42t-42-108q0-66 42-108t108-42q66 0 108 42t42 108q0 66-42 108t-108 42ZM160 896v-94q0-38 19-65t49-41q67-30 128.5-45T480 636q62 0 123 15.5T731 696q31 14 50 41t19 65v94H160Z"
        />
    </svg>
    <h1>Player</h1>
</BaseNode>
```
