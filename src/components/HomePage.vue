<template>
  <div class="homepage">
    <h1>BLITZ</h1>
    <form @click.stop.prevent="searchChampions">
      <input
        type="text"
        v-model.lazy="field"
        placeholder="Digite o nome do campeão"
      />
      <button>Procurar</button>
    </form>
    <p>
      <button @click="getChampions()">Todos os campeões</button>
    </p>

    <div>
      <ButtonFilter v-bind:champ="champions" name="Tank" />
      <ButtonFilter v-bind:champ="champions" name="Mage" />
      <ButtonFilter v-bind:champ="champions" name="Assassin" />
      <ButtonFilter v-bind:champ="champions" name="Marksman" />
      <ButtonFilter v-bind:champ="champions" name="Fighter" />
      <ButtonFilter v-bind:champ="champions" name="Support" />
    </div>

    <div>
      <p v-if="loader.status === true">Carregando ...</p>
      <p v-if="error.status === true">{{ error.msg }}</p>
      <ul class="champions">
        <li v-for="champion in searchChampions" v-bind:key="champion.name">
          <img :src="getChampionImage(champion.id)" alt="" />
          <span>{{ champion.name }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ButtonFilter from "./roles-filter/ButtonFilter.vue";

export default {
  name: "HomePage",
  components: { ButtonFilter },
  data: function () {
    return {
      field: "",
      champions: [],
      error: {
        msg: "Página não encontrada",
        status: "",
      },
      loader: {
        status: false,
      },
    };
  },
  methods: {
    getChampions() {
      this.loader.status = true;
      var url =
        "http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion.json";
      axios
        .get(url)
        .then(
          (response) => {
            this.champions = response.data.data;
          },
          function () {
            this.error.status = true;
          }
        )
        .finally(() => {
          this.loader.status = false;
        });
    },
    getChampionImage(championKey) {
      return `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${championKey}_0.jpg`;
    },
  },
  computed: {
    searchChampions() {
      let champ = {};
      champ = Object.values(this.champions).filter((ch) => {
        return ch.name.toLowerCase().indexOf(this.field.toLowerCase()) > -1;
      });
      return champ;
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
