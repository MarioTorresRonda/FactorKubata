import { useRef, useImperativeHandle, forwardRef } from "react";

const Modal = forwardRef( function Modal( {children, title, submit, onSubmit, submitText, cancelText }, ref ) {
    const modal = useRef();

    useImperativeHandle(ref, () => {
        return {
            open: () => {
            modal.current.showModal();
            },
            close: () => {
            modal.current.close();
            }
        };
    });

    return ( 
        <dialog className="text-slate-800 dark:text-stone-200 bg-stone-200 dark:bg-stone-900 shadow-md shadow-black/60 w-[80%] md:max-w-[500px] xl:max-w-[920px] transition animate-fromTop" ref={modal} >
            <div className="color-fondo w-full">
                <div className="mx-1 p-4 bg-stone-200 dark:bg-stone-900">
                    <h2 className="text-2xl md:text-5xl mb-4"> {title} </h2>
                    <div className="text-slate-600 dark:text-stone-400 mb-4">
                    {children}
                    </div>
                    <div className="flex flex-wrap justify-between gap-1 *:rounded-md *:px-4 *:py-2 *:transition-all *:duration-500">
                        <button onClick={() => { modal.current.close()} } className="bg-stone-400 dark:bg-stone-600 hover:bg-stone-500 text-button"> {cancelText} </button>
                        { submit && <button onClick={onSubmit} className=" bg-[--myColorStartSimple] hover:bg-[--myColorEndHover] text-stone-900 px-0.5 py-1.5"> {submitText} </button> }
                    </div>
                </div>
            </div>
        </dialog> 
    );

} );

export default Modal;