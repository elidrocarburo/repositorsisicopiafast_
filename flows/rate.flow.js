const { addKeyword } = require('@bot-whatsapp/bot')
const commentsFlow = require('./comments.flow')


module.exports = addKeyword(['Calificar', 'calificar']).addAnswer('Gracias, su calificación nos ayudará a mejorar el servicio.',{ delay:1000 })
    .addAnswer([
        '¿Del *1* al *5* ¿cómo se sientió con el servicio?',
        '*5* Excelente servicio',
        '*3* Estuvo medio',
        '*1* Pésimo servicio',
    ], { capture: true},
    async(ctx, { fallBack }) => {

        if(!['1','3','5'].includes(ctx.body)){
            return fallBack('Perdón, esa opción no es valida.')
        }
        console.log(ctx.body)
    })

