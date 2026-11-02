<script>
    import './layout.css';
    import favicon from '$lib/assets/favicon.svg';

<<<<<<< HEAD
	
	let { children } = $props();
=======
    let { children } = $props();
>>>>>>> e14bde8e536137c0febe258bc603b8a50084f1ef
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

{@render children()}