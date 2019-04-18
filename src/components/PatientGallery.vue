<template>
  <div>
    <div
      v-on:click="openPatientDetail(patient._id)"
      class="patient"
      v-for="patient in patients"
      v-bind:key="patient._id"
    >
      <p class="patientTitle">{{ patient.name }}</p>
      <p class="patientDate"><b>Health Worker: </b>{{ patient.user.name }}</p>
      <p class="patientDate">
        <b>Birth Date: </b>{{ formatDate(patient.birthDate) }}
      </p>
      <p class="patientDate">
        <b>Due Date: </b>{{ formatDate(patient.dueDate) }}
      </p>
      <p>{{ patient.description }}</p>
    </div>
  </div>
</template>

<script>
  import moment from "moment";

  export default {
    name: "PatientGallery",
    props: {
      patients: Array
    },
    methods: {
      formatDate(date) {
        return moment(date).format("MMMM D, YYYY");
      },
      openPatientDetail(patientId) {
        this.$router.push({ path: `/patient/${patientId}` });
      }
    }
  };
</script>

<style scoped>
  .patientTitle {
    margin: 0px;
    font-size: 1.2em;
    margin-bottom: 4px;
    text-align: center;
  }

  .patientDate {
    margin: 0px;
    font-size: 0.9em;
    font-weight: normal;
  }

  p {
    margin: 0px;
  }

  .patient {
    margin: 0 0 1.5em;
    display: inline-block;
    cursor: pointer;
    padding: 16px;
    margin: 8px;
  }

  .patient:hover {
    background: lightgray;
  }

  .patient img {
    max-width: 600px;
    max-height: 600px;
    patient-orientation: from-patient;
    transform: scale(0.975);
    transition: transform 0.25s;
    cursor: pointer;
  }

  .patient img:hover {
    transform: scale(1);
  }
</style>