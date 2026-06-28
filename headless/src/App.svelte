<script lang="ts">
    import './lib/components';

    let value = $state(0);
</script>

<atom-progress
    min={10}
    {value}
    max={100}></atom-progress>

<input
    type="range"
    bind:value>
