<template>
  <div>
    <p v-if="loader.status === true">{{ loader.msg }}</p>
    <p v-if="loader.status === true">{{ error.msg }}</p>
    <p>Olá</p>
    <p>{{ champion.name }}</p>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      champion: {},
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
  methods: {
    async getChampion() {
      try {
        this.loader.status = true;
        var url =
          "http://ddragon.leagueoflegends.com/cdn/12.14.1/data/en_US/champion/Aatrox.json";
        const response = await axios.get(url);
        this.champion = response.data.data;
        this.loader.status = false;
      } catch {
        this.loader.status = false;
        this.error.status = true;
      }
    },
  },
};
</script>

<style scoped></style>
