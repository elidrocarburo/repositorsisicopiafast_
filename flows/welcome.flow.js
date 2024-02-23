const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')
const cancelFlow = require('./cancel.flow')
const rateFlow = require('./rate.flow')
const commentsFlow = require('./comments.flow')

module.exports = addKeyword(EVENTS.WELCOME)
    .addAnswer('¡Buen día! Bienvenido a la pastelería \"La Condesa\"')
    .addAnswer([
        'Esribe la palabra del servicio te gustaría conocer:',
        '👉 *ventas* para conocer nuestros productos',
        '👉 *pedidos*  para ver el estado de tu pedido',
        '👉 *cancelar* para terminar la conversación en cualquier momento'
    ], 
    { capture: true, delay: 3000 }, null,
    [rateFlow, commentsFlow, cancelFlow]
)
