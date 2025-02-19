import { act, useState } from "react"

export const Grid = ({ isActive, idx, isHolding, changeHolding, color}) => {
    const [active, setActive] =  useState(isActive)

    const handleMouseDown = ({button}) => {
        if(button != 0) return
        changeHolding({index: idx, holdingState: !active})
        setActive(!active)
    }
    
    const handleMouseUp = () => {
        changeHolding({index: idx, holdingState: false})
        if(isHolding) {
            setActive(true)
        }
    }
    
    const handleMouseEnter = () => {
        if(isHolding) {
            changeHolding({index: idx, holdingState: true})
            setActive(true)
        }
    } 

    return(
        <>
            <button className={`grid-element`}
                style={
                    { 
                        backgroundColor: active ? color : "white",
                    }
                }   
                onMouseDown={handleMouseDown}
                onMouseEnter={() => handleMouseEnter()}
                onMouseUp={() => handleMouseUp()}
            >
            </button>
        </>
    )
}