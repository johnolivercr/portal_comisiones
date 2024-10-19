export const engine = {
    engine: {
      code: 'microservice:engine',
      methods: {
        getView: 'method:core:get:view',
        getSystemLang: 'method:core:get:system_lang',
        editEpicrisis: 'method:aws:bedrock:claude-3-haiku-20240307'
      },
    },
  };
