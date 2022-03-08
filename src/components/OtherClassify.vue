<template>
    <div>
        <PageItem
         :image_url="require('@/assets/bg-Other.jpg')" :todos="todos" />
    </div>
</template>

<script>
import PageItem from './PageItem.vue'
export default {
    name:'OtherClassify',
    components: {PageItem},
    data() {
        return {
            todos: this.$store.getters.getClassifyTodos(this.$route.params.ClassData)
        }
    },
    mounted() {
        console.log("Other Classify ID: ", this.$route.params.ClassData)
    }
}
</script>

<style scoped>

</style>