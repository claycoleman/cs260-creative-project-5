<template>
  <div>
    <div class="header">
      <div>
        <h1>Patient Details</h1>
      </div>
    </div>
    <div class="image single" v-if="patient" v-bind:key="patient._id">
      <p class="patientTitle">{{ patient.name }}</p>
      <div class="patientRow"> 
        <div class="patientCol">
          <p class="patientDate">
            <p v-if="patient.user.name"><b>Health Worker: </b>{{ patient.user.name }}</p>
          </p>
          <p class="patientDate">
            <p v-if="patient.user.organization && patient.user.organization.name"><b>Organization: </b>{{ patient.user.organization.name }}</p>
          </p>
        </div>

        <div class="patientCol">
          <p class="patientDate">
            <b>Birth Date: </b>{{ formatDate(patient.birthDate) }}
          </p>
          <p class="patientDate">
            <b>Due Date: </b>{{ formatDate(patient.dueDate) }}
          </p>
        </div>
        
      </div>
      <p><button @click="togglePatientEdit" class="pure-button">Edit Patient</button></p>
    </div>
    
    <div id="healthNotes">
      <div class="healthNote" v-for="(healthNote, index) in healthNotes" :key="index">
        <p>{{ healthNote.body }}</p>
        <p class="small">{{ healthNote.user.name }} | {{ formatDate(healthNote.date) }}</p>
      </div>
    </div>
    <div v-if="user" id="healthNoteForm">
      <h3>Add a health note:</h3>
      <textarea
        v-model="healthNoteText"
        name="healthNoteText"
        id="healthNoteText"
        placeholder="Health note..."
      ></textarea>
      <div
        v-on:click="addComment"
        :class="{ 'pure-button': true, active: healthNoteText.trim().length }"
      >
        Submit
      </div>

      <escape-event @escape="escape"></escape-event>
      <patient-edit
        :show="show"
        @escape="escape"
        @uploadFinished="uploadFinished"
      />
    </div>
    <div v-else>
      <p>
        If you would like to add a health note, please register for an account or
        login.
      </p>
      <router-link to="/register" class="pure-button">Register</router-link> or
      <router-link to="/login" class="pure-button">Login</router-link>
    </div>
  </div>
</template>



<script>
  import PatientEdit from "@/components/PatientEdit.vue";
  import EscapeEvent from "@/components/EscapeEvent.vue";
  import moment from "moment";

  export default {
    name: "singlepatient",
    components: {
      PatientEdit,
      EscapeEvent
    },
    data() {
      return {
        show: false,
        healthNoteText: ""
      };
    },
    computed: {
      patient() {
        return this.$store.state.currentPatient;
      },
      user() {
        return this.$store.state.user;
      },
      healthNotes() {
        return this.$store.state.currentComments;
      }
    },
    async created() {
      await this.$store.dispatch("getUser");
      await this.$store.dispatch("getPatient", this.$route.params.patientId);
      await this.$store.dispatch("getComments", this.$route.params.patientId);
    },
    methods: {
      formatDate(date) {
        if (moment(date).diff(Date.now(), "days") < 15)
          return moment(date).format("MMMM D, YYYY");
      },
      togglePatientEdit() {
        this.show = true;
      },
      escape() {
        this.show = false;
      },
      togglePatientCreate() {
        this.show = true;
      },
      async addComment() {
        try {
          const formData = {
            body: this.healthNoteText
          };

          const dispatchObject = {
            patientId: this.$route.params.patientId,
            formData
          };

          this.error = await this.$store.dispatch(
            "createComment",
            dispatchObject
          );
          if (!this.error) {
            this.healthNoteText = "";
            this.$store.dispatch("getComments", this.$route.params.patientId);
          }
        } catch (error) {
          console.log(error);
        }
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

  .patientTitle {
    font-weight: 600;
    margin: 0px;
    font-size: 1.2em;
    margin-bottom: 8px;
    text-align: center;
  }

  .patientRow {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }

  .patientCol {
    flex-direction: column;
    margin: 16px 40px;
  }

  .patientDate {
    margin: 0px;
    font-size: 0.9em;
    font-weight: normal;
    flex: 1;
  }

  p {
    margin: 0px;
  }

  .image {
    margin: 0 0 1.5em;
    display: inline-block;
    width: 100%;
    text-align: center;
  }

  #healthNoteText {
    width: 100%;
    border-radius: 4px;
    min-height: 200px;
  }

  #healthNoteForm .pure-button {
    margin: 0;
    margin-top: 10px;
    transition: all 0.25s;
    transition-property: color, background-color;
  }

  .pure-button.active {
    background-color: rgb(242, 56, 90);
    color: white;
  }

  .healthNote {
    margin: 10px 0;
  }

  p.small {
    font-size: 14px;
    font-weight: bold;
  }
</style>