const { addKeyword, EVENTS } = require('@bot-whatsapp/bot')

module.exports = addKeyword(EVENTS.MEDIA).addAnswer('Permítame analizar la imagen')

