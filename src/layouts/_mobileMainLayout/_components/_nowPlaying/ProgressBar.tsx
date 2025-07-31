import { Slider } from '../../../../components/ui/slider'

const ProgressBar = () => {
    return (
        <div className="px-6 py-2 flex-shrink-0">
            <div className="w-full rounded-full h-1">
                <Slider
                    defaultValue={[0]}
                    className="w-full cursor-grab"
                />
            </div>
            <div className="flex items-center justify-between text-white/70 text-[12px] mt-1">
                <span>{"0:00"}</span>
                <span>{"4:55"}</span>
            </div>
        </div>
    )
}

export default ProgressBar