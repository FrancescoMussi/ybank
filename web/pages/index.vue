<template>
  <div class="container">
    <div>
      <b-form>
        <b-form-group
          id="input-group-2"
          label="Enter your account ID:"
          label-for="input-2"
        >
          <b-form-input
            id="input"
            type="number"
            v-model="accountID"
            required
            placeholder="Account ID"
          ></b-form-input>
        </b-form-group>

        <b-button ref="loginButton" @click="goToAccount" variant="primary"
          >Login</b-button
        >
      </b-form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  data() {
    return {
      accountID: 1
    };
  },
  components: {},
  methods: {
    goToAccount() {
      this.$router.push({path: `/accounts/${this.accountID}`})
    },
  }
});
</script>

<style scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
