export default function PrettyInput( { className, ...props } ) {
    return <input className={` ${className} ml-2 px-2 py-1 text-black dark:text-white bg-stone-100 dark:bg-stone-800`} {...props} />
}