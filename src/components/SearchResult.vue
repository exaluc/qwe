<template>
  <div class="article">
      <a-card>
      <div>
        <h4>{{articles._source.titre}}</h4>
        <p>
          <span v-html="articles._source.question.slice(0, 250)"></span>
        </p>
      </div>
    <a-button type="primary" @click="showModal">
      Voir le contenu
    </a-button>
    <a-modal :dialog-style="{ top: '20px' }" v-model="visible" :title=articles._source.titre @ok="handleOk">
      <div>
        <p> 
          <span v-html="articles._source.question"></span>
        </p>
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