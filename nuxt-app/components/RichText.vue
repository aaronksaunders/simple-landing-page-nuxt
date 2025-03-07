<script setup lang="ts">
/**
 * @fileoverview Rich text renderer component for Payload CMS content
 * @module components/RichText
 */

import { computed } from "vue";

/**
 * Rich text node structure
 * @interface RichTextNode
 */
export interface RichTextNode {
  /** Node type identifier */
  type: string;
  /** Optional format specification */
  format?: string;
  /** Optional indentation level */
  indent?: number;
  /** Optional version number */
  version?: number;
  /** Optional child nodes */
  children?: RichTextNode[];
  /** Optional text content */
  text?: string;
  /** Optional text style */
  style?: string;
  /** Optional root node */
  root?: {
    children: RichTextNode[];
  };
  [key: string]: unknown;
}

/**
 * Component props
 * @type {Object}
 * @property {RichTextNode} content - The rich text content to render
 */
const props = defineProps<{
  content: RichTextNode;
}>();

/**
 * Renders a rich text node to HTML
 * @param {RichTextNode} node - The node to render
 * @returns {string} The rendered HTML string
 */
const renderNode = (node: RichTextNode): string => {
  // Handle root node from Payload
  if (node.root) {
    return node.root.children.map((child) => renderNode(child)).join("");
  }

  if (node.text) {
    let text = node.text;
    if (node.style === "bold") {
      text = `<strong>${text}</strong>`;
    }
    if (node.style === "italic") {
      text = `<em>${text}</em>`;
    }
    if (node.style === "underline") {
      text = `<u>${text}</u>`;
    }
    return text;
  }

  if (node.type === "paragraph") {
    const children =
      node.children?.map((child) => renderNode(child)).join("") || "";
    return `<p>${children}</p>`;
  }

  if (node.type === "heading") {
    const level = node.format || "1";
    const children =
      node.children?.map((child) => renderNode(child)).join("") || "";
    return `<h${level}>${children}</h${level}>`;
  }

  if (node.type === "list") {
    const tag = node.format === "ordered" ? "ol" : "ul";
    const children =
      node.children?.map((child) => renderNode(child)).join("") || "";
    return `<${tag}>${children}</${tag}>`;
  }

  if (node.type === "listitem") {
    const children =
      node.children?.map((child) => renderNode(child)).join("") || "";
    return `<li>${children}</li>`;
  }

  if (node.type === "link") {
    const children =
      node.children?.map((child) => renderNode(child)).join("") || "";
    return `<a href="${node.format}">${children}</a>`;
  }

  if (node.children) {
    return node.children.map((child) => renderNode(child)).join("");
  }

  return "";
};

/**
 * Computed HTML content from the rich text
 * @type {ComputedRef<string>}
 */
const htmlContent = computed(() => {
  console.log("Rich text content:", props.content);
  return renderNode(props.content);
});
</script>

<template>
  <div class="rich-text" v-html="htmlContent"></div>
</template>

<style scoped>
.rich-text {
  font-family: var(--font-body);
  line-height: 1.6;
}

.rich-text :deep(p) {
  margin: 1rem 0;
}

.rich-text :deep(h1),
.rich-text :deep(h2),
.rich-text :deep(h3),
.rich-text :deep(h4),
.rich-text :deep(h5),
.rich-text :deep(h6) {
  font-family: var(--font-heading);
  margin: 2rem 0 1rem;
}

.rich-text :deep(ul),
.rich-text :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.rich-text :deep(li) {
  margin: 0.5rem 0;
}

.rich-text :deep(a) {
  color: #0066ff;
  text-decoration: none;
}

.rich-text :deep(a:hover) {
  text-decoration: underline;
}
</style>
