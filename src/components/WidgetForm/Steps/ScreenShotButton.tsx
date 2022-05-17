import { Camera, Trash } from "phosphor-react";
import html2canvas from 'html2canvas'
import { useState } from "react";
import { Loading } from "../../Loading";

interface ScreenShotButtonProps{
    screenshot : String|null ;
    onScreenshotTook : (screenshot:string|null) => void;
}

export function ScreenShotButton({onScreenshotTook, screenshot}:ScreenShotButtonProps ){
    const [isTakingScreenshot,setIsTakingScreenshot]  = useState(false)

    async function handleTakeScreenshot(){
        setIsTakingScreenshot(true);

        const canvas = await html2canvas(document.querySelector('html')!)
        const base64image = canvas.toDataURL('image/png');
        
        onScreenshotTook(base64image)
        setIsTakingScreenshot(false);
    }

    if (screenshot){
        return(
            <button
                onClick={()=> onScreenshotTook(null)}
                type="button"
                className="p-1 w-10 h-10 rounded-md border-transparent flex justify-end items-end text-zinc-400 hover:text-zinc-100 transition-colors"
                style={{
                    backgroundImage: `url(${screenshot})`,
                    backgroundPosition: 'right bottom',
                    backgroundSize: 100,
                }}
            >
                <Trash weight="fill" />

            </button>
        )
    }

    return(
        <button
            onClick={handleTakeScreenshot}
            type="button"
            className="p-2 bg-zinc-800 rounded-md border-transparent hover:bg-zinc-700 transition-colors focus:border-brand-500 focus:ring-brand-500 focus:ring-1 focus:outline-none"
        >
            {isTakingScreenshot? <Loading /> : <Camera  className="w-6 h-6 text-zinc-100  "/>}
            
        </button>
    )
}