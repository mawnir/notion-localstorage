import Emptyimg from "../../assets/reading.png";

export const Heroes = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative h-[400px] w-[400px] hidden sm:block">
                    <img
                        src={Emptyimg}
                        className="object-contain"
                        alt="Reading"
                    />
                </div>
            </div>
        </div>
    )
}