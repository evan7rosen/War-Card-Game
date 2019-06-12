axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => {
    let deckId = response.data.deck_id
    let dealerWins = 0
    let playerWins = 0
    let dealBtn = document.getElementById("deal-btn")
    let dealerCard = document.getElementById("dealer-card")
    let playerCard = document.getElementById("player-card")
    console.log(dealerCard)
    console.log(playerCard)
    let newDealerCard = document.createElement("img")
    let newPlayerCard = document.createElement("img")
    let scoreBoard = document.getElementById("score-board")

    dealerCard.appendChild(newDealerCard)
    playerCard.appendChild(newPlayerCard)
    dealBtn.addEventListener("click", deal)

    function deal() {
        axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`).then(response2 => {
            let card1val = response2.data.cards[0].value
            let card2val = response2.data.cards[1].value
            let card1img = response2.data.cards[0].image
            let card2img = response2.data.cards[1].image
            let remaining = response2.data.remaining
            newDealerCard.src = card1img
            newPlayerCard.src = card2img

            if (card1val === "JACK") {
                card1val = '11'
            } else if (card1val === "QUEEN") {
                card1val = '12'
            } else if (card1val === "KING") {
                card1val = '13'
            } else if (card1val === "ACE") {
                card1val = '14'
            }
            if (card2val === "JACK") {
                card2val = '11'
            } else if (card2val === "QUEEN") {
                card2val = '12'
            } else if (card2val === "KING") {
                card2val = '13'
            } else if (card2val === "ACE") {
                card2val = '14'
            }
            let card1valNum = Number(card1val)
            let card2valNum = Number(card2val)

            console.log('post-dealer', card1valNum)
            console.log('post-player', card2valNum)
            console.log('type-dealer', typeof card1valNum)
            console.log('type-player', typeof card2valNum)

            if (card1valNum > card2valNum) {
                console.log('you lose')
                dealerWins++
            } else if (card2valNum > card1valNum) {
                console.log('you win')
                playerWins++
            } else if (card1valNum === card2valNum) {
                console.log('tie game')
            }
            scoreBoard.innerHTML = `<p> Player: ${playerWins}, </p> <p> Dealer: ${dealerWins} </p> <p> Cards Remaining: ${remaining} </p>`
        })
    }




    // let newGameBtn = document.getElementById("new-game-btn")
    // newGameBtn.addEventListener("click", newGame())
    // function newGame() {
    //     axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => {
    //         let deckId = response.data.deck_id
    //         let remaining = response.data.remaining
    //         console.log('deck ID', deckId)
    //         console.log('cards remaining', remaining)
    //     })
    // }
})