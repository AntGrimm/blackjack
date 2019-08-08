const state = {
  cardRanks: [
    { name: 'Ace', value: 11 },
    { name: '2', value: 2 },
    { name: '3', value: 3 },
    { name: '4', value: 4 },
    { name: '5', value: 5 },
    { name: '6', value: 6 },
    { name: '7', value: 7 },
    { name: '8', value: 8 },
    { name: '9', value: 9 },
    { name: '10', value: 10 },
    { name: 'Jack', value: 10 },
    { name: 'Queen', value: 10 },
    { name: 'King', value: 10 }
  ],
  cardSuits: ['Clubs', 'Diamonds', 'Hearts', 'Spades'],

  deck: [],
  playerHand: [],
  dealerHand: []
}

const createDeck = () => {
  state.deck = []
  for (let i = 0; i < state.cardSuits.length; i++) {
    const suit = state.cardSuits[i]
    for (let j = 0; j < state.cardRanks.length; j++) {
      const rank = state.cardRanks[j]
      state.deck.push({
        rank: rank.name,
        value: rank.value,
        suit: suit
      })
    }
  }
  console.log(state.deck)
}

const shuffleDeck = () => {
  for (let i = state.deck.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i)
    const firstArray = state.deck[i]
    const secondArray = state.deck[j]
    state.deck[i] = secondArray
    state.deck[j] = firstArray
  }
  console.log(state.deck)
}

const dealPlayerHand = () => {
  for (let i = 0; i < 2; i++) {
    // remove card from the deck
    const dealtCard = state.deck.pop()
    // add to the player hand
    state.playerHand.push(dealtCard)
  }
  console.log(state.playerHand)
}

const dealDealerHand = () => {
  const playerHandValue = document.querySelector('.player-hand-value')
  const playerName = document.querySelector('.player-name')
  const dealerName = document.querySelector('.dealer-name')
  for (let i = 0; i < 2; i++) {
    // remove card from the deck
    const dealtCard = state.deck.pop()
    // add to the dealer hand
    state.dealerHand.push(dealtCard)
  }
  getPlayerHandTotal()
  if (playerHandValue.textContent === 21) {
    playerName.textContent = 'Player Wins!'
    dealerName.textContent = 'Dealer Loses!'
    addRemoveButtonsValues()
  }
  console.log(state.dealerHand)
}

const getPlayerHandTotal = () => {
  // go to each card
  const playerHandValue = document.querySelector('.player-hand-value')
  let playerHandTotal
  for (let i = 0; i < state.playerHand.length; i++) {
    const card = state.playerHand[i]
    // add the current card value to a hand total
    if (playerHandTotal) {
      playerHandTotal += card.value
    } else {
      playerHandTotal = card.value
    }
  }
  // display the total
  playerHandValue.textContent = playerHandTotal
  console.log(playerHandTotal)
}

const getDealerHandTotal = () => {
  // Check the value
  const dealerHandValue = document.querySelector('.dealer-hand-value')
  let dealerHandTotal
  for (let i = 0; i < state.dealerHand.length; i++) {
    const card = state.dealerHand[i]
    if (dealerHandTotal) {
      dealerHandTotal += card.value
    } else {
      dealerHandTotal = card.value
    }
  }
  dealerHandValue.textContent = dealerHandTotal
  console.log(dealerHandTotal)
}

// adds hit/stand buttons and removes reset, dealer hand value
const addRemoveButtonsValues = () => {
  document.querySelector('.hit').classList.add('hide')
  document.querySelector('.stand').classList.add('hide')
  document.querySelector('.reset').classList.remove('hide')
  document.querySelector('.dealer-hand-value').classList.remove('hide')
}

// press hit button
const playerDrawCard = () => {
  const playerHandValue = document.querySelector('.player-hand-value')
  const playerName = document.querySelector('.player-name')
  const dealerName = document.querySelector('.dealer-name')
  for (let i = 0; i < 1; i++) {
    // remove card from the deck
    const dealtCard = state.deck.pop()
    // add to the player hand
    state.playerHand.push(dealtCard)
  }
  // Determine when player busts
  getPlayerHandTotal()
  if (playerHandValue.textContent > 21) {
    playerName.textContent = 'Player Bust!'
    dealerName.textContent = 'Dealer Wins!'
    addRemoveButtonsValues()
  } else if (playerHandValue.textContent === 21) {
    playerName.textContent = 'Player Wins!'
    dealerName.textContent = 'Dealer Loses!'
    addRemoveButtonsValues()
  }
  console.log(state.playerHand)
}

// When player hits stand button
const playerStand = () => {
  const dealerHandValue = document.querySelector('.dealer-hand-value')
  const playerHandValue = document.querySelector('.player-hand-value')
  const dealerName = document.querySelector('.dealer-name')
  const playerName = document.querySelector('.player-name')

  addRemoveButtonsValues()

  while (dealerHandValue.textContent < 17) {
    for (let i = 0; i < 1; i++) {
      const dealtCard = state.deck.pop()
      // add to dealer hand
      state.dealerHand.push(dealtCard)
      getDealerHandTotal()
    }
  }

  // Determine when dealer busts and who is the winner
  getDealerHandTotal()
  getPlayerHandTotal()
  if (dealerHandValue.textContent > 21) {
    playerName.textContent = 'Player Wins!'
    dealerName.textContent = 'Dealer Bust!'
  } else if (dealerHandValue.textContent > playerHandValue.textContent) {
    playerName.textContent = 'Player Loses!'
    dealerName.textContent = 'Dealer Wins!'
  } else if (dealerHandValue.textContent < playerHandValue.textContent) {
    playerName.textContent = 'Player Wins!'
    dealerName.textContent = 'Dealer Loses!'
  } else if (dealerHandValue.textContent === playerHandValue.textContent) {
    playerName.textContent = 'Draw!'
    dealerName.textContent = 'Draw!'
  }
  console.log(state.dealerHand)
}

const resetGame = () => {
  const playerName = document.querySelector('.player-name')
  const dealerName = document.querySelector('.dealer-name')
  state.playerHand = []
  state.dealerHand = []
  createDeck()
  shuffleDeck()
  dealPlayerHand()
  dealDealerHand()
  getPlayerHandTotal()
  getDealerHandTotal()
  playerName.textContent = 'Player'
  dealerName.textContent = 'Dealer'
  document.querySelector('.hit').classList.remove('hide')
  document.querySelector('.stand').classList.remove('hide')
  document.querySelector('.reset').classList.add('hide')
  document.querySelector('.dealer-hand-value').classList.add('hide')
}

const main = () => {
  createDeck()
  shuffleDeck()
  dealPlayerHand()
  dealDealerHand()
  getPlayerHandTotal()
  getDealerHandTotal()
}

document.addEventListener('DOMContentLoaded', main)
document.querySelector('.hit').addEventListener('click', playerDrawCard)
document.querySelector('.reset').addEventListener('click', resetGame)
document.querySelector('.stand').addEventListener('click', playerStand)
