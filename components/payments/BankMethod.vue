<template>
  <div class="w-full flex flex-col justify-center items-center">
    <loader v-if="isPending"></loader>
    <div
      v-show="!isPending"
      class="w-full flex flex-wrap justify-evenly gap-12 md:justify-center"
    >
      <div class="w-full md:w-96">
        <panier-total-panier></panier-total-panier>
      </div>
      <div class="flex flex-col gap-14">
        <form class="credit-card">
          <div class="front mb-28 sm:mb-0">
            <div class="card-data-row">
              <div class="brand-name">
                Vino<span class="text-third">Ticket</span>
              </div>
              <img data-logo :src="logoSrc" class="logo" />
            </div>
            <fieldset class="form-group">
              <legend>Card Number</legend>
              <label for="cc-1">Card Number</label>
              <div
                data-connected-inputs
                class="cc-inputs horizontal-input-stack"
              >
                <input
                  type="tel"
                  maxlength="4"
                  aria-label="Credit Card First 4 Digits"
                  id="cc-1"
                  required
                  pattern="[0-9]{4}"
                />
                <input
                  type="tel"
                  maxlength="4"
                  aria-label="Credit Card Second 4 Digits"
                  required
                  pattern="[0-9]{4}"
                />
                <input
                  type="tel"
                  maxlength="4"
                  aria-label="Credit Card Third 4 Digits"
                  required
                  pattern="[0-9]{4}"
                />
                <input
                  type="tel"
                  maxlength="4"
                  aria-label="Credit Card Last 4 Digits"
                  required
                  pattern="[0-9]{4}"
                />
              </div>
            </fieldset>
            <div class="input-row">
              <div class="form-group name-group">
                <label for="name">Name</label>
                <input type="text" id="name" required />
              </div>
              <fieldset class="form-group">
                <legend>Expiration</legend>
                <label for="expiration-month">Expiration</label>
                <div class="horizontal-input-stack">
                  <select
                    id="expiration-month"
                    aria-label="Expiration Month"
                    required
                  >
                    <option class="p-3">01</option>
                    <option class="p-3">02</option>
                    <option class="p-3">03</option>
                    <option class="p-3">04</option>
                    <option class="p-3">05</option>
                    <option class="p-3">06</option>
                    <option class="p-3">07</option>
                    <option class="p-3">08</option>
                    <option class="p-3">09</option>
                    <option class="p-3">10</option>
                    <option class="p-3">11</option>
                    <option class="p-3">12</option>
                  </select>
                  <select
                    id="expiration-year"
                    aria-label="Expiration Year"
                    required
                    data-expiration-year
                  ></select>
                </div>
              </fieldset>
            </div>
          </div>
          <div class="back absolute top-28 sm:top-8 sm:left-20">
            <div class="stripe"></div>
            <div class="form-group cvc-group">
              <label for="cvc">CVC</label>
              <input
                class="cvc-input"
                type="tel"
                maxlength="3"
                id="cvc"
                required
              />
            </div>
          </div>
        </form>
        <!-- send commande button -->
        <div
          @click="sendCommande"
          class="
            bg-green-900
            hover:bg-green-800
            text-white
            font-bold
            p-2
            text-center
            rounded-md
            cursor-pointer
          "
        >
          Valider ma commande
        </div>
      </div>
    </div>
    <notification-notif
      v-if="this.notif.show"
      @closeNotif="notif.show = false"
      :notif="this.notif"
    ></notification-notif>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logoSrc: "/Payments/visa.svg",
      //
      isPending: false,
      notif: {
        show: false,
        type: "",
        message: "",
      },
    };
  },
  head() {
    return {
      script: [{ hid: "bank", src: "/Payments/bank.js", defer: true }],
    };
  },
  mounted() {
    if (this.panierContent.length <= 0) {
      this.$router.push("/");
    }
    //
    const expirationSelect = document.querySelector("[data-expiration-year]");
    const currentYear = new Date().getFullYear();
    for (let i = currentYear; i < currentYear + 10; i++) {
      const option = document.createElement("option");
      option.classList.add("p-3");
      option.value = i;
      option.innerText = i;
      expirationSelect.append(option);
    }
  },
  computed: {
    panierContent() {
      return this.$store.state.panier;
    },
    requestHeader() {
      return {
        Authorization: `Bearer ${this.$store.state.user.token}`,
        "Content-Type": "application/json",
      };
    },
  },
  methods: {
    async sendCommande() {
      let panier = this.$store.state.panier;
      let commande = {
        paymentMethod: panier[0].paymentMethod,
        client: this.$store.state.user,
        items: [...panier],
      };
      this.isPending = true;
      let resp = await this.$axios.post("/user/saveCommande", commande, {
        headers: this.requestHeader,
      });
      this.isPending = false;
      //
      if (resp.data.success) {
        this.notif.show = true;
        this.notif.type = "success";
        this.notif.message = resp.data.message;
        //
        this.$router.push("/commande/mescommandes");
        //
      } else if (resp.data.isNotAuth) {
        // set redirect_url cookie
        var date = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10mn
        let expires = "; expires=" + date.toUTCString();
        document.cookie =
          "redirect_url" + "=" + ("/commande" || "/") + expires + "; path=/";
        //
        // this.$router.push("/login");
        this.$store.commit("toggleLoginPopup", true);
      } else if (resp.data.eventNonDispo) {
        this.notif.show = true;
        this.notif.type = "warning";
        this.notif.message = resp.data.message;
        // remove the inexistant or unavaible event to the cart
        this.$store.commit("removeToCart", resp.data.eventId);
      } else {
        this.notif.show = true;
        this.notif.type = "error";
        this.notif.message = resp.data.message;
      }
    },
  },
};
</script>
<style scoped>
.credit-card {
  color: white;
  font-family: Arial;
  position: relative;
}

