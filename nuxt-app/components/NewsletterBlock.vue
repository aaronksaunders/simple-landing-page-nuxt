<script setup lang="ts">
/**
 * @fileoverview Newsletter block component that renders a newsletter signup form
 * @module components/NewsletterBlock
 */

import { ref } from "vue";
import type { NewsletterBlock } from "~/types/payload";
import RichText, { type RichTextNode } from "~/components/RichText.vue";

/**
 * Component props
 * @type {Object}
 * @property {NewsletterBlock} block - The newsletter block configuration data
 */
const props = defineProps<{
  block: NewsletterBlock;
}>();

/**
 * Form submission state interface
 * @interface FormState
 */
interface FormState {
  /** Indicates if form is currently submitting */
  loading: boolean;
  /** Error message if submission failed */
  error: string | null;
  /** Indicates if form was submitted successfully */
  success: boolean;
}

/**
 * Form state reactive reference
 * @type {Ref<FormState>}
 */
const formState = ref<FormState>({
  loading: false,
  error: null,
  success: false,
});

const config = useRuntimeConfig();

/**
 * Handles form submission
 * @async
 * @param {Event} e - Form submission event
 * @returns {Promise<void>}
 */
const handleSubmit = async (e: Event) => {
  e.preventDefault();
  if (!props.block.form || typeof props.block.form !== "object") return;

  formState.value = {
    loading: true,
    error: null,
    success: false,
  };

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  try {
    const response = await fetch(
      `${config.public.payloadUrl}/api/form-submissions`,
      {
        method: "POST",
        body: JSON.stringify({
          form: props.block.form.id,
          submissionData: Object.entries(data).map(([field, value]) => ({
            field,
            value: value as string,
          })),
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Failed to submit form");
    }

    form.reset();

    formState.value = {
      loading: false,
      error: null,
      success: true,
    };

    // Reset form state after 5 seconds
    setTimeout(() => {
      formState.value = {
        loading: false,
        error: null,
        success: false,
      };
    }, 5000);
  } catch (error) {
    console.error(error);
    formState.value = {
      loading: false,
      error: "Failed to submit form",
      success: false,
    };
  }
};
</script>

<template>
  <section class="newsletter-block">
    <h2 class="newsletter-heading">
      {{ block.heading }}
    </h2>
    <p v-if="block.heading" class="newsletter-subheading">
      {{ block.heading }}
    </p>

    <form
      v-if="block.form && typeof block.form === 'object'"
      @submit="handleSubmit"
      class="newsletter-form"
    >
      <div
        v-for="field in block.form.fields?.filter((f) => 'name' in f)"
        :key="field.id!"
        class="form-group"
      >
        <label :for="field.id!">{{ field.label! }}</label>
        <input
          :type="field.blockType === 'email' ? 'email' : 'text'"
          :name="field.name"
          :required="field.required || false"
          :placeholder="field.label || ''"
          class="email-input"
        />
      </div>

      <div v-if="!formState.success" class="form-actions">
        <button
          type="submit"
          :disabled="formState.loading"
          class="submit-button"
        >
          {{
            formState.loading
              ? "Submitting..."
              : block.form.submitButtonLabel || "Submit"
          }}
        </button>
      </div>

      <p v-if="formState.error" class="error-message">
        {{ formState.error }}
      </p>
      <div
        v-if="formState.success && block.form.confirmationMessage"
        class="success-message"
      >
        <RichText
          :content="block.form.confirmationMessage as unknown as RichTextNode"
        />
      </div>
    </form>
  </section>
</template>

<style scoped>
.newsletter-block {
  padding: 3rem 0;
  text-align: center;
  background-color: #f5f5f5;
  border-radius: 8px;
  margin: 2rem auto;
  font-family: var(--font-body);
  max-width: 600px;
}

.newsletter-heading {
  font-family: var(--font-heading);
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: #1a1a1a;
}

.newsletter-subheading {
  font-family: var(--font-body);
  font-size: 1.1rem;
  color: #4a4a4a;
  margin-bottom: 2rem;
}

.newsletter-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 0 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
  text-align: left;
}

.form-group label {
  font-weight: 500;
  color: #4a4a4a;
}

.email-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  font-size: 1rem;
  transition: border-color 0.2s;
}

.email-input:focus {
  outline: none;
  border-color: #007bff;
}

.submit-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #0066ff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 1rem;
}

.submit-button:hover {
  background-color: #0056b3;
}

.submit-button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.success-message {
  color: #28a745;
  margin-top: 1rem;
}

.error-message {
  color: #dc3545;
  margin-top: 1rem;
}
</style>
