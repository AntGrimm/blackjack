const cardRanks = [
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
]

const cardSuits = ['Clubs', 'Diamonds', 'Hearts', 'Spades']

let deck = []
let playerHand = []
let dealerHand = []

const createDeck = () => {
  deck = []
  cardSuits.forEach(suit => {
    cardRanks.forEach(rank => {
      deck.push({
        rank: rank.name,
        value: rank.value,
        suit: suit,
        image: `./images/${rank.name}_of_${suit}.svg`
      })
    })
  })
  console.log(deck)
}

const shuffleDeck = () => {
  for (let i = deck.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * i)
    const firstArray = deck[i]
    const secondArray = deck[j]
    deck[i] = secondArray
    deck[j] = firstArray
  }
  console.log(deck)
}

const playerDrawCard = () => {
  // remove card from the deck
  const dealtCard = deck.pop()
  // add to the player hand
  playerHand.push(dealtCard)
  // Create an li and image tag
  const li = document.createElement('li')
  const image = document.createElement('img')
  // set content of li and image tag
  image.src = dealtCard.image
  li.appendChild(image)
  // add li tag to the dom
  document.querySelector('.player-hand-cards').appendChild(li)
}

const dealerDrawCard = () => {
  const dealtCard = deck.pop()
  dealerHand.push(dealtCard)
  const li = document.createElement('li')
  const image = document.createElement('img')
  image.src = dealtCard.image
  li.appendChild(image)
  document.querySelector('.dealer-hand-cards').appendChild(li)
}

const dealPlayerHand = () => {
  for (let i = 0; i < 2; i++) {
    playerDrawCard()
  }
  console.log(playerHand)
}

const dealDealerHand = () => {
  const playerHandValue = document.querySelector('.player-hand-value')
  const playerName = document.querySelector('.player-name')
  const dealerName = document.querySelector('.dealer-name')
  getPlayerHandTotal()
  if (playerHandValue.textContent === 21) {
    playerName.textContent = 'Player Wins!'
    dealerName.textContent = 'Dealer Loses!'
    addRemoveButtonsValues()
  } else {
    for (let i = 0; i < 2; i++) {
      dealerDrawCard()
    }
  }
  console.log(dealerHand)
}

const getPlayerHandTotal = () => {
  const playerHandValue = document.querySelector('.player-hand-value')
  const playerHandTotal = playerHand.reduce((runningTotal, card) => {
    return runningTotal + card.value
  }, 0)
  playerHandValue.textContent = playerHandTotal
  console.log(playerHandTotal)
}

const getDealerHandTotal = () => {
  const dealerHandValue = document.querySelector('.dealer-hand-value')
  const dealerHandTotal = dealerHand.reduce((runningTotal, card) => {
    return runningTotal + card.value
  }, 0)
  dealerHandValue.textContent = dealerHandTotal
  console.log(dealerHandTotal)
}

// adds hit/stand buttons and removes reset, dealer hand value
const addRemoveButtonsValues = () => {
  document.querySelector('.hit').classList.add('hide')
  document.querySelector('.stand').classList.add('hide')
  document.querySelector('.reset').classList.remove('hide')
}

// press hit button
const playerHit = () => {
  const playerHandValue = document.querySelector('.player-hand-value')
  const playerName = document.querySelector('.player-name')
  const dealerName = document.querySelector('.dealer-name')
  for (let i = 0; i < 1; i++) {
    playerDrawCard()
    getPlayerHandTotal()
    if (playerHandValue.textContent > 21) {
      playerName.textContent = 'Player Bust!'
      dealerName.textContent = 'Dealer Wins!'
      addRemoveButtonsValues()
    }
  }
  console.log(playerHand)
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
      dealerDrawCard()
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
    playerName.textContent = 'Push!'
    dealerName.textContent = 'Push!'
  }
  console.log(dealerHand)
}

const resetGame = () => {
  const playerName = document.querySelector('.player-name')
  const dealerName = document.querySelector('.dealer-name')
  playerHand = []
  dealerHand = []
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
document.querySelector('.hit').addEventListener('click', playerHit)
document.querySelector('.reset').addEventListener('click', resetGame)
document.querySelector('.stand').addEventListener('click', playerStand)
