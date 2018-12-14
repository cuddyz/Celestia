<template>
  <main class="m-2">
    <h1>Celestia</h1>
    <h2 class="small" v-if="game.started">Deck: {{ totalCards }}</h2>
    <article v-if="!game.started" class="flex column align-center">
      <h3>Players: {{ players.length }}</h3>
      <section>
        <ul class="flex column align-center m-1">
          <li v-for="player in players" :key="player.id">{{ player.name }} (<span :class="colorMap(player.color)">{{ player.color }}</span>)</li>
        </ul>
        <div class="flex m-1">
          <input type="text" v-model="newPlayer.name" name="name" placeholder="Enter Name..." class="mr-1" />
          <input type="text" v-model="newPlayer.color" name="color" placeholder="Enter Color..." class="mr-1" />
          <button @click="addPlayer()">Add Player</button>
        </div>
      </section>
      <section>
        <button @click="reset">Start Game</button>
      </section>
    </article>
    <article v-else class="flex column align-center">
      <section class="center">
        <div class="mb-1">
          <h2>Players still on board: {{ game.ship.players.length }}</h2>
          <div class="flex center">
            <div class="flex column">
              <h4 class="pr-1 normal">Current City: <span class="bolder">{{ game.ship.city.name }}</span></h4>
              <p class="smallest italic">{{ cityCardsLeft(game.ship.city.id)}} rewards left.</p>
            </div>
            <div class="flex-column">
              <h4 class="normal">Next City: <span class="bolder" v-if="game.ship.nextCity">{{ game.ship.nextCity.name }}</span><span class="bolder" v-else>None</span></h4>
              <p class="smallest italic">{{ cityCardsLeft(game.ship.nextCity.id)}} rewards left.</p>
            </div>
          </div>
        </div>
        <div class="text-left flex column align-center">
          <h4 class="mt-1 mb-50 center boldest">Captain: {{ game.captain.name }} (<span :class="colorMap(game.captain.color)">{{ game.captain.color }}</span>)</h4>
          <h4 class="mb-50 center">Passengers:</h4>
          <div class="mb-1" v-for="player in players" :key="player.id">
            <p class="boldest">{{ player.name }} (<span :class="colorMap(player.color)">{{ player.color }}</span>)</p>
            <div>
              <p v-for="card of player.hand" :key="card.name" class="smaller bolder"><span :class="colorMap(card.name)">{{ card.name }}:</span><span class="large pl-50">{{ card.count }}</span></p>
            </div>
          </div>
        </div>
        <div class="mt-1">
          <div v-if="game.dice && game.dice.length > 0">
            <h4>Dice Rolled:</h4>
            <p class="capitalize" :class="colorMap(die)" v-for="(die, index) in game.dice" :key="index">{{ die }}</p>
          </div>
          <div v-else>
            <button @click="rollDice">Roll Dice</button>
          </div>
        </div>
      </section>
    </article>
  </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Game',
  computed: {
    ...mapGetters('cards', {cards: 'list', deck: 'getDeck', totalCards: 'cardsLeft'}),
    ...mapGetters('cities', {cities: 'list', cityCardsLeft: 'cityCardsLeft', startingCity: 'startingCity', nextCity: 'nextCity'}),
    ...mapGetters('players', {players: 'list'}),
    notCaptain: function() {
      if (this.game.captain) {
        return this.players.filter(p => p.id !== this.game.captain.id)
      }
      return []
    }
  },
  data() {
    return {
      newPlayer: {
        name: '',
        color: ''
      },
      dice_faces: {
        BLANK: 'blank',
        BLUE: 'blue',
        RED: 'red',
        YELLOW: 'yellow',
        BLACK: 'black'
      },
      die: [],
      game: {
        started: false,
        captain: '',
        dice: [],
        ship: {
          location: '',
          players: []
        }
      }
    }
  },
  methods: {
    ...mapActions('players', {createPlayer: 'create', updatePlayerHand: 'updatePlayerHand'}),
    ...mapActions('cards', ['updateCards']),
    getCardsLeftInCity(city) {
      return this.cityCardsLeft(city.id)
    },
    addPlayer() {
      this.createPlayer(this.newPlayer)
      this.newPlayer = {}
    },
    reset() {
      if (!this.game.started) {
        this.dealCards(8)
      } else {
        this.dealCards(1)
      }

      this.game = {
        started: true,
        captain: this.getNextCaptain(),
        dice: [],
        ship: {
          city: this.startingCity,
          nextCity: this.nextCity(this.startingCity.id),
          players: this.players
        }
      }
    },
    getNextCaptain() {
      if (!this.game.captain) {
        return this.players[0]
      } else {
        let currentIndex = this.players.findIndex(p => p.id === this.game.captain.id)
        currentIndex++
        if (currentIndex < this.players.length) {
          return this.players[currentIndex]
        } else {
          return this.players[0]
        }
      }
    },
    rollDice() {
      const numDice = this.game.ship.nextCity.dice
      let diceRolled = []
      for (let i = 0; i < numDice; i++) {
        const random = Math.floor(Math.random() * 6)
        diceRolled[i] = this.die[random]
      }
      this.$set(this.game, 'dice', diceRolled)
    },
    dealCards(num) {
      this.players.forEach(p => {
        let hand = [...p.hand]
        let deck = [...this.deck]
        for (let i = 0; i < num; i++) {
          const random = Math.floor(Math.random() * deck.length)
          hand.push(deck[random])
          deck.splice(random, 1)
        }

        this.updatePlayerHand({player: p, hand: hand})
        this.updateCards(deck)
      })
    },
    colorMap: function(name) {
      if (name.toLowerCase().includes('blue')) {
        return 'color-blue'
      } else if (name.toLowerCase().includes('yellow')) {
        return 'color-yellow'
      } else if (name.toLowerCase().includes('red')) {
        return 'color-red'
      } else if (name.toLowerCase().includes('black')) {
        return 'color-black'
      } else if (name.toLowerCase().includes('pink')) {
        return 'color-pink'
      } else if (name.toLowerCase().includes('green')) {
        return 'color-green'
      } else if (name.toLowerCase().includes('wild')) {
        return 'color-wild'
      } else if (name.toLowerCase().includes('blank')) {
        return 'color-blank'
      }
    }
  },
  created() {
    // Init die
    this.die = [this.dice_faces.BLANK, this.dice_faces.BLUE, this.dice_faces.RED, this.dice_faces.YELLOW, this.dice_faces.BLACK, this.dice_faces.BLANK]
  }
}
</script>
