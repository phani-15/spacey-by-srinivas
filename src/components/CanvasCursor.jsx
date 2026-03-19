"use client";
import useCanvasCursor from "./useCanvasCursor";
import { useEffect, useState } from "react";

const CanvasCursor = () => {
    // const [isTouchDevice, setIsTouchDevice] = useState(false);

    // useEffect(() => {
    //     const checkTouchDevice = () => {
    //         const hasTouch = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    //         setIsTouchDevice(hasTouch);
    //     };

    //     checkTouchDevice();
    // }, []);

    useCanvasCursor();
    return (
        <div>
            {/* {!isTouchDevice && ( */}
                <canvas
                    className="pointer-events-none fixed inset-0 z-[100] hidden lg:block"
                    id="canvas"
                />
            {/* )} */}
        </div>
    );
};

export default CanvasCursor;
