import './App.css'
import { Grid } from './components/grid'
import { ModalColor } from './components/modal'
import { useState, useRef,  Suspense } from 'react'

function App() {
  const [holding, setHolding] = useState(false)
  const [activeColorWin, setColorWin] = useState(false)
  const [modalPosition, setPosition] = useState({x: 0, y: 0})
  const [currentColor, setColor] =  useState("black")
  
  const modalRef = useRef(null)

  const size = innerWidth/100
  const gridsCount = Math.ceil(((innerHeight * innerWidth)/Math.pow(size, 2))/100)*100
  const initialMatrix = Array.from({length: gridsCount}, () => ({isActive: false, color: "black"}))
  
  const [matrix, setMatrix] = useState(initialMatrix)

  const handleColor = (e) => {
    setColor(e.target.value)
  }

  const handleVisibility = (isVisible) => {
    setColorWin(isVisible)
  } 

  const changeHolding = ({index, holdingState}) => {
    setHolding(holdingState)
    let updatedMatrix = matrix
    updatedMatrix[index] = {...updatedMatrix, color: currentColor}
    setMatrix([...updatedMatrix])
  }
  
  const handleOnContextMenu = (e) => {
    e.preventDefault()
    let {pageX, pageY} = e
    setColorWin(true)
    setPosition({x: pageX, y: pageY})
    modalRef.current.className = "modal"
  }

  
  const handleMouseOut = (e) => {
    e.preventDefault()
    setTimeout(3000)
    handleVisibility(false)
    modalRef.current.className = "modal-unmount"
    setTimeout(() => {
      modalRef.current.className = "modal-none"
    }, 1000)
  }
                
  return (
    <>
      <Suspense fallback={<h1>Loading...</h1>} >
        <ModalColor
            className='modal-none'
            ref={modalRef}
            changeVisibility={handleVisibility}
            x = {modalPosition.x}
            y = {modalPosition.y} 
            onMouseOut = {handleMouseOut}   
        >
          <div>
            <input type="color" onChange={handleColor} placeholder="Color Picker"/>
            <label>Color Picker</label>
          </div>
        </ModalColor>
        <div className='grid-group' onContextMenu={handleOnContextMenu}>
          {matrix.map(({isActive, color}, idx) => 
            <Grid isActive={isActive} idx={idx} key={idx} isHolding={holding} color={color} changeHolding={changeHolding}/>
          )}
        </div>
      </Suspense>
    </>
  )
}

export default App
