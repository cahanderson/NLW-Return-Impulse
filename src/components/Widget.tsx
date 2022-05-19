import {ChatTeardropDots} from 'phosphor-react'
import { Popover } from '@headlessui/react'
import { WidgetForm } from './WidgetForm/index'



export function Widget(){
  
  return (
    <Popover className="absolute bottom-3 right-3 b flex flex-col items-end  md:bottom-5 md:right-5">
      <Popover.Panel>
        <WidgetForm />
      </Popover.Panel>
     <Popover.Button  className="bg-brand-500 rounded-full px-3 h-12 text-white flex items-center group">
       <ChatTeardropDots  className="w-6 h-6"/>

       <span className='max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-500 ease-linear'>FeedBack</span>
     </Popover.Button>
    </Popover>
  )
}