<template>
  <div>
    <div ref="loading" class="container" v-if="loading">loading...</div>

    <div ref="container" class="container" v-if="!loading">
      <b-card :header="'Welcome, ' + account.name" class="mt-3">
        <b-card-text>
          <div>
            Account: <code>{{ account.id }}</code>
          </div>
          <div>
            Balance:
            <code
              >{{ account.currency === "usd" ? "$" : "€"
              }}{{ account.balance }}</code
            >
          </div>
        </b-card-text>
        <b-button ref="newPayment" size="sm" variant="success" @click="showNewPaymentCard = !showNewPaymentCard"
          >New payment</b-button>

        <b-button
          ref="logoutButton"
          class="float-right"
          variant="danger"
          size="sm"
          @click="logout"
          >Logout</b-button
        >
      </b-card>

      <b-card ref="newPaymentCard" class="mt-3" header="New Payment" v-show="showNewPaymentCard">
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-1" label="To:" label-for="input-1">
            <b-form-input
              id="input-1"
              size="sm"
              v-model="payment.to"
              type="number"
              required
              placeholder="Destination ID"
            ></b-form-input>
          </b-form-group>

          <b-form-group id="input-group-2" label="Amount:" label-for="input-2">
            <b-input-group prepend="$" size="sm">
              <b-form-input
                id="input-2"
                v-model="payment.amount"
                type="number"
                required
                placeholder="Amount"
              ></b-form-input>
            </b-input-group>
          </b-form-group>

          <b-form-group id="input-group-3" label="Details:" label-for="input-3">
            <b-form-input
              id="input-3"
              size="sm"
              v-model="payment.details"
              required
              placeholder="Payment details"
            ></b-form-input>
          </b-form-group>

          <b-button ref="submitPayment" type="submit" size="sm" variant="primary">Submit</b-button>
        </b-form>
      </b-card>

      <b-card class="mt-3" header="Payment History">
        <b-table striped hover :items="transactions"></b-table>
      </b-card>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import Vue from "vue";

export default {
  data() {
    return {
      showNewPaymentCard: false,
      payment: {},
      account: {},
      transactions: [],
      loading: true,
    };
  },
  computed: {
    transactionsScoped() {
      if (this.transactions) {
        return this.transactions.map(transaction => {
          let amount = (this.account.currency === "usd" ? "$" : "€") + transaction.amount;
          if (this.account.id != transaction.to) {
            amount = "-" + amount;
          }
          return {
            id: transaction.id,
            from: transaction.from,
            to: transaction.to,
            details: transaction.details,
            amount,
          };
        })
      } else {
        return [];
      }
    },
  },
  mounted() {
    axios
      .get(`http://localhost:8000/api/accounts/${this.$route.params.id}`)
      .then((response) => {
        console.log('account api ', response)
        if (response.data === 'account_not_found') {
          this.$router.replace('/');
        } else {
          this.account = response.data.account;
          this.transactions = response.data.transactions;
          if (this.account && this.transactions) {
            this.loading = false;
          }
        }
      });
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      axios.post(
        `http://localhost:8000/api/accounts/${
          this.$route.params.id
        }/transactions`,
        this.payment
      ).then((response) => {
        console.log(response);

        if (!response.data.error_message) {
          this.account = response.data.account;
          this.transactions = response.data.transactions;
        } else {
          // show error message
          console.log(response.data.error_message)
        }
        
      })
      this.payment = {};
      this.showNewPaymentCard = false;
    },
    logout() {
      this.$router.push('/');
    }
  }
};
</script>
