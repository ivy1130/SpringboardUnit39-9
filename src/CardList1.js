// Build an app that displays a deck of cards, one card at a time. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card.

// Every time you click the button, display a new card, until there are no cards left in the deck. If you try to draw when there are no cards remaining, an alert message should appear on the screen with the text “Error: no cards remaining!”.

import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid"
import Card from "./Card"
import DrawButton1 from "./DrawButton1";

const CardList1 = () => {
  const [deckRef, setDeckRef] = useState(null);
  const [cards, setCards] = useState([])

  useEffect(function fetchCardDeckWhenMounted() {
    async function fetchCardDeck() {
      const deckResult = await axios.get("http://deckofcardsapi.com/api/deck/new/shuffle/")
      setDeckRef(`http://deckofcardsapi.com/api/deck/${deckResult.data.deck_id}`)
    }
    fetchCardDeck()
  }, [])
  
  const addCard = () => {
    async function fetchNewCard() {
      const newCardResult = await axios.get(`${deckRef}/draw`)
      const { error } = newCardResult.data
      if (error) {
        alert(`Error: no cards remaining!`)
      }
      else {
        const { value, suit } = newCardResult.data.cards[0]
        const newCard = `${value} of ${suit}`
        setCards([...cards, newCard])
      }
    }
    fetchNewCard()
  }

  return (
    <div>
      <DrawButton1 addCard={addCard} />
      <ul>
        {cards.map((card) => <Card card={card} key={uuid()}/>)}
      </ul>
    </div>
  )
}

export default CardList1