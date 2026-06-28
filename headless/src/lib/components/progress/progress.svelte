<svelte:options
    customElement={{
        tag: "atom-progress",
        shadow: {
            mode: import.meta.env.DEV ? 'open' : 'closed',
            clonable: true
        },
        props: {
            min: {
                attribute: "min",
                reflect: true,
                type: "Number"
            },
            value: {
                attribute: "value",
                reflect: true,
                type: "Number"
            },
            max: {
                attribute: "max",
                reflect: true,
                type: "Number"
            },
        }
    }} />

<script
    lang="ts"
    module>
    export type Props = {
        min?: number;
        value?: number;
        max?: number;
    };

    export const toPercentage = (min: number, max: number, value: number): number => {
        if (max === min) return 0;

        const clamped = Math.min(Math.max(value, min), max);
        return ((clamped - min) / (max - min)) * 100;
    };
</script>

<script lang="ts">
    let {
        min = $bindable(0),
        value = $bindable(25),
        max = $bindable(100),
    }: Props = $props();

    const percent = $derived(Math.floor(toPercentage(min, max, value)));
</script>

<div
    data-min={min}
    data-value={value}
    data-max={max}
    style:--foreground-width="{percent}%">
    <div></div>
</div>

<style lang="postcss">
    :host {
        & > div {
            height: 8px;
            width: 256px;
            background-color: pink;

            & > div {
                height: 100%;
                width: var(--foreground-width);
                background-color: red;
            }
        }
    }
</style>
