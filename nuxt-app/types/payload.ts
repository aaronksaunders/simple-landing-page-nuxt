/**
 * @fileoverview Type exports from Payload CMS generated types
 * @module types/payload
 */

import type { Page, Form, Media } from "./payload-types";

// Re-export base types
export type { Page, Form, Media };

/**
 * Extract block types from Page layout
 */
export type HeroBlock = Extract<Page["layout"][0], { blockType: "hero" }>;
export type ContentBlock = Extract<Page["layout"][0], { blockType: "content" }>;
export type NewsletterBlock = Extract<
  Page["layout"][0],
  { blockType: "newsletter-form" }
>;

/**
 * Form field type from Form fields array
 */
export type FormField = NonNullable<Form["fields"]>[0];

/**
 * Union type for all blocks
 */
export type PageBlock = HeroBlock | ContentBlock | NewsletterBlock;

/**
 * Form submission data structure
 */
export interface FormSubmission {
  field: string;
  value: string;
}
