export const bedrock = {
  haiku: {
    prompt:
      'Redacta una epicrisis sin alterar ningún tipo de resultado ni agregar ningún tipo de recomendación utilizando el siguiente texto. Aquí está el texto:<texto>@texto@</texto>Para ejecutar esta tarea, identifique las principales entidades, atributos o categorías mencionadas en el texto y utilícelas como claves en el objeto JSON. Luego, extraiga la información relevante del texto y complete los valores correspondientes en el objeto JSON. Asegúrese de que los datos estén representados con precisión y formateados correctamente dentro de la estructura JSON. La tabla JSON resultante debe proporcionar una descripción general clara e estructurada de la información presentada en el texto original y solo debe devolver el json, los valores de falso o verdaro se deben representar con un boleano y mapear a esta estructura {"patient":"string","age":0,"reason_for_consultation":string,"duration_of_symptoms":0,"signs_and_symptoms":[],"presumptive_diagnosis":"string","vital_signs":[{"key":"string","value":"string"}],"physical_examination":[{"key":"string","value":"string"}],"complementary_studies":[{"key":"string","value":"string"}],"evolution":"string"} y si posee informacion para alguna propiedad agregar un valor por defecto',
  },
};