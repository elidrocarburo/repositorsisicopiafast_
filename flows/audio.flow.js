const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

module.exports = addKeyword(EVENTS.VOICE_NOTE).addAnswer('Deme un mommento para escuchar el audio.')

