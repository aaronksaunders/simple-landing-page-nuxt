<script setup lang="ts">
/**
 * @fileoverview Home page component that renders the landing page with dynamic blocks
 * @module pages/index
 */

import { ref, onMounted } from "vue";
import type { Page } from "~/types/payload";
import HeroBlock from "~/components/HeroBlock.vue";
import ContentBlock from "~/components/ContentBlock.vue";
import NewsletterBlock from "~/components/NewsletterBlock.vue";

/**
 * Reference to the page data
 * @type {Ref<Page | null>}
 */
const page = ref<Page | null>(null);

/**
 * Fetches page data from Payload CMS
 * @async
 * @function fetchPageData
 * @returns {Promise<void>}
 */
const fetchPageData = async () => {
  const config = useRuntimeConfig();
  try {
    const response = await fetch(
      `${config.public.payloadUrl}/api/pages?where[slug][equals]=landing-page`
    );
    const data = await response.json();
    if (data.docs && data.docs.length > 0) {
      page.value = data.docs[0];
      console.log("Page data:", page.value);
      console.log("Layout blocks:", page.value?.layout);
    }
  } catch (error) {
    console.error("Error fetching page data:", error);
  }
};

// Fetch page data on component mount
onMounted(() => {
  fetchPageData();
});

/**
 * Component mapping for dynamic block rendering
 * @type {Record<string, Component>}
 */
const componentMap = {
  hero: HeroBlock,
  content: ContentBlock,
  "newsletter-form": NewsletterBlock,
} as const;
</script>

<template>
  <div class="container">
    <div v-if="!page" class="loading">Loading...</div>
    <div v-else-if="page" class="page-content">
      <component
        v-for="block in page.layout"
        :key="block.id"
        :is="componentMap[block.blockType]"
        :block="block"
      />
    </div>
    <div v-else class="error">Page not found</div>
  </div>
</template>

<style scoped>
.loading,
.error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}
</style>
