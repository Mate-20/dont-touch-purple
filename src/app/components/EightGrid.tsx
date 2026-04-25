import { useGame, gridType } from "../hooks/useGame";

interface EightGridProps {
    gridArray: gridType[];
    handleColorClick: (index: number) => void;
}

const EightGrid = ({ gridArray, handleColorClick }: EightGridProps) => {

    return (
        <div className="border border-[#59475b] rounded-lg p-1">
            <div className="grid grid-cols-2 gap-1 ">
                {gridArray.map((value: gridType, key: number) => (
                    <div onClick={() => handleColorClick(key)} key={key} 
                    className="w-[150px] h-[130px] rounded-sm border border-[#3d2f3f]"
                    style={{ backgroundColor: value.color, boxShadow: `1px 0px 20px ${value.color}`, }}
                    ></div>
                ))}
            </div>
        </div>

    )
}
export default EightGrid;