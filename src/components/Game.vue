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
      <div>
        <h3>Ship: <span v-if="ship.location.name">Location: {{ ship.location.name }} | Players on board: {{ ship.players.length }}</span><span v-else>Start the game!</span></h3>
        <button @click="resetShip">Start Game</button>
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
    ...mapGetters('cities', {cities: 'list', cityCardsLeft: 'cityCardsLeft'}),
    ...mapGetters('players', {players: 'list'}),
    ...mapGetters('ship', {ship: 'show'})
  },
  data() {
    return {
      newPlayer: {
        name: '',
        color: ''
      }
    }
  },
  methods: {
    ...mapActions('players', {createPlayer: 'create'}),
    ...mapActions('ship', ['resetShip']),
    getCardsLeftInCity(city) {
      return this.cityCardsLeft(city.id)
    },
    addPlayer() {
      this.createPlayer(this.newPlayer)
      this.newPlayer = {}
    }
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
