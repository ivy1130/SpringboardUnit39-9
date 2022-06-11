import React from "react";

const DrawButton = ({addCard}) => {
  const handleClick = () => {
    addCard()
  }

  return (
    <button onClick={handleClick}>Add Card</button>
  )
}

export default DrawButton