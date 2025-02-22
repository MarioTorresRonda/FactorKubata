export default function ColoredButton( { children, ...props } ) {
    return <>
        <div className="color-fondo w-5 h-16 items-center rounded-[4px] overflow-hidden" {...props}>
            {children}
        </div>
    </>
}