<template>
  <div>
    <router-link to="/">Todos os campeões</router-link>
    <p v-if="loader.status === true">{{ loader.msg }}</p>
    <p v-if="loader.status === true">{{ error.msg }}</p>
    <div v-for="champion in championSelected" v-bind:key="champion.id">
      <img :src="getChampionImage(champion.id)" alt="" />
      <h3>{{ champion.title }}</h3>
      <h2>{{ champion.name }}</h2>
      <p>{{ champion.lore }}</p>
      <div>
        <p>Função {{ champion.tags }}</p>
        <p>Dificuldade {{ champion.info.difficulty }}</p>
      </div>
      <div>
        <h4>Skins Disponíveis</h4>
        <ul v-for="skins in champion.skins" :key="skins.id">
          <li>{{ skins.name }}</li>
        </ul>
      </div>
      <div>
        <h4>Habilidades</h4>
        <p>{{ champion.passive.name }}</p>
        <ul v-for="spells in champion.spells" :key="spells.id">
          <li>{{ spells.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      championSelected: {},
      loader: {
        msg: "Carregando...",
        status: false,
      },
      error: {
        msg: "Página não encontrada",
        status: false,
      },
    };
  },
  mounted() {
    this.getChampion(this.$route.params.championId);
  },
  methods: {
    async getChampion(championId) {
      try {
        this.loader.status = true;
        var url = `http://ddragon.leagueoflegends.com/cdn/12.14.1/data/pt_BR/champion/${championId}.json`;
        const response = await axios.get(url);
        this.championSelected = response.data.data;
        this.loader.status = false;
      } catch {
        this.loader.status = false;
        this.error.status = true;
      }
    },
    getChampionImage(championKey) {
      return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championKey}_0.jpg`;
    },
  },
};
</script>

<style scoped>
img {
  width: 500px;
}
</style>
