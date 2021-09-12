<template>
  <div class="article">
      <a-card hoverable>
    <a-skeleton :loading="loading">
      <div>
        <h4>{{articles._source.titre}}</h4>
        <p>
          <span v-html="articles._source.question.slice(0, 250)"></span>
        </p>
      </div>
    </a-skeleton>
    <a-button :disabled="loading" @click="showSkeleton">
      Voir l'article
    </a-button>
    <div style="text-align: right">{{articles._score}}</div>
    </a-card>
  </div>
</template>
<script>
    export default {
        name: "SearchResult",
        props: ["articles"],
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