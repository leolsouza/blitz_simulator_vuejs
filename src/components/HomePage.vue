<template>
  <div class="homepage">
    <div class="header">
      <h2>ESCOLHA SEU</h2>
      <h1>CAMPEÃO</h1>
      <p>
        Com mais de 140 Campeões, você encontrará a combinação perfeita para seu
        estilo de jogo. Especialize-se em um estilo ou em todos.
      </p>
    </div>
    <div class="filter">
      <input
        class="filter-input"
        type="text"
        v-model="search"
        placeholder="BUSCAR"
      />
      <div class="filter-tags">
        <champion-type-filter @filter="currentSelectedCategory = $event" />
      </div>

      <select class="filter-select" v-model="difficulty">
        <option value="">TODAS AS DIFICULDADES</option>
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>
    </div>

    <div class="champions">
      <p v-if="loader.status === true">{{ loader.msg }}</p>
      <p v-if="error.status === true">{{ error.msg }}</p>

      <ul class="champions-list">
        <li
          v-for="champion in displayChampions"
          v-bind:key="champion.name"
          class="champions-items"
        >
          <router-link
            :to="{
              name: 'ChampionSelected',
              params: { championId: champion.id },
            }"
          >
            <div class="champions-items-container">
              <img
                :src="getChampionImage(champion.id)"
                class="champions-image"
              />

              <div class="champions-items-container-div">
                <p class="champions-items-container-name">
                  {{ champion.name }}
                </p>
              </div>
            </div>
          </router-link>
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
        status: false,
        msg: "Página não encontrada",
      },
      loader: {
        status: false,
        msg: "Carregando...",
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
          "http://ddragon.leagueoflegends.com/cdn/12.14.1/data/pt_BR/champion.json";

        const response = await axios.get(url);
        this.champions = response.data.data;
        this.loader.status = false;
      } catch {
        this.loader.status = false;
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
        easy: [1, 2, 3],
        medium: [4, 5, 6, 7],
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
.homepage {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.header {
  font-style: italic;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 83px;
  margin-bottom: 10px;
}
.header p {
  font-weight: 700;
  font-size: 15px;
  line-height: 18px;
  margin: 0px;
  font-style: medium;
  font-weight: 500;
  max-width: 515px;
  color: #4f4f4f;
  letter-spacing: 5%;
}
.header h1 {
  font-weight: 700;
  font-size: 120px;
  line-height: 145px;
  margin: 0px;
  padding: 0px;
}
.header h2 {
  padding: 0px;
  margin: 0px;
  font-size: 30px;
  line-height: 36px;
  font-weight: 600;
}
.filter {
  width: 80%;
  height: 67px;
  display: flex;
  border: 1px solid #b7b7b7;
  align-items: center;
  text-align: center;
  margin: 25px auto 0 auto;
  clip-path: polygon(0 30%, 5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%);
}

.filter .filter-tags,
.filter .filter-tags :deep(.filter-tags) {
  border: none;
  height: 67px;
  background: #ffffff;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  color: #b7b7b7;
  margin: 0px 11px;
  flex-grow: 3;
  cursor: pointer;
}

.filter .filter-tags :deep(.filter-tags):hover {
  border-bottom: 5px solid #e8af46;
  color: #000000;
}

.filter .filter-tags :deep(.filter-tags):focus {
  border-bottom: 5px solid #e8af46;
  color: #000000;
}

.filter .filter-input {
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  height: 32px;
  border: none;
  border-right: 2px solid #b7b7b7;
  flex-grow: 1;
  max-width: 234px;
  transition: height 0.2s linear 0s;
}
.filter .filter-input:hover {
  height: 97%;
}
.filter .filter-input:focus {
  height: 97%;
}

.filter .filter-input::placeholder {
  color: #000;
}

.filter .filter-select {
  height: 32px;
  border: none;
  border-left: 2px solid #b7b7b7;
  background: #ffffff;
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  margin-left: 0;
  margin-right: 0;
  flex-grow: 1;
  transition: height 0.2s linear 0s;
}
.filter .filter-select:hover,
.filter .filter-select:focus {
  height: 97%;
}

.champions {
  margin: 28px 5%;
  display: flex;
  justify-content: center;
}
.champions-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.champions-items {
  display: flex;
  align-items: center;
  justify-content: center;
}

.champions-items-container {
  width: 248px;
  height: 307px;
  min-width: 83px;
  min-height: 87px;
  margin: 0 19px 36px 19px;
  position: relative;
  clip-path: polygon(0 0, 85% 0, 100% 10%, 100% 100%, 0 100%);
}
.champions-items-container-div {
  width: 100%;
  background: #061c25;
  position: absolute;
  bottom: 0px;
  padding: 7px 0;
}
.champions-items-container-div p {
  color: #ffffff;
  text-align: left;
  font-style: italic;
  font-weight: 800;
  font-size: 15px;
  line-height: 18px;
  position: relative;
  left: 26px;
  text-decoration: none;
  text-transform: uppercase;
}

.champions-items-container:hover {
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
.champions-items-container-div:hover {
  background: #00505e;
}
.champions-items .champions-image {
  width: 100%;
  height: 100%;
}
</style>
