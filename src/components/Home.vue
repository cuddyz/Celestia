<template>
  <div>
    <h1>Welcome to Celestia</h1>
    <h3>Total Cards: {{ totalCards }}</h3>
    <ul>
      <li v-for="card in cards" :key="card.name">{{ card.name }}: {{ card.count }}</li>
    </ul>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  computed: {
    ...mapGetters('cards', {cards: 'list', totalCards: 'cardsLeft'})
  }
}
</script>