.credit-card .front,
.credit-card .back {
  background-color: hsl(200, 80%, 30%);
  border: 1px solid hsl(200, 80%, 10%);
  border-radius: 0.5rem;
  width: 100%;
  height: 220px;
  padding: 0.75rem 1rem;
  padding-bottom: 1.25rem;
}

.credit-card .front {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  z-index: 1;
  overflow: hidden;
  position: relative;
}

.credit-card .card-data-row {
  display: flex;
  margin-bottom: auto;
}

.credit-card .logo {
  height: 40px;
  width: 50px;
  flex-grow: 0;
}

.credit-card .brand-name {
  flex-grow: 1;
  font-size: 1.25rem;
  font-weight: bold;
}

.credit-card .form-group {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.credit-card fieldset {
  border: none;
  padding: 0;
  margin: 0;
}

.credit-card fieldset legend {
  visibility: hidden;
  height: 0;
  width: 0;
  position: absolute;
  top: -200vh;
}

.credit-card .horizontal-input-stack {
  display: flex;
  gap: 0.5rem;
}

.credit-card .cc-inputs input {
  width: 45px;
  font-family: monospace;
  font-size: 14px;
  color: black;
}

.credit-card input,
.credit-card select {
  padding: 0.25em 0.5em;
  border: none;
  border-radius: 0.25em;
  appearance: none;
  color: black;
  font-size: 14px;
}

.credit-card label {
  font-size: 14px;
  text-transform: uppercase;
  font-weight: 500;
  font-family: Arial, Helvetica, sans-serif;
}

.credit-card .input-row {
  display: flex;
  gap: 2rem;
}

.credit-card .name-group {
  flex-grow: 1;
}

.credit-card .front::before {
  content: "";
  position: absolute;
  height: 400px;
  width: 400px;
  border-radius: 100%;
  background-color: hsl(0, 0%, 100%, 0.15);
  top: -250px;
  left: -150px;
  z-index: -1;
}

.credit-card .front::after {
  content: "";
  position: absolute;
  height: 600px;
  width: 600px;
  border-radius: 100%;
  background-color: hsl(0, 0%, 100%, 0.075);
  bottom: -475px;
  left: -150px;
  z-index: -1;
}

.credit-card .back {
  position: absolute;
  /* top: 2rem;
  left: 75px; */
}
.credit-card .stripe {
  background-color: hsl(200, 80%, 10%);
  height: 35px;
  position: absolute;
  left: 0;
  right: 0;
  top: 1.5rem;
}

.credit-card .cvc-group {
  position: absolute;
  bottom: 3.25rem;
  right: 0.5rem;
}

.credit-card .cvc-input {
  width: 50px;
  font-family: monospace;
  font-size: 14px;
}
</style>