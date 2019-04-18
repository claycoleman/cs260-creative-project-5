<template>
  <div>
    <div class="header">
      <div>
        <h1>Photo Details</h1>
      </div>
    </div>
    <div class="image single" v-if="photo" v-bind:key="photo._id">
      <img v-on:click="openSinglePhoto(photo._id)" :src="photo.path" />
      <p class="photoTitle">{{ photo.title }}</p>
      <p class="photoDate">
        <span v-if="photo.user.name">{{ photo.user.name }}, </span>
        {{ formatDate(photo.created) }}
      </p>
      <p>{{ photo.description }}</p>
    </div>
    <div id="comments">
      <div class="comment" v-for="(comment, index) in comments" :key="index">
        <p>{{ comment.body }}</p>
        <p class="small">{{ comment.user.name }} | {{ formatDate(comment.date) }}</p>
      </div>
    </div>
    <div v-if="user" id="commentForm">
      <h3>Add a comment!</h3>
      <textarea
        v-model="commentText"
        name="commentText"
        id="commentText"
      ></textarea>
      <div
        v-on:click="addComment"
        :class="{ 'pure-button': true, active: commentText.trim().length }"
      >
        Add a comment
      </div>
    </div>
    <div v-else>
      <p>
        If you would like to add a comment, please register for an account or
        login.
      </p>
      <router-link to="/register" class="pure-button">Register</router-link> or
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>



<script>
  import moment from "moment";
  export default {
    name: "singlephoto",
    components: {},
    data() {
      return {
        show: false,
        commentText: ""
      };
    },
    computed: {
      photo() {
        return this.$store.state.currentPhoto;
      },
      user() {
        return this.$store.state.user;
      },
      comments() {
        return this.$store.state.currentComments;
      }
    },
    async created() {
      await this.$store.dispatch("getUser");
      await this.$store.dispatch("getPhoto", this.$route.params.photoId);
      await this.$store.dispatch("getComments", this.$route.params.photoId);
    },
    methods: {
      formatDate(date) {
        if (moment(date).diff(Date.now(), "days") < 15)
          return moment(date).fromNow();
        else return moment(date).format("d MMMM YYYY");
      },
      async addComment() {
        try {
          const formData = {
            body: this.commentText
          };

          const dispatchObject = {
            photoId: this.$route.params.photoId,
            formData
          };

          this.error = await this.$store.dispatch(
            "createComment",
            dispatchObject
          );
          if (!this.error) {
            this.commentText = "";
            this.$store.dispatch("getComments", this.$route.params.photoId);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>

<style scoped>
  .pure-button {
    margin: 0px 20px;
  }

  .header {
    display: flex;
  }

  .header .button {
    margin-left: 50px;
    order: 2;
  }

  .header a {
    padding-left: 50px;
    color: #222;
    font-size: 2em;
  }

  .header svg {
    margin-top: 12px;
  }

  .photoTitle {
    margin: 0px;
    font-size: 1.2em;
  }

  .photoDate {
    margin: 0px;
    font-size: 0.9em;
    font-weight: normal;
  }

  p {
    margin: 0px;
  }

  .image {
    margin: 0 0 1.5em;
    display: inline-block;
    width: 100%;
  }

  .image img {
    max-width: 600px;
    max-height: 600px;
    image-orientation: from-image;
  }

  #commentText {
    width: 100%;
    border-radius: 4px;
    min-height: 200px;
  }

  #commentForm .pure-button {
    margin: 0;
    margin-top: 10px;
    transition: all 0.25s;
    transition-property: color, background-color;
  }

  .pure-button.active {
    background-color: rgb(242, 56, 90);
    color: white;
  }

  .comment {
    margin: 10px 0;
  }

  p.small {
    font-size: 14px;
    font-weight: bold;
  }
</style>