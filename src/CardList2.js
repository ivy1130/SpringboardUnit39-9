// Change the behavior of the app, so that when you click on the button, rather than drawing a single card, the page will draw one card every second.

// These draws will continue until you press the button again, or until the deck has been exhausted (at which point the alert message from Part 1 should appear). Make sure to change the button text appropriately as well (for example, it could toggle between “Start drawing” and “Stop drawing.”

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid"
import Card from "./Card"
import DrawButton2 from "./DrawButton2";

// Start with button showing start drawing
// click on it, 

const CardList2 = () => {
  const [deckRef, setDeckRef] = useState(null);
  const [cards, setCards] = useState([])
  const [isDrawing, setIsDrawing] = useState(false)
  const timerRef = useRef()

  useEffect(function fetchCardDeckWhenMounted() {
    async function fetchCardDeck() {
      const deckResult = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/")
      setDeckRef(`http://deckofcardsapi.com/api/deck/${deckResult.data.deck_id}`)
    }
    fetchCardDeck()
  }, [])

  useEffect(function drawCards() {
    if (isDrawing && !timerRef.current) {
      timerRef.current = setInterval(async () => {
        await addCard();
      }, 1000);
    }

    const addCard = () => {
      async function fetchNewCard() {
        const newCardResult = await axios.get(`${deckRef}/draw`)
        const { error } = newCardResult.data
        if (error) {
          alert(`Error: no cards remaining!`)
          setIsDrawing(false)
        }
        else {
          const { value, suit } = newCardResult.data.cards[0]
          const newCard = `${value} of ${suit}`
          setCards([...cards, newCard])
        }
      }
      return fetchNewCard()
    }

    return () => {
      clearInterval(timerRef.current);
      timerRef.current = null;
    };
  }, [isDrawing, cards, deckRef])

  const toggleIsDrawing = () => {
    setIsDrawing(!isDrawing)
  }

  

  return (
    <div>
      <DrawButton2 isDrawing={isDrawing} toggleIsDrawing={toggleIsDrawing} />
      <ul>
        {cards.map((card) => <Card card={card} key={uuid()}/>)}
      </ul>
    </div>
  )
}

export default CardList2