<script lang="ts">
	export let type: 'button' | 'submit' | 'reset' = 'button';
	export let variant: 'primary' | 'secondary' | 'outline' = 'primary';
	export let size: 'sm' | 'md' | 'lg' = 'md';
	export let disabled = false;
</script>

<button
	{type}
	class="btn btn-{variant} btn-{size}"
	{disabled}
	on:click
>
	<slot />
</button>

<style>
	.btn {
		font-family: inherit;
		border: none;
		border-radius: 0.25rem;
		cursor: pointer;
		font-weight: 500;
		transition: background-color 0.2s, transform 0.1s;
	}
	
	.btn:disabled {
		opacity: 0.6;
		cursor: not-allowed;
	}
	
	.btn:active:not(:disabled) {
		transform: translateY(1px);
	}
	
	.btn-primary {
		background-color: #ff3e00;
		color: white;
	}
	
	.btn-primary:hover:not(:disabled) {
		background-color: #e63700;
	}
	
	.btn-secondary {
		background-color: #676778;
		color: white;
	}
	
	.btn-secondary:hover:not(:disabled) {
		background-color: #585865;
	}
	
	.btn-outline {
		background-color: transparent;
		color: #676778;
		border: 1px solid #676778;
	}
	
	.btn-outline:hover:not(:disabled) {
		background-color: rgba(103, 103, 120, 0.1);
	}
	
	.btn-sm {
		padding: 0.25rem 0.5rem;
		font-size: 0.875rem;
	}
	
	.btn-md {
		padding: 0.5rem 1rem;
		font-size: 1rem;
	}
	
	.btn-lg {
		padding: 0.75rem 1.5rem;
		font-size: 1.125rem;
	}
</style> 