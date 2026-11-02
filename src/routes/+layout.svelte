<script>
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';

    let { children, data } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}