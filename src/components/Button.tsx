interface ButtonProps{
    title: string,
    isExcel: boolean
}

export const Button = (props: ButtonProps) => {
    return(
        <button type="submit" className={`
            bg-green-500 text-white
            w-fit px-4 py-2
            shadow-xl
            ${props.isExcel ? "hover:bg-green-400" : "cursor-not-allowed bg-zinc-300"}
        `}>{props.title}</button>
    )
}