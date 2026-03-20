"use client";
import useCanvasCursor from "./useCanvasCursor";

const CanvasCursor = () => {

    useCanvasCursor();
    return (
        <div>
            <canvas
                className="pointer-events-none fixed inset-0 z-[100] hidden lg:block"
                id="canvas"
            />
        </div>
    );
};

export default CanvasCursor;
