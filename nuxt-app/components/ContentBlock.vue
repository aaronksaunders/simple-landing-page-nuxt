<script setup lang="ts">
/**
 * @fileoverview Content block component that renders rich text content with optional heading
 * @module components/ContentBlock
 */

import type { ContentBlock } from "~/types/payload";
import RichText from "~/components/RichText.vue";

/**
 * Component props
 * @type {Object}
 * @property {ContentBlock} block - The content block configuration data
 */
const props = defineProps<{
  block: ContentBlock;
}>();
</script>

<template>
  <section class="content-block">
    <h2 v-if="block.heading" class="content-heading">
      {{ block.heading }}
    </h2>
    <RichText :content="block.content" />
  </section>
</template>

<style scoped>
.content-block {
  padding: 2rem 0;
  max-width: 800px;
  margin: 0 auto;
}

.content-heading {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: #1a1a1a;
}

.content-body {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #4a4a4a;
}

.content-body :deep(p) {
  margin-bottom: 1rem;
}

.content-body :deep(h1),
.content-body :deep(h2),
.content-body :deep(h3),
.content-body :deep(h4),
.content-body :deep(h5),
.content-body :deep(h6) {
  margin: 1.5rem 0 1rem;
  font-weight: 600;
  color: #1a1a1a;
}
</style>
