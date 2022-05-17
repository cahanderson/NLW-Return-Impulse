import { CloseButton } from "../../CloseButton";
import { FeedbackType, feedbackTypes } from "../Index";

interface FeedbackTypeStepProps{
    onFeedbackTypeStep: (type:FeedbackType) => void
}

export function FeedbackTypeStep({onFeedbackTypeStep}:FeedbackTypeStepProps){
    return(
        <>
            <header>
                <span className="text-xl leading-6"> Deixe seu feedback</span>
                <CloseButton />
            </header>
            <div className="flex py-8 gap-2 w-full">
                {Object.entries(feedbackTypes).map(([key, values]) => {
                    return(
                        <button
                            key={key} 
                            className=" bg-zinc-800 rounded-lg py-5 w-24 flex-1 flex flex-col items-center gap-2 border-2  border-transparent hover:border-brand-500 focus:border-brand-500 focus:outline-none"
                            onClick={() => onFeedbackTypeStep(key as FeedbackType)}
                            type="button">
                            <img src={values.image.source} alt={values.image.alt} />
                            <span>{values.title}</span>
                        </button>
                    );
                })}
            </div>
        </>   
    )
}