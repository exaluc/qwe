<template>
  <div class="article">
    <a-card>
      <div>
        <h2>{{articles.source.titre}}</h2>
        <p>
          <span v-html="articles.source.question.slice(0, 250)"></span>
        </p>
      </div>
      <div>
      </div>
      <div class="revue">
        <a-button class="gauche" type="primary" @click="showModal">
          Voir le contenu
        </a-button>
        <span class="droite">{{articles.score}}</span>
      </div>

      <a-modal size="large" width="95%" :dialog-style="{ top: '20px' }" 
      v-model="visible" :title=articles.source.titre>
        <template slot="footer">
          <!-- <a-button key="submit" @click="scrollMeTo('element')">
            Haut de page
          </a-button> -->
          <a-button key="submit" type="primary" @click="handleOk">
            Fermer
          </a-button>
        </template>
        <div>
          <a-card>
            <p ref="element">
              <span v-html="articles.source.question"></span>
            </p>
          </a-card>
          <a-card>
            <p>
              <span v-html="articles.source.reponse"></span>
            </p>
          </a-card>
        </div>
      </a-modal>
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
        handleOk() {
          this.visible = false;
        },
        scrollMeTo(refName) {
        var element = this.$refs[refName];
        var top = element.offsetTop;

        window.scrollTo(0, top);
      }
      },
    }
</script>
<style scoped>
.article {
    margin-top: 20px;
}
.article h4 {
  margin-bottom: 16px;
}
.article button {
  margin-top: 16px;
}
.revue
{
    display: block;

}
.revue .droite { float:right }
.revue .gauche { float:left }

</style>