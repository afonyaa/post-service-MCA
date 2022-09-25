<template>
  <div>
    Posts:
    <div v-for="(post) in posts" v-bind:key="post.text">
       <PostItem @createComment="$emit('createComment')" :post="post"/>
    </div>
  </div>
</template>

<script>
import PostItem from "@/components/PostItem";
export default {
  name: 'PostsList',
  components: {PostItem},
  props: ['posts'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
