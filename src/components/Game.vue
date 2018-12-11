<template>
  <div>
    <h1>Welcome to Celestia</h1>
    <h3>Total Playable Cards: {{ totalCards }}</h3>
    <ul>
      <li v-for="card in cards" :key="card.name">{{ card.name }}: {{ card.count }}</li>
    </ul>
    <h3>Cities: {{ cities.length }}</h3>
    <ul>
      <li v-for="city in cities" :key="city.id">
        <span>{{ city.name }}: {{ getCardsLeftInCity(city) }} cards</span>
        <ul>
          <li v-for="reward in city.rewards" :key="reward.value">Value: {{ reward.value }} - {{ reward.count }} cards</li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Game',
  computed: {
    ...mapGetters('cards', {cards: 'list', totalCards: 'cardsLeft'}),
    ...mapGetters('cities', {cities: 'list', cityCardsLeft: 'cityCardsLeft'})
  },
  methods: {
    getCardsLeftInCity(city) {
      return this.cityCardsLeft(city.id)
    }
  }
}
</script>

<style lang="scss" scoped>
  h3,
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
