<template>
  <div>
    <button @click="$emit('filter', '')" class="filter-tags">TODOS</button>
    <button @click="$emit('filter', 'Tank')" class="filter-tags">TANQUE</button>
    <button @click="$emit('filter', 'Mage')" class="filter-tags">MAGO</button>
    <button @click="$emit('filter', 'Assassin')" class="filter-tags">
      ASSASSINO
    </button>
    <button @click="$emit('filter', 'Marksman')" class="filter-tags">
      ATIRADOR
    </button>
    <button @click="$emit('filter', 'Fighter')" class="filter-tags">
      LUTADOR
    </button>
    <button @click="$emit('filter', 'Support')" class="filter-tags">
      SUPORTE
    </button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped></style>
