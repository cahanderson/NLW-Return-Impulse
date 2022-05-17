import { ArrowLeft, Camera } from "phosphor-react";
import { FormEvent, useState } from "react";
import { api } from "../../../libs/api";
import { CloseButton } from "../../CloseButton";
import { Loading } from "../../Loading";
import { FeedbackType, feedbackTypes } from "../index";
import { ScreenShotButton } from "./ScreenShotButton";


interface FeedbackContentStepProps{
    feedbackType: FeedbackType,
    feedbackRequest:() =>void,
    onFeedbackSubmited: () => void
}

export function FeedbackContentStep({feedbackType, feedbackRequest, onFeedbackSubmited}:FeedbackContentStepProps){
    const feedbackTypeInfo = feedbackTypes[feedbackType]
    const [screenshot, setScreenshot] = useState<string | null>(null)
    const [coment, setComent] = useState("");
    const[isSendingFeedback, setIsSendingFeedback] = useState(false)

    async function handleSubmitFeedback(event:FormEvent){
        event.preventDefault();
        setIsSendingFeedback(true)
         await api.post('/feedbacks',{
            type: feedbackType,
            coment,
            screenshot,
       })
       setIsSendingFeedback(false)
        onFeedbackSubmited();
    }

    return(
        <>
            <header>

                <button
                    type="button" 
                    onClick={feedbackRequest}
                     className="top-5 left-5 absolute text-zinc-500 hover:text-zinc-100 ">
                    <ArrowLeft  weight="bold" className="w-4 h-4" />
                </button>

                <span className="text-xl leading-6 flex items-center gap-2">
                    <img src={feedbackTypeInfo.image.source} alt={feedbackTypeInfo.image.alt}  className="w-6 h-6 items-center"/>
                    {feedbackTypeInfo.title}
                </span>

                <CloseButton />
            </header>


            <form onSubmit={handleSubmitFeedback} className="my-4 w-full">
                <textarea
                    onChange={event=>setComent(event.target.value)}
                    placeholder="Conte com detalhes o que está acontecendo" 
                    className="min-w-[304px] w-full min-h-[112px] text-sm placeholder-zinc-400 text-zinc-100 border-zinc-600 bg-transparent rounded-md focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none resize-none  scrollbar-thumb-zinc-700 scrollbar-track-transparent  scrollbar-thin"
                />

                <footer className="flex gap-2 mt-2">
                    <ScreenShotButton 
                        screenshot = {screenshot}
                        onScreenshotTook = {setScreenshot}
                     />
                    <button
                        disabled={coment.length ===0|| isSendingFeedback}
                        type="submit"
                        className="p-2 bg-brand-500 rounded-md border-transparent flex-1 flex justify-center items-center text-sm hover:bg-brand-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-zinc-900 focus:ring-brand-500 transition-colors disabled:opacity-50 disabled:hover:bg-brand-500"
                    >
                        {isSendingFeedback? <Loading /> : 'Enviar feedBack'}
                    </button>
                </footer>
            </form>
                
            
        </>   
    )
}