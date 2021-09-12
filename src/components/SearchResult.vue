<template>
    <div>
         <a-card hoverable>
            <a-card-meta
                    :title="info._source.titre+' ('+info._source.titre+')'">

            </a-card-meta>
            <p><span v-html="info._source.question"></span></p>
            <p class="describe"><span v-html="info._source.reponse"></span></p>
            <div style="text-align: right">{{info._score}}</div>
        </a-card>
    </div>

</template>

<script>
    export default {
        name: "SearchResult",
        props: ["info"],
    }
</script>

<style scoped>
    div {
        margin-top: 12px;
    }

    .describe {
        padding: 12px 0 0 0;
        
        color: #13d03c;
    }
</style>