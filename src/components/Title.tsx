import arrow from "../assets/arrow_forward.svg"

export const Title = () => {
    return(
        <div className="flex gap-3 items-center">
            <span className="text-6xl">Excel</span>
            <img className="w-[3rem] h-auto" src={arrow} alt="Arrow to right direction" />
            <span className="text-6xl">CSV</span>
        </div>
    )
}