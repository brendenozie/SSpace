import React from "react";

interface Props {
  icon: {url:string,publicId:string,status:string};
  displayText: string;
  subText: string;
  removeImage(icon:{url:string, publicId:string, status:string}, iindex:String): any;
}

/**
 * Display a box content with icon, A display text, and a sub text
 */
const DisplaySection: React.FC<Props> = ({ icon, displayText, subText, removeImage }, i) => {
  return (
    // <div className={`min-w-max min-h-[160px] bg-glitch-box p-5 text-left rounded`}>
    //   <div className="text-lg font-semibold text-slate-500">
    //     $110.00
    //   </div>
      
    //   <div>
    //     <img src={icon} alt="Total sales" className="w-14 h-14" />
    //   </div>
    //   <div className="text-white font-black text-2xl mt-5">{displayText}</div>
    //   <div className="text-white text-base">{subText}</div>
    // </div>
    // <div className="grid grid-flow-col grid-rows-2 grid-cols-3 gap-8">
    //   <div className="blur">
    //     <img src={icon} alt="" loading="lazy"/>
    //   </div>
    //   <div className="col-start-3 sepia">
    //     <img src={icon} alt="" loading="lazy"/>
    //   </div>
    <>
      <div className="relative max-w-xs overflow-hidden bg-cover bg-no-repeat" key={subText}>
        <img src={icon.url} alt="" loading="lazy" />
        
        <div className="absolute bottom-0 left-0 right-0 top-0 overflow-hidden 
          bg-[hsl(0,79.87%,30.99%,69%)] bg-fixed opacity-0 transition duration-300 
          ease-in-out hover:opacity-100 flex justify-center items-center" 
          onClick={() => removeImage(icon,subText)}>
          <span className="material-icons-outlined mr-7">
              delete
          </span>
        </div>
      </div>
      
     </>
    //   <div className="grayscale">
    //     <img src={icon} alt="" loading="lazy"/>
    //   </div>
    //   <div className="row-start-1 col-start-2 col-span-2 invert">
    //     <img src={icon} alt="" loading="lazy"/>
    //   </div>
    // </div>
  );
};

export default DisplaySection;
