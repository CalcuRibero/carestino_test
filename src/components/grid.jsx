import { useState } from "react"

export const Grid = ({ isActive, idx, isHolding, changeHolding, color}) => {
    const [active, setActive] =  useState(isActive)

    const handleMouseDown = () => {
        changeHolding({index: idx, holdingState: true})
        setActive(!active)
    }
    
    const handleMouseUp = () => {
        changeHolding({index: idx, holdingState: false})
        setActive(true)
    }
    
    const handleMouseEnter = () => {
        if(isHolding) {
            changeHolding({index: idx, holdingState: true})
            setActive(true)
        }
    } 

    return(
        <>
            <button className={`grid-element ${active ? "active" : ""}`}
                style={
                    { 
                        backgroundColor: active ? color : "white",
                    }
                }
                onClick={() => setActive(!active)}    
                onMouseDown={() => handleMouseDown()}
                onMouseEnter={() => handleMouseEnter()}
                onMouseUp={() => handleMouseUp()}
            >
            </button>
        </>
    )
}