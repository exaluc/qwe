<style scoped>
    #qwe-fixed-top .logo-search {
    width: 120px;
    height: 31px;
    float: left;
    }

    .ant-layout-header {
        padding: 0 20px;
    }


    .left {
        float: left;
        margin: 0 20px;
        text-align: center;
    }

    .searchResults {
        width: 100%;
        padding: 30px;
        padding-top: 50px;
        overflow: hidden;
        zoom: 1;
    }

    img {
        padding-top: 4px;
        text-align: center;
    }


    .logo {
        font-size: 2em;
        font-weight: bolder;
        float: left;
    }

    .logo-blue {
        color: #4285f4;
    }

    .logo-red {
        color: #e84235;
    }

    .logo-yellow {
        color: #fabb06;
    }

    .logo-green {
        color: #34a853;
    }
</style>

<template>
    <div class="search" id="qwe-fixed-top">
    <a-layout-header :style="{ position: 'fixed', zIndex: 1, width: '100%' }">
      <div class="logo-search" @click="goHome">
        <span class="logo logo-red">Q</span>
        <span class="logo logo-yellow">w</span>
        <span class="logo logo-blue">e</span>
        <span class="logo logo-green">?</span>
      </div>
      <a-menu
        theme="dark"
        mode="horizontal"
        :default-selected-keys="['1']"
        :style="{ lineHeight: '64px' }"
      >

        <a-input-search key="1"
                    v-model="searchText"
                    placeholder="recherche"
                    style="width: 250px"
                    @search="searchResult"/>
      </a-menu>
    </a-layout-header>
        <div class="searchResults">
            <div v-if="Object.keys(result).length === 0"><a-list :data-source="[]" /></div>
                <div v-for="item in result" v-bind:key="item.titre">
                <searchResult :articles="item"></searchResult>
            </div>
        </div>
  <a-back-top />
    </div>
    
</template>

<script>
    import axios from 'axios'
    import SearchResult from "../components/SearchResult";
    
    export default {
        name: "Search",
        data() {
            return {
                searchText: "",
                result: [],
            }
        },
        components: {
            searchResult: SearchResult
        },

        methods: {
            goHome() {
                this.$router.push("/")

            },
            searchResult() {
                if (this.searchText !== '') {
                    this.$router.push({
                        path: `/search`,
                        query: {
                            q: this.searchText
                        }
                    })
                }
                // console.info("router query:" + this.$route.query.q)
                // console.info("search text: " + this.searchText)


                const path = 'http://alpha.qwe.fr/search/' + this.$route.query.q;
                axios.get(path)
                    .then((res) => {
                        this.result = res.data;
                        // console.info(this.result)

                    })
                    .catch((error) => {
                        // eslint-disable-next-line
                        console.error(error);
                    });
            }
        },

        created() {
            this.searchResult()
        },

        // watch: {
        //     '$route'(to, from) {
        //         // écrase
        //         this.searchResult()
        //     }
        // }
    }
</script>

