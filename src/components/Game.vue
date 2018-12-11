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
      <div v-if="game.captain">
        <h3>Ship: Current City: {{ game.ship.city.name }} | Players on board: {{ game.ship.players.length }}</h3>
        <h4>Captain: {{ game.captain.name }} ({{ game.captain.color }})</h4>
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
    ...mapGetters('cards', {cards: 'list', totalCards: 'cardsLeft'}),
    ...mapGetters('cities', {cities: 'list', cityCardsLeft: 'cityCardsLeft', startingCity: 'startingCity'}),
    ...mapGetters('players', {players: 'list'})
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
    ...mapActions('players', {createPlayer: 'create'}),
    getCardsLeftInCity(city) {
      return this.cityCardsLeft(city.id)
    },
    addPlayer() {
      this.createPlayer(this.newPlayer)
      this.newPlayer = {}
    },
    reset() {
      this.game = {
        captain: this.getNextCaptain(),
        dice: [this.dice_faces.BLANK, this.dice_faces.BLANK, this.dice_faces.BLANK, this.dice_faces.BLANK],
        ship: {
          city: this.startingCity,
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
