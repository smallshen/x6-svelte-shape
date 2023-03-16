<svelte:options immutable={true} />

<script lang="ts">
    import type { Node } from "@antv/x6"
    import { onDestroy, type ComponentType } from "svelte"

    export let component: ComponentType

    export let node: Node

    let width: number
    let height: number
    $: node.size(width, height)

    const updateSize = () => {
        width = node.size().width
        height = node.size().height
    }

    node.on("change:size", updateSize)

    let posX: number
    let posY: number
    $: node.position(posX, posY)

    const updatePos = () => {
        posX = node.position().x
        posY = node.position().y
    }
    node.on("change:position", updatePos)

    onDestroy(() => {
        node.off("change:size", updateSize)
        node.off("change:position", updatePos)
    })
</script>

<section>
    <svelte:component this={component} {node} bind:width bind:height bind:posX bind:posY />
</section>

<style>
    section {
        width: max-content;
        height: max-content;
    }
</style>
