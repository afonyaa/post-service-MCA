<template>
  <div>
    Posts:
    <div v-for="(post) in posts" v-bind:key="post.text">
       <h2>-{{post.text}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostsList',
  props: ['posts'],
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
