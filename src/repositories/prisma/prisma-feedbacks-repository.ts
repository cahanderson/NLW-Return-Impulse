import { prisma } from "../../prisma";
import { FeedbacksCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbacksRepository implements FeedbacksRepository{
    async create ({type, coment, screenshot}: FeedbacksCreateData) {
        await prisma.feedback.create({
            data:{
                type,
                coment,
                screenshot,
            }
        })
    }
}   