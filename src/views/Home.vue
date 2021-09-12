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

<style scoped>
    .home {
        position:absolute;
        left:50%;    /* 50% */
        top:50%;
        transform: translate(-50%,-50%); /* 50% */
    }
    .search-input{
        width: 50%;
    }
    .ha {
        text-align: center;
    }

</style>