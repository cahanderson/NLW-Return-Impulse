import { MailAdapter } from "../adapters/mail-adapters";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitRepositoryUseCaseRequest{
    type: string,
    coment: string,
    screenshot?: string,
}

export class SubmitRepositoryUseCase{
   constructor(
       private feedbackRepository: FeedbacksRepository,
       private mailAdapter:MailAdapter
   ){}

    async execute(request: SubmitRepositoryUseCaseRequest){
        const {type, coment, screenshot} = request;

        if(!type){
            throw new Error('Type is required!')
        }

        if(!coment){
            throw new Error('Coment is required!')
        }

        if(screenshot && !screenshot.startsWith('data:image/png;base64')){
            throw new Error('invalid screenshot format.')
        }

        await this.feedbackRepository.create({
            type,
            coment,
            screenshot,
        })
        await this.mailAdapter.sendMail({
            subject: 'Novo feedback',
            body:[
                `<div style="font-family: sans-serif; font-size: 16px;color=#111;" >`,
                `<p>Tipo de Feedback: ${type}`,
                `<p>Comentário: ${coment}`,
                screenshot ? `<p><img src=${screenshot} /> `: ` `,
                `</div>`
            ].join('\n')
        })
    }
}