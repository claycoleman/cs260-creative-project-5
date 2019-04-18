<template>
  <div class="home">
    <span class="banner-img">
      <div class="center-info">
        <h1>MAAME</h1>
        <h3>Maternal Health Management for Developing Nations</h3>
        <p>
          Maame is a tech organization dedicated to improved health outcomes for
          mothers in rural areas of developing nations, such as Ghana and
          Uganda. We develop a maternal health app for both the iOS and Android
          platforms which allows community health workers in rural regions to
          keep track of patients and ensure they get the proper prenatal and
          postnatal visits during their pregnancies.
        </p>
      </div>
    </span>
  </div>
</template>

<script>
  export default {
    name: "home",
    computed: {
      patients() {
        return this.$store.state.patients;
      }
    },
    async created() {
      await this.$store.dispatch("getAllPatients");
    }
  };
</script>

<style scoped>
  .home {
    width: 100%;
    max-width: 768px;
    margin: 0 auto;
    padding-bottom: 64px;
    padding-top: 16px;
  }

  .banner-img {
    position: absolute;
    left: 0;
    top: 48px;
    height: calc(100vh - 48px);
    width: 100vw;
    background-image: url(../assets/women.jpg);
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    max-width: 100%;
    vertical-align: middle;
    border: 0;
    display: block;
  }

  .center-info {
    position: relative;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
    max-width: 800px;
    background: rgba(0, 0, 0, 0.65);
    padding: 16px;
    border-radius: 4px;
  }

  .center-info * {
    color: white;
  }

  .home h1 {
    text-align: center;
    font-weight: 600;
    letter-spacing: 2px;
    text-align: center;
    font-size: 42px;
    margin: 0;
  }

  .home h3 {
    text-transform: uppercase;
    text-align: center;
    font-size: 18px;
    border-bottom: 2px solid white;
    padding-bottom: 8px;
  }
</style>
