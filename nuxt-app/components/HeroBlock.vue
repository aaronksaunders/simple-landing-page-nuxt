<script setup lang="ts">
/**
 * @fileoverview Hero block component that renders a hero section with heading, subheading, and optional image
 * @module components/HeroBlock
 */

import type { HeroBlock, Media } from "~/types/payload";
import RichText from "~/components/RichText.vue";

/**
 * Component props
 * @type {Object}
 * @property {HeroBlock} block - The hero block configuration data
 */
const props = defineProps<{
  block: HeroBlock;
}>();

console.log("HeroBlock - props.block", props);

/**
 * Computed full image URL including the base URL from config
 * @type {ComputedRef<string>}
 */
const imageUrl = computed(() => {
  return `${(props.block.image as Media)?.url}`;
});

</script>

<template>
  <section class="hero">
    <h1>{{ block.heading }}</h1>
    <div v-if="block.subheading" class="hero-subheading">
      <RichText :content="block.subheading" />
    </div>
    <img
      v-if="block.image"
      :src="imageUrl"
      :alt="(block.image as Media)?.alt"
      class="hero-image"
    />
  </section>
</template>

<style scoped>
.hero {
  text-align: center;
  padding: 4rem 2rem;
}

.hero-image {
  max-width: 100%;
  height: auto;
  margin-top: 2rem;
}
</style>
