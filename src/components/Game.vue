<template>
  <main>
    <section>
      <h1>Welcome to Celestia</h1>
      <div>
        <h3>Total Playable Cards: {{ totalCards }}</h3>
        <ul>
          <li v-for="card in cards" :key="card.name">{{ card.name }}: {{ card.count }}</li>
        </ul>
      </div>
      <div>
        <h3>Cities: {{ cities.length }}</h3>
        <ul>
          <li v-for="city in cities" :key="city.id">
            <p>{{ city.name }}</p>
            <p>{{ getCardsLeftInCity(city) }} reward cards</p>
            <p>{{ city.dice }} dice</p>
            <ul>
              <h5>Reward Cards</h5>
              <li v-for="reward in city.rewards" :key="reward.value">{{ reward.count }} cards of value {{ reward.value }}</li>
            </ul>
          </li>
        </ul>
      </div>
    </section>
    <section>
      <div>
        <h3>Players: {{ players.length }}</h3>
        <ul>
          <li v-for="player in players" :key="player.id">{{ player.name }} ({{ player.color }}): {{ player.score }} points</li>
        </ul>
        <input v-model="newPlayer.name" name="name" placeholder="Enter Name..." />
        <input v-model="newPlayer.color" name="color" placeholder="Enter Color..." />
        <button @click="addPlayer()">Add Player</button>
      </div>
      <div v-if="game.started">
        <div>
          <h4>Ship: Players on board: {{ game.ship.players.length }}</h4>
          <p>Current City: {{ game.ship.city.name }} | Next City: <span v-if="game.ship.nextCity">{{ game.ship.nextCity.name }}</span><span v-else>None</span></p>
        </div>
        <div>
          <h4>Captain: {{ game.captain.name }} ({{ game.captain.color }})</h4>
          <h4>Passengers:</h4>
          <p v-for="player in notCaptain" :key="player.id">{{ player.name }} ({{ player.color }})</p>
        </div>
        <div>
          <div v-if="game.dice && game.dice.length > 0">
            <h4>Dice Rolled:</h4>
            <p v-for="(die, index) in game.dice" :key="index">{{ die }}</p>
          </div>
          <div v-else>
            <button @click="rollDice">Roll Dice</button>
          </div>
        </div>
      </div>
      <div v-else>
        <button @click="reset">Start Game</button>
      </div>
    </section>
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
        console.log(deck)
        for (let i = 0; i < num; i++) {
          const random = Math.floor(Math.random() * deck.length)
          hand.push(deck[random])
          deck.splice(random, 1)
        }
        this.updatePlayerHand({player: p, hand: hand})
        this.updateCards(deck)
      })
    }
  },
  created() {
    // Init die
    this.die = [this.dice_faces.BLANK, this.dice_faces.BLUE, this.dice_faces.RED, this.dice_faces.YELLOW, this.dice_faces.BLACK, this.dice_faces.BLANK]
  }
}
</script>

<style lang="scss" scoped>
  main {
    display: grid;
    grid-template-columns: 1fr 1fr;
  }

  h3,
  h5,
  ul {
    margin: 0.5rem;
  }

  ul {
    padding-bottom: 0.5rem;
    li{
      padding-top: 0.5rem;
    }
  }
</style>
