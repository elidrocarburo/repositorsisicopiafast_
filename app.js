require("dotenv").config();
const {
    createBot,
    createProvider,
    createFlow,
    addKeyword,
    EVENTS,
} = require("@bot-whatsapp/bot");

const QRPortalWeb = require('@bot-whatsapp/portal')
const { init } = require("bot-ws-plugin-openai");
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const { handlerAI } = require("./utils"); //función para descargar la nota de voz
const { textToVoice } = require("./services/eventlab");
// flows
const welcomeFlow = require('./flows/welcome.flow')
const audioFlow = require('./flows/audio.flow')
const imageFlow = require('./flows/image.flow')

const employeesAddonConfig = {
    model: "gpt-4-0613",
    temperature: 0,
    apiKey: process.env.OPENAI_API_KEY,
  };
  
  const employeesAddon = init(employeesAddonConfig);
  
  const flowStaff = addKeyword(EVENTS.ACTION).addAnswer(
    ["Claro que te interesa?", "mejor te envio audio.."],
    null,
    async (_, { flowDynamic, state }) => {
      console.log("🙉 texto a voz....");
      const currentState = state.getMyState();
      const path = await textToVoice(currentState.answer);
      console.log(`🙉 Fin texto a voz....[PATH]:${path}`);
      await flowDynamic([{ body: "escucha", media: path }]);
    }
  );
  
  const flowVoiceNote = addKeyword(EVENTS.VOICE_NOTE).addAction(
    async (ctx, ctxFn) => {
      await ctxFn.flowDynamic("dame un momento para escucharte...🙉");
      console.log("🤖 voz a texto....");
      const text = await handlerAI(ctx);
      console.log(`🤖 Fin voz a texto....[TEXT]: ${text}`);
      const currentState = ctxFn.state.getMyState();
      const fullSentence = `${currentState?.answer ?? ""}. ${text}`;
      const { employee, answer } = await employeesAddon.determine(fullSentence);
      ctxFn.state.update({ answer });
      employeesAddon.gotoFlow(employee, ctxFn);
    }
  );



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([welcomeFlow, audioFlow, imageFlow, flowVoiceNote, flowStaff])
    const adapterProvider = createProvider(BaileysProvider)

    const employees = [
        {
          name: "EMPLEADO_STAFF_TOUR",
          description:
            "Soy Jorge el staff amable encargado de atentender las solicitudes de los viajeros si tienen dudas, preguntas sobre el tour o la ciudad de madrid, mis respuestas son breves.",
          flow: flowStaff,
        }
      ];
      employeesAddon.employees(employees);


    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
