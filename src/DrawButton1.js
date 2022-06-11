import React from "react";

const DrawButton1 = ({addCard}) => {
  const handleClick = () => {
    addCard()
  }

  return (
    <button onClick={handleClick}>Add Card</button>
  )
}

export default DrawButton1