axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1').then(response => {
    let deckId = response.data.deck_id
    let dealerWins = 0
    let playerWins = 0
    let dealBtn = document.getElementById("deal-btn")
    let dealerCard = document.getElementById("dealer-card")
    let playerCard = document.getElementById("player-card")
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
            let remaining = response2.data.remaining
            newDealerCard.src = response2.data.cards[0].image
            newPlayerCard.src = response2.data.cards[1].image

            function cardValtoNum(val) {
                if (val === "JACK") {
                    val = '11'
                } else if (val === "QUEEN") {
                    val = '12'
                } else if (val === "KING") {
                    val = '13'
                } else if (val === "ACE") {
                    val = '14'
                }
                return Number(val)
            }

            let card1valNum = cardValtoNum(card1val)
            let card2valNum = cardValtoNum(card2val)

            if (card1valNum > card2valNum) {
                dealerWins++
                setTimeout(function () { alert('you lose') }, 300)
            } else if (card2valNum > card1valNum) {
                playerWins++
                setTimeout(function () { alert('you win') }, 300)
            } else if (card1valNum === card2valNum) {
                setTimeout(function () { alert('tie game') }, 300)
            }
            scoreBoard.innerHTML = `<h1>Score Board:</h1> <p> Player: ${playerWins} </p> <p> Dealer: ${dealerWins} </p> <p> Cards Remaining: ${remaining} </p>`
        })
    }
})