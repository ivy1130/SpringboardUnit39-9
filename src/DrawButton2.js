import React from "react";

const DrawButton2 = ({isDrawing, toggleIsDrawing}) => {
  const handleClick = () => {
    toggleIsDrawing()
  }

  return (
    <button onClick={handleClick}>
      {isDrawing ? "Stop Drawing" : "Start Drawing"}
    </button>
  )
}

export default DrawButton2