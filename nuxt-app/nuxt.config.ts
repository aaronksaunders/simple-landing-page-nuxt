// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      payloadUrl:
        process.env.PAYLOAD_PUBLIC_SERVER_URL || "http://localhost:3000",
    },
  },
  devServer: {
    port: 3001,
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700&family=Nunito+Sans:wght@400;500;600;700&display=swap",
        },
      ],
    },
  },
  css: ["~/assets/css/main.css"],
});
