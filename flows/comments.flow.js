const { addKeyword } = require('@bot-whatsapp/bot')
const cancelFlow = require('./cancel.flow')

module.exports = addKeyword(['Sugerencia', 'sugerencia']).addAnswer('¿Alguna sugerencia para mejorar el servicio?', {capture: true}, async(ctx)  => {console.log(ctx.body)})
