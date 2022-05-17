import express from 'express'
import { SubmitRepositoryUseCase } from './use-cases/submit-feedbacks-use-cases';
import { PrismaFeedbacksRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { NodemailerMailAdapter } from './adapters/nodemailer/nodemailer-mail-adapter';

export const routes = express.Router();

routes.post('/feedbacks' , async(req, res)=>{
    const {type, coment, screenshot} = req.body
    const prismaFeedbacksRepository = new PrismaFeedbacksRepository()
    const nodemailerMailAdapter = new NodemailerMailAdapter()
    const submitRepositoryUseCase = new SubmitRepositoryUseCase(
        prismaFeedbacksRepository,
        nodemailerMailAdapter,
    )

    await submitRepositoryUseCase.execute({
        type,
        coment,
        screenshot,
    })   
    return res.status(201).send()
})

