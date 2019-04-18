<template>
  <div>
    <div v-if="user">
      <div class="header">
        <div>
          <h1>{{ user.name }}</h1>
        </div>
        <div>
          <p>
            <a @click="toggleUpload"><i class="far fa-image"></i></a>
            <a href="#" @click="logout"><i class="fas fa-sign-out-alt"></i></a>
          </p>
        </div>
      </div>
      <escape-event @escape="escape"></escape-event>
      <uploader
        :show="show"
        @escape="escape"
        @uploadFinished="uploadFinished"
      />
      <image-gallery :photos="photos" />
      <div v-if="photos.length == 0">
        <h4>You don't have any photos yet! Get started on uploading one by clicking on the photo icon above.</h4>
      </div>
    </div>
    <div v-else>
      <p>
        If you would like to upload photos, please register for an account or
        login.
      </p>
      <router-link to="/register" class="pure-button">Register</router-link> or
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>



<script>
  import Uploader from "@/components/Uploader.vue";
  import ImageGallery from "@/components/ImageGallery.vue";
  import EscapeEvent from "@/components/EscapeEvent.vue";

  export default {
    name: "mypage",
    components: {
      Uploader,
      ImageGallery,
      EscapeEvent
    },
    data() {
      return {
        show: false,
      };
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      photos() {
        return this.$store.state.photos;
      }
    },
    async created() {
      await this.$store.dispatch("getUser");
      await this.$store.dispatch("getMyPhotos");
    },
    methods: {
      async logout() {
        try {
          this.error = await this.$store.dispatch("logout");
        } catch (error) {
          console.log(error);
        }
      },
      escape() {
        this.show = false;
      },
      toggleUpload() {
        this.show = true;
      },
      async uploadFinished() {
        this.show = false;
        try {
          this.error = await this.$store.dispatch("getMyPhotos");
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
</style>