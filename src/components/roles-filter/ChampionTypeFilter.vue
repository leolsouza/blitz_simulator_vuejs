<template>
  <div>
    <button @click="$emit('filter', 'Tank')">Tank</button>
    <button @click="$emit('filter', 'Mage')">Mage</button>
    <button @click="$emit('filter', 'Assassin')">Assassin</button>
    <button @click="$emit('filter', 'Marksman')">Marksman</button>
    <button @click="$emit('filter', 'Fighter')">Fighter</button>
    <button @click="$emit('filter', 'Support')">Support</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
