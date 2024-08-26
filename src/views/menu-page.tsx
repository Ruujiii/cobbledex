import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { setColor } from "@/features/button/button-slice";
export const MenuPage = () => {
    // Make a button, that will change from blue to red, everytime its clicked...
    
    const color = useAppSelector((state) => state.reducer.button?.color);
    const dispatch = useDispatch();
    return (
        <>
            <button
                className={`${color == "blue"? "bg-blue-300" : "bg-red-300"} outline-none border-none text-white p-4 rounded-lg`} 
                onClick={() => {
                    if(color == "blue")
                        dispatch(setColor("red"));
                    else 
                        dispatch(setColor("blue"));
                }}>
                    Toggle 
            </button> 
        </>
    );
};