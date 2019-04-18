<template>
  <transition v-if="show" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <h1 class="modal-title">Create a new patient</h1>
          </div>
          <div class="modal-body">
            <p v-if="error" class="error">{{ error }}</p>
            <form @submit.prevent="upload">
              <input v-model="name" placeholder="Name" />
              <p></p>
              <input v-model="birthDateText" placeholder="Birth Date" />
              <p
                class="verification"
                v-show="birthDate != null || birthDateEdited"
              >
                {{
                  birthDate != null
                    ? `Interpreted date is: ${birthDate.format("D MMMM YYYY")}`
                    : "Invalid date!"
                }}
              </p>
              <p></p>
              <input v-model="dueDateText" placeholder="Due Date" />
              <p class="verification" v-show="dueDate != null || dueDateEdited">
                {{
                  dueDate != null
                    ? `Interpreted date is: ${dueDate.format("D MMMM YYYY")}`
                    : "Invalid date!"
                }}
              </p>
              <p></p>
              <button type="button" @click="close" class="pure-button">
                Close
              </button>
              <button type="submit" class="pure-button pure-button-secondary">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import moment from "moment";

  const today = moment();
  export default {
    name: "PatientCreate",
    props: {
      show: Boolean
    },
    data() {
      return {
        name: "",
        birthDateText: "",
        birthDate: null,
        birthDateEdited: false,
        dueDateText: "",
        dueDate: null,
        dueDateEdited: false,
        error: ""
      };
    },
    watch: {
      birthDateText(newValue, oldValue) {
        if (!this.birthDateEdited) {
          this.birthDateEdited = true;
        }
        if (!!newValue.trim()) {
          const date = moment(newValue);
          if (date.isValid()) {
            this.birthDate = date;
          } else {
            this.birthDate = null;
          }
        } else {
          this.birthDate = null;
        }
      },
      dueDateText(newValue, oldValue) {
        if (!this.dueDateEdited) {
          this.dueDateEdited = true;
        }
        if (!!newValue.trim()) {
          const date = moment(newValue);
          if (date.isValid()) {
            this.dueDate = date;
          } else {
            this.dueDate = null;
          }
        } else {
          this.dueDate = null;
        }
      }
    },
    methods: {
      fileChanged(event) {
        this.file = event.target.files[0];
      },
      close() {
        this.$emit("escape");
      },
      async upload() {
        if (
          this.birthDate == null ||
          !this.birthDate.isValid() ||
          this.dueDate == null ||
          !this.dueDate.isValid()
        ) {
          this.error = "Please fill out all forms.";
          return;
        }
        try {
          const formData = {
            name: this.name,
            birthDate: this.birthDate.valueOf(),
            dueDate: this.dueDate.valueOf(),
          };

          this.error = await this.$store.dispatch("uploadPatient", formData);
          if (!this.error) {
            this.name = "";

            this.birthDate = null;
            this.birthDateText = "";
            this.birthDateEdited = false;

            this.dueDate = null;
            this.dueDateText = "";
            this.dueDateEdited = false;

            this.$emit("uploadFinished");
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };
</script>

<style scoped>
  input {
    width: 100%;
  }

  textarea {
    width: 100%;
    height: 100px;
  }

  .pure-button-secondary {
    float: right;
  }
  p.verification {
    color: #cc0000;
    margin: 0;
    margin-left: 12px;
    font-size: 14px;
  }
</style>
