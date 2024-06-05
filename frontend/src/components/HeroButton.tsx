import { Button } from "./ui/button"

interface HeroButtonProps {
    bgimg: string, 
    context: string
  
  }
  
export default function HeroButton({ bgimg, context }:HeroButtonProps) {
    return (
      <Button className="p-0 h-48 rounded-none  ">
  
        <div className="p-5 flex  w-full h-full items-end justify-start hover:opacity-50 " style={{ backgroundImage: `url(${bgimg})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          <p className="text-4xl font-bold">
            {context}
          </p>
  
        </div>
  
  
      </Button>
  
    )
}
