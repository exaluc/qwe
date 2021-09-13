<template>
    <div class="home">

        <logo class="ha"></logo>
        <div class="search-input">
            <a-input-search
                    size="large"
                    placeholder="recherche"
                    v-model="searchText"
                    @search="onSearch"/>
                    
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Logo from "@/components/Logo.vue"

    export default {
        name: 'home',
        data() {
            return {
                searchText: "",
                collapsed: false,
            };
        },
        components: {
            logo: Logo,
        },
        methods: {
            onSearch() {
                if (this.searchText !== '') {
                    this.$router.push({path: `/search`, query: {q: this.searchText}})
                    console.info("home router q  :" + this.searchText)
                }
            },
            toggleCollapsed() {
            this.collapsed = !this.collapsed;
            },
        },
        directives: {
            focus: {
                inserted: function (el) {
                    el.focus();
                }
            }
        }
    }


</script>

<style>
    .home {
        position:absolute;
        left:50%;    /* 50% */
        top:50%;
        transform: translate(-50%,-50%); /* 50% */
    }
    .search-input{
        width: 600px;
    }
    .ha {
        text-align: center;
    }
.ant-modal-title {

    font-size: 26px !important;

}
    code {
    padding: 2px;
background: #0d1825;
color: #eff;
margin: 2px;
    }
    pre {
    padding: 10px;
    font-size: 1em;
    font-family: SFMono-Regular,Consolas,Liberation Mono,Menlo,Courier,monospace;
    margin-top: 0;
    margin-bottom: 1em;
    overflow: auto;
    position: relative;
box-shadow: 0px 2px 2px #000;
margin-bottom: 1em;
background: #0d1825;
color: #eff;
font-family: Monaco,Consolas,"Lucida Console",monospace;
font-size: .75em;
line-height: 1.8;
    }
</style>