<script lang="ts">
  let { children, size = "md" } = $props();
</script>

{#if children}
  <p class={`text-white/90 text-${size}`}>
    {@render children()}
  </p>
{/if}
