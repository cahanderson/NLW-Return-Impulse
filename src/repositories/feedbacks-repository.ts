export interface FeedbacksCreateData{
    type: string,
    coment: string,
    screenshot?:string,
}

export interface FeedbacksRepository{
    create: (data:FeedbacksCreateData ) => Promise <void>;
} 