export default function PrettySelect( { className, children, ...props  } ) {
    return <select className={` ${className} ml-2 px-2 py-1 text-black dark:text-white bg-stone-100 dark:bg-stone-800`} {...props} >
        {children}
    </select>
}