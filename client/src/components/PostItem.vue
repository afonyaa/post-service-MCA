<template>
  <h2>
    {{postText}}
  </h2>
  <div>
    comments:
    <ul>
      <li v-for="comment of post.comments" :key="comment.id"> {{comment.content}} ({{comment.status}}) </li>
    </ul>
    <input v-model="commentText"/>
    <button @click="addComment">add comment</button>
  </div>
</template>

<script>
import {createComment} from "@/api/api";

export default {
  name: 'PostItem',
  props: ['post'],
  data(){
    return {
      commentText: '',
      comments: '',
    }
  },
  computed: {
    postText(){
      return this.post.text
    }
  },
  methods: {
    async addComment(){
      await createComment(this.post.id, {content: this.commentText})
      this.$emit('createComment')
    }
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
