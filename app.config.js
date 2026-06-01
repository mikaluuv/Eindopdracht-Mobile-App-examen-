const appJson = require("./app.json");

module.exports = {
  ...appJson,
  expo: {
    ...appJson.expo,
    extra: {
      webflowApiToken:
        process.env.WEBFLOW_API_TOKEN ||
        process.env.EXPO_PUBLIC_WEBFLOW_API_TOKEN ||
        "",
      webflowSiteId:
        process.env.WEBFLOW_SITE_ID ||
        process.env.EXPO_PUBLIC_WEBFLOW_SITE_ID ||
        "6a17394aeaf50d0113a71782",
    },
  },
};
