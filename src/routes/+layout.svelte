<script>
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	export function load({ locals }) {
  	  return {
   	     user: locals.user
   	 };
}
	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
