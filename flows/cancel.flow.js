const { addKeyword } = require('@bot-whatsapp/bot')

module.exports = addKeyword(['Cancelar', 'cancelar']).addAnswer('👋 Hasta luego, buen día.',
    { delay:3000 },
    async(ctx, { endflow })=> {
        return endflow
    }
)
