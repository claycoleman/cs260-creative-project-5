<template>
  <div id="app">
    <div class="pure-menu pure-menu-horizontal">
      <span class="pure-menu-heading">Maame</span>
      <ul class="pure-menu-list">
        <li class="pure-menu-item">
          <router-link to="/" class="pure-menu-link">Home</router-link>
        </li>
        <li v-show="this.$store.state.user == null" class="pure-menu-item">
          <router-link to="/login" class="pure-menu-link">Login</router-link>
        </li>
        <li v-show="this.$store.state.user == null" class="pure-menu-item">
          <router-link to="/register" class="pure-menu-link"
            >Register</router-link
          >
        </li>
        <li v-show="this.$store.state.user != null" class="pure-menu-item">
          <router-link to="/dashboard" class="pure-menu-link"
            >Dashboard</router-link
          >
        </li>
        <li v-show="this.$store.state.user != null" class="pure-menu-item">
          <a class="pure-menu-link" @click="logout">Log Out</a>
        </li>
      </ul>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script>
  export default {
    name: "app",
    methods: {
      async logout() {
        try {
          this.error = await this.$store.dispatch("logout");
          this.$router.push({ path: '/' });
        } catch (error) {
          console.log(error);
        }
      }
    },
    async created() {
      await this.$store.dispatch("getUser");
    }
  };
</script>

<style>
  /* https://color.adobe.com/Ventana-Azul-color-theme-2159606/?showPublished=true */
  #app {
    font-family: "Open Sans", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    min-height: 100%;
  }

  .pure-menu {
    /* To limit the menu width to the content of the menu: */
    /* display: inline-block; */
    /* Or set the width explicitly: */
    text-align: left;
    background: #000;
    z-index: 5;
  }

  .pure-menu-heading {
    color: #fff;
    font-size: 2em;
    font-weight: 700;
    letter-spacing: 1px;
    padding: 8px 20px;
    background-color: #cc0000;
    margin-right: 10px;
    min-width: 240px;
    text-align: center;
  }

  .pure-menu-link {
    color: #fff;
    padding: 10px 20px;
    font-weight: 800;
    cursor: pointer;
  }

  .pure-menu-link:hover {
    background: #333;
  }

  .pure-menu-link.router-link-exact-active {
    background: #fff;
    color: #cc0000;
  }

  .content {
    margin: 50px 100px;
  }

  html {
    height: 100%;
    box-sizing: border-box;
  }

  body {
    height: 100%;
  }

  *,
  *:before,
  *:after {
    box-sizing: inherit;
    /* https://css-tricks.com/box-sizing/ */
  }

  .error {
    color: #cc0000;
  }

  .pure-button-primary {
    background-color: #36b1bf;
  }

  /* Modals */
  .modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: table;
    transition: opacity 0.3s ease;
  }

  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
  }

  .modal-container {
    width: 500px;
    margin: 0px auto;
    padding: 20px 30px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
    transition: all 0.3s ease;
    font-family: Helvetica, Arial, sans-serif;
  }

  .modal-header h1 {
    margin-bottom: 30px;
    font-size: 1.5em;
  }

  .modal-body {
    margin: 0;
  }

  .modal-body input {
    margin-bottom: 20px;
    height: 30px;
  }

  .modal-footer {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .modal-default-button {
    float: right;
  }

  /*
                * The following styles are auto-applied to elements with
                * transition="modal" when their visibility is toggled
                * by Vue.js.
                *
                * You can easily play with the modal transition by editing
                * these styles.
                */
  .modal-enter {
    opacity: 0;
  }

  .modal-leave-active {
    opacity: 0;
  }

  .modal-enter .modal-container,
  .modal-leave-active .modal-container {
    -webkit-transform: scale(1.1);
    transform: scale(1.1);
  }
</style>  