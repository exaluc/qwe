<template>
  <div class="article">
      <a-card>
      <div>
        <h2>{{articles._source.titre}}</h2>
        <p>
          <span v-html="articles._source.question.slice(0, 250)"></span>
        </p>
      </div>
    <a-button type="primary" @click="showModal">
      Voir le contenu
    </a-button>
    <a-modal size="large" width="80%" :dialog-style="{ top: '20px' }" v-model="visible" :title=articles._source.titre @ok="handleOk">
      <template slot="footer">
        <a-button key="submit" type="primary" :loading="loading" @click="handleOk">
          Fermer
        </a-button>
      </template>
      <div>
        <a-card>
        <p>
          <span v-html="articles._source.question"></span>
        </p>
        </a-card>
        <a-card>
        <p>
          <span v-html="articles._source.reponse"></span>
        </p>
        </a-card>
      </div>
    </a-modal>
    <div style="text-align: right">{{articles._score}}</div>
    </a-card>
  </div>
</template>
<script>
    export default {
        name: "SearchResult",
        props: ["articles"],
        data() {
    return {
      visible: false,
    };
  },
         methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    },
  }, 
    }
</script>
<style scoped>
div {
    margin-top: 12px;
}
.article h4 {
  margin-bottom: 16px;
}
.article button {
  margin-top: 16px;
}
</style>