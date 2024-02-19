const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

module.exports = addKeyword(EVENTS.WELCOME)
    .addAnswer('¡Buen día! Bienvenido a la pastelería \"La Condesa\"')
    .addAnswer([
        'Esribe la palabra del servicio te gustaría conocer:',
        '👉 *ventas* para conocer nuestros productos',
        '👉 *pedidos*  para ver el estado de tu pedido',
        '👉 *cancelar* para terminar la conversacion'
    ], 
    { capture: true, delay: 3000 } 
)
