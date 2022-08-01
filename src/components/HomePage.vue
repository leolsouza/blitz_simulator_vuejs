<template>
  <div class="homepage">
    <h1>BLITZ</h1>

    <input
      type="text"
      v-model="search"
      placeholder="Digite o nome do campeão"
    />

    <div>
      <champion-type-filter @filter="currentSelectedCategory = $event" />
      <button @click="resetSearch()">Todos</button>
    </div>

    <div>
      <select v-model="difficulty">
        <option value="">Todas as dificuldades</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>
    <div>
      <p v-if="loader.status === true">Carregando ...</p>
      <p v-if="error.status === true">{{ error.msg }}</p>
      <ul class="champions">
        <li v-for="champion in displayChampions" v-bind:key="champion.name">
          <img :src="getChampionImage(champion.id)" alt="" />
          <span>{{ champion.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ChampionTypeFilter from "./roles-filter/ChampionTypeFilter.vue";

export default {
  components: { ChampionTypeFilter },
  name: "HomePage",
  data: function () {
    return {
      search: "",
      champions: {},
      error: {
        msg: "Página não encontrada",
        status: "",
      },
      loader: {
        status: false,
      },
      currentSelectedCategory: null,
      difficulty: "",
    };
  },

  methods: {
    async getChampions() {
      try {
        this.loader.status = true;
        var url =
          "http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion.json";

        const response = await axios.get(url);
        this.champions = response.data.data;
        this.loader.status = false;
      } catch {
        this.error.status = true;
      }
    },

    getChampionImage(championKey) {
      return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championKey}_0.jpg`;
    },

    resetSearch() {
      this.search = "";
      this.currentSelectedCategory = "";
    },
    handleFilterUpdated(type) {
      this.currentSelectedCategory = type;
    },
  },

  mounted() {
    this.getChampions();
  },

  computed: {
    displayChampions() {
      const champions = Object.values(this.champions);
      const search = this.search.toLowerCase();
      const tag = this.currentSelectedCategory;
      const difficulty = this.difficulty;
      const difficulties = {
        easy: [1, 2, 3, 4],
        medium: [5, 6, 7],
        hard: [8, 9, 10],
      };

      const filterBySearch = (champion) =>
        !search || champion.name.toLowerCase().includes(search);

      const filterByTag = (champion) => !tag || champion.tags.includes(tag);

      const filterByDifficulty = (champion) =>
        difficulties[difficulty]
          ? difficulties[difficulty].includes(champion.info.difficulty)
          : champion;

      return champions
        .filter(filterBySearch)
        .filter(filterByTag)
        .filter(filterByDifficulty);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
img {
  width: 200px;
}
.champions {
  padding: 10px;
  margin: 20px;
}
</style>
