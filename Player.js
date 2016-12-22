class Player {
  static get VERSION() {
    return '0.1';
  }

  static betRequest(gameState) {
    for (var player in gameState.players) {
      if(player.name === "M und M") {
        for (var card in player.hole_cards) {
            if(card.rank === "A" || card.rank === "K" || card.rank === "Q" || card.rank === "J" || card.rank === "10") {
              return 10;
            }
        }
      }
    }

    return 0;
  }

  static showdown(gameState) {
  }
}

module.exports = Player;
