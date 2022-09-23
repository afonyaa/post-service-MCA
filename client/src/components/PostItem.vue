<template>
  <h2>
    {{postText}}
  </h2>
  <div>
    comments:
    <ul>
      <li v-for="comment of comments" :key="comment.id"> {{comment.text}} </li>
    </ul>
    <input v-model="commentText"/>
    <button @click="addComment">add comment</button>
  </div>
</template>

<script>
import {createComment, getCommentsByPostId} from "@/api/api";

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
      this.comments = await createComment(this.post.id, {text: this.commentText})
      this.commentText = ''
    }
  },
  async mounted() {
    this.comments = await getCommentsByPostId(this.post.id)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
