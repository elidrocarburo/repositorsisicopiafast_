const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

module.exports = addKeyword(EVENTS.VOICE_NOTE).addAnswer('Deme un momento para escuchar el audio.')

