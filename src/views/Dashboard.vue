<template>
  <div>
    <div v-if="user">
      <div class="header">
        <div>
          <h1>Dashboard</h1>
        </div>
        <div>
          <p>Welcome, {{ user.name }}. Below are all patients in your organization, {{ user.organization.name }}.</p>
          <p><button @click="togglePatientCreate" class="pure-button">New Patient</button></p>
        </div>
      </div>

      <escape-event @escape="escape"></escape-event>
      <patient-create
        :show="show"
        @escape="escape"
        @uploadFinished="uploadFinished"
      />
      <patient-gallery :patients="patients" />

      <div v-if="patients.length == 0">
        <h4>
          You don't have any patients yet! Get started on creating one <a @click="togglePatientCreate">here</a>.
        </h4>
      </div>
    </div>
    <div v-else>
      <p>
        Please authenticate below.
      </p>
      <router-link to="/register" class="pure-button">Register</router-link> or
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>



<script>
  import PatientCreate from "@/components/PatientCreate.vue";
  import PatientGallery from "@/components/PatientGallery.vue";
  import EscapeEvent from "@/components/EscapeEvent.vue";

  export default {
    name: "dashboard",
    components: {
      PatientCreate,
      PatientGallery,
      EscapeEvent
    },
    data() {
      return {
        show: false
      };
    },
    computed: {
      user() {
        return this.$store.state.user;
      },
      patients() {
        return this.$store.state.patients;
      }
    },
    async created() {
      await this.$store.dispatch("getUser");
      await this.$store.dispatch("getMyPatients");
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
      togglePatientCreate() {
        this.show = true;
      },
      async uploadFinished() {
        this.show = false;
        try {
          this.error = await this.$store.dispatch("getMyPatients");
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
    flex-direction: column;
    text-align: center;
    
    border-bottom: 1px solid lightgray;
  }

  .header h1 {
    margin: 0;
  }

  .header .button {
    margin-left: 50px;
    order: 2;
  }

  .header a {
    padding-left: 50px;
    font-size: 2em;
  }

  .header svg {
    margin-top: 12px;
  }
</style>