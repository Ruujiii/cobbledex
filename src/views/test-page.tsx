import Plx from "react-plx";
import { scene_1, scene_1_1, scene_2, scene_3 } from "@/assets/config";
export const TestPage = () => {
    return (
        <div style={{ overflow: "hidden" }}>
            <Plx className="overflow-hidden"
                parallaxData={[
                    {
                        start: 0,
                        end: 1500,
                        properties: [
                            {
                                startValue: 1,
                                endValue: 3,
                                property: "scale",
                            },
                        ],
                    },
                ]}

            >
                <img src={scene_2} alt="scene_2" className="overflow-none" />
            </Plx>
            <Plx className="overflow-hidden"
                parallaxData={[
                    {
                        start: 1500,
                        end: 3000,
                        properties: [
                            {
                                startValue: 1,
                                endValue: 0,
                                property: "opacity",
                            },
                        ],
                    },
                ]}

            >
                <div className="p-4 w-full h-svh bg-black text-white">
                    Rodjean Gere
                </div>
                <img src={scene_3} alt="scene_3" className="overflow-none" />
            </Plx>
        </div>
    );
};