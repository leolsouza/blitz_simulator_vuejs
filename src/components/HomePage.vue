<template>
  <div class="homepage">
    <h1>BLITZ</h1>
    <form @click.stop.prevent="searchChampions()">
      <input
        type="text"
        v-model="field"
        placeholder="Digite o nome do campeão"
      />
      <button>Procurar</button>
    </form>
    <p>
      <button @click="getChampions()">Todos os campeões</button>
    </p>
    <div>
      <p v-if="loader.status === true">Carregando ...</p>
      <p v-if="error.status === true">{{ error.msg }}</p>
      <ul>
        <li v-for="champion in champions" v-bind:key="champion.name">
          <p>{{ champion }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  props: {
    msg: String,
  },
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
            Object.entries(this.champions).map((ch) => {
              return {
                ch,
              };
            });
            //Object.fromEntries(obj);
            console.log(this.champions);
          },
          function () {
            this.error.status = true;
          }
        )
        .finally(() => {
          this.loader.status = false;
        });
    },
    // dataProcessingChampions() {
    //   this.getChampions();
    //   var obj = Object.entries(this.champions);
    //   obj.map(function (ch, index, array) {
    //     return {
    //       index: "name",
    //     };
    //   });
    //   Object.fromEntries(obj);
    // },
    searchChampions() {
      console.log(this.field);
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
</style>
