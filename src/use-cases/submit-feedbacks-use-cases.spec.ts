import { SubmitRepositoryUseCase } from "./submit-feedbacks-use-cases"

const createFeedbackSpy = jest.fn();
const sendMailFeedbackSpy = jest.fn();

const submitFeedback = new SubmitRepositoryUseCase(
    {create: createFeedbackSpy},
    {sendMail: sendMailFeedbackSpy}
)

describe('Submit feedback',()=>{
    it('should be able to submit a feedback',async() =>{    
        await expect(submitFeedback.execute({
            type: 'BUG',
            coment: 'example comment',
            screenshot:'data:image/png;base64/asdsdsda'
        })). resolves.not.toThrow();
        expect (createFeedbackSpy).toHaveBeenCalled();
        expect (sendMailFeedbackSpy).toHaveBeenCalled();
    });

    it('should be not be able to submit feedback without type',async() =>{
        await expect(submitFeedback.execute({
            type: '',
            coment: 'example comment',
            screenshot:'data:image/png;base64/asdsdsda'
        })). rejects.toThrow();
    });

    it('should be not be able to submit feedback without coment',async() =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            coment: '',
            screenshot:'data:image/png;base64/asdsdsda'
        })). rejects.toThrow();
    });

    it('should be not be able to submit feedback with an invalid screenshot format',async() =>{
        await expect(submitFeedback.execute({
            type: 'BUG',
            coment: 'Ta tudo bugado',
            screenshot:'test.jpg'
        })). rejects.toThrow();
    });
});