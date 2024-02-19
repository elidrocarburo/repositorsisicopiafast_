const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')
const welcomeFlow = require('./flows/welcome.flow')
const audioFlow = require('./flows/audio.flow')
const imageFlow = require('./flows/image.flow')



const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([welcomeFlow, audioFlow, imageFlow])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
