<template>
  <div>
    <div>
      Create post
      <input v-model="postText"/>
      <button @click="createPost">
        Create post
      </button>
    </div>
    <PostsList :posts="postList" />
  </div>
</template>

<script>
import PostsList from "@/components/PostsList";
import {getPosts, createPost} from "@/api/api";

export default {
  name: 'App',
  data() {
    return {
      posts: {},
      postText: ''
    }
  },
  components: {
    PostsList
  },
  methods: {
    async createPost(){
      this.posts = await createPost(this.postText)
    }
  },
  computed:{
    postList(){
      return Object.keys(this.posts).map(value=>({...this.posts[value], id: value}))
    }
  },
  async mounted () {
    this.posts =  await getPosts()
  }
}
</script>

<style>
</style>
