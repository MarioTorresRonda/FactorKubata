export default function PrettyInput( { className, ...props } ) {
    return <input className={` ${className} ml-2 px-2 py-1 `} {...props} />
}