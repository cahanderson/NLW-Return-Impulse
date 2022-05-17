import { Popover } from "@headlessui/react";
import { X } from "phosphor-react";

export function CloseButton(){
    return(
      <Popover.Button className="top-5 absolute right-4 text-zinc-500 hover:text-zinc-100 cursor-pointer title='Fechar formulário de feedback">
          <X weight="bold" className="w-4 h-4" />
      </Popover.Button>  
    );
}