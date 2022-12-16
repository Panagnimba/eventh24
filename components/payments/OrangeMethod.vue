<template>
  <div
    class="
      w-full
      flex flex-col
      justify-center
      items-center
      relative
      lg:w-80
      xl:w-96
    "
  >
    <div class="wrapper">
      <div class="header">
        <ul>
          <li class="active form_1_progessbar">
            <div>
              <p>1</p>
            </div>
          </li>
          <li class="form_2_progessbar">
            <div>
              <p>2</p>
            </div>
          </li>
          <li class="form_3_progessbar">
            <div>
              <p>3</p>
            </div>
          </li>
        </ul>
      </div>
      <!--  -->
      <form action="" @submit.prevent="">
        <div class="form_wrap">
          <div class="form_1 data_info">
            <!-- <div class="flex flex-col items-center">
              <img src="/logo.png" alt="" class="w-16 h-16 rounded-full" />
            </div> -->
            <h2>
              Paiement d'une somme de {{ this.getTotal }}fcfa via Orange Money
            </h2>

            <div class="form_container">
              <div class="input_wrap">
                <label for="tel">Numéro orange money</label>
                <input
                  id="tel"
                  type="tel"
                  class="input"
                  placeholder="Numéro orange money"
                  required="true"
                  pattern="^[0-9]{8}$"
                  v-model="paymentInfo.userTel"
                />
              </div>
            </div>
          </div>
          <div class="form_2 data_info" style="display: none">
            <p class="text-justify text-sm pb-5">
              Veuillez composer le
              <a :href="`tel:*866*4*6*${this.getTotal}#`" class="text-blue-900">
                {{ `*866*4*6*${this.getTotal}#` }}
              </a>
              pour générer votre code de paiement
            </p>
            <div class="form_container">
              <div class="input_wrap">
                <label for="otp">Code de paiement</label>
                <input
                  id="otp"
                  name="otp"
                  type="tel"
                  class="input"
                  placeholder="XXXXXX"
                  required="true"
                  pattern="^[0-9]{6}$"
                  v-model="paymentInfo.userOtp"
                />
              </div>
            </div>
          </div>

          <div class="form_3 data_info" style="display: none">
            <h2>Traitement de la commande</h2>
            <div class="form_container">
              <loader v-if="isPending"></loader>
            </div>
          </div>
        </div>
        <!-- btns -->
        <div class="btns_wrap">
          <div class="common_btns form_1_btns">
            <button type="button" class="flex justify-center btn_next">
              <i
                v-if="isNextPending"
                class="fa-solid fa-spinner text-2xl animate-spin"
              >
              </i>
              <span v-else>Next</span>
            </button>
          </div>
          <div class="common_btns form_2_btns" style="display: none">
            <button
              type="button"
              class="w-full flex justify-center btn_next btn_done"
            >
              <i
                v-if="isNext2Pending"
                class="fa-solid fa-spinner text-2xl animate-spin"
              >
              </i>
              <span v-else>Valider</span>
            </button>
          </div>
        </div>
      </form>
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
      //
      isPending: false, //when saving request
      isNextPending: false,
      isNext2Pending: false,
      getTotal: 0,
      paymentInfo: {
        userTel: "",
        userOtp: "",
      },
      notif: {
        show: false,
        type: "",
        message: "",
      },
      //
      form_1: "",
      form_2: "",
      form_3: "",
      form_1_btns: "",
      form_2_btns: "",
      form_2_progessbar: "",
      form_3_progessbar: "",
    };
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
  mounted() {
    this.$store.commit("setPaymentMethod", "orange");
    // calcul du total utiliser dans la generation du code otp
    let total = 0;
    this.$store.state.panier.forEach((elmt) => {
      total += elmt.qte * elmt.price;
    });
    this.getTotal = total;
    //
    if (this.panierContent.length <= 0) {
      this.$router.push("/panier");
    }
    //
    this.form_1 = document.querySelector(".form_1");
    this.form_2 = document.querySelector(".form_2");
    this.form_3 = document.querySelector(".form_3");

    this.form_1_btns = document.querySelector(".form_1_btns");
    this.form_2_btns = document.querySelector(".form_2_btns");

    var form_1_next_btn = document.querySelector(".form_1_btns .btn_next");
    var form_2_next_btn = document.querySelector(".form_2_btns .btn_next");

    this.form_2_progessbar = document.querySelector(".form_2_progessbar");
    this.form_3_progessbar = document.querySelector(".form_3_progessbar");

    form_1_next_btn.addEventListener("click", async () => {
      let pattern1 = /^[0-9]{8}$/;
      if (pattern1.test(this.paymentInfo.userTel)) {
        //
        this.isNextPending = true;
        form_1_next_btn.setAttribute("disabled", true); // evite l'envoi de plusieurs requetes
        let resp = await this.$axios.get("/user/getAuthenticate", {
          headers: this.requestHeader,
        });
        this.isNextPending = false;
        form_1_next_btn.removeAttribute("disabled");
        //
        if (resp.data.success) {
          this.form_1.style.display = "none";
          this.form_2.style.display = "block";
          this.form_1_btns.style.display = "none";
          this.form_2_btns.style.display = "flex";
          this.form_2_progessbar.classList.add("active");
        } else {
          let notAuthUser = {
            _id: "",
            prenom: "",
            tel: "",
            token: null,
          };
          this.$store.commit("authenticateUser", notAuthUser);
          // set redirect_url cookie
          var date = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10mn
          let expires = "; expires=" + date.toUTCString();
          document.cookie =
            "redirect_url" + "=" + ("/commande" || "/") + expires + "; path=/";
          //
          this.$store.commit("toggleLoginPopup", true);
        }
      } else {
        this.notif.show = true;
        this.notif.type = "warning";
        this.notif.message = "Numéro de téléphone invalide";
      }
    });

    form_2_next_btn.addEventListener("click", async () => {
      let pattern1 = /^[0-9]{8}$/;
      let pattern2 = /^[0-9]{6}$/;
      if (
        pattern1.test(this.paymentInfo.userTel) &&
        pattern2.test(this.paymentInfo.userOtp)
      ) {
        //
        this.isNext2Pending = true;
        form_2_next_btn.setAttribute("disabled", true); // evite l'envoi de plusieurs requetes
        let resp = await this.$axios.get("/user/getAuthenticate", {
          headers: this.requestHeader,
        });
        this.isNext2Pending = false;
        form_2_next_btn.removeAttribute("disabled");
        //
        if (resp.data.success) {
          this.form_2.style.display = "none";
          this.form_3.style.display = "block";
          this.form_2_btns.style.display = "none";
          this.form_3_progessbar.classList.add("active");
          this.sendCommande(); // call function to save commande
        } else {
          let notAuthUser = {
            _id: "",
            prenom: "",
            tel: "",
            token: null,
          };
          this.$store.commit("authenticateUser", notAuthUser);
          // set redirect_url cookie
          var date = new Date(Date.now() + 10 * 60 * 60 * 1000); // 10mn
          let expires = "; expires=" + date.toUTCString();
          document.cookie =
            "redirect_url" + "=" + ("/commande" || "/") + expires + "; path=/";
          //
          this.$store.commit("toggleLoginPopup", true);
        }
      }
      //   if tel number is valid then means that otp is invalid
      else if (pattern1.test(this.paymentInfo.userTel)) {
        this.notif.show = true;
        this.notif.type = "warning";
        this.notif.message = "Code de paiement incorrect";
      }
      //   else if tel number invalid return back to phone number form
      else {
        this.paymentInfo.userOtp = "";
        this.form_1.style.display = "block";
        this.form_2.style.display = "none";
        this.form_1_btns.style.display = "flex";
        this.form_2_btns.style.display = "none";
        this.form_2_progessbar.classList.remove("active");
      }
    });
  },

  methods: {
    async sendCommande() {
      let panier = this.$store.state.panier;
      this.paymentInfo.method = "orange"; // tel , otp , method
      let commande = {
        client: this.$store.state.user,
        items: [...panier],
        // tel , otp , method
        paymentInfo: this.paymentInfo,
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
        // vider le panier
        this.$store.commit("viderPanier");
        setTimeout(() => {
          this.$router.push("/commande/mescommandes");
        }, 3000);
        //
      } else if (resp.data.isNotAuth) {
        let notAuthUser = {
          _id: "",
          prenom: "",
          tel: "",
          token: null,
        };
        this.$store.commit("authenticateUser", notAuthUser);
        //
        this.notif.show = true;
        this.notif.type = "warning";
        this.notif.message = "Veuillez vous connectez puis rééssayer";
        // If error occurs or user not connected in the command process
        // return the the form and fill it again
        this.paymentInfo.userOtp = "";
        this.form_1.style.display = "block";
        this.form_2.style.display = "none";
        this.form_3.style.display = "none";
        this.form_1_btns.style.display = "flex";
        this.form_2_btns.style.display = "none";
        this.form_2_progessbar.classList.remove("active");
        //
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
        // If error occurs in the command process
        // return the the form and fill it again
        this.paymentInfo.userOtp = "";
        this.form_1.style.display = "block";
        this.form_2.style.display = "none";
        this.form_3.style.display = "none";
        this.form_1_btns.style.display = "flex";
        this.form_2_btns.style.display = "none";
        this.form_2_progessbar.classList.remove("active");
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  max-width: 100%;
  background: white;
  margin: 30px;
  padding: 30px;
  border-radius: 5px;
}

.wrapper .header {
  margin-bottom: 35px;
  display: flex;
  justify-content: center;
}

.wrapper .header ul {
  display: flex;
}

.wrapper .header ul li {
  margin-right: 50px;
  position: relative;
  color: white;
  font-weight: bold;
}

.wrapper .header ul li:last-child {
  margin-right: 0;
}

.wrapper .header ul li:before {
  content: "";
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 55px;
  width: 100%;
  height: 2px;
  background: var(--second);
}

.wrapper .header ul li:last-child:before {
  display: none;
}

.wrapper .header ul li div {
  padding: 5px;
  border-radius: 50%;
}

.wrapper .header ul li p {
  width: 50px;
  height: 50px;
  background: var(--primary);
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
}

.wrapper .header ul li.active:before {
  background: var(--third);
}

.wrapper .header ul li.active p {
  background: var(--third);
}

.wrapper .form_wrap {
  margin-bottom: 35px;
}

.wrapper .form_wrap h2 {
  color: var(--primary);
  text-align: center;
  text-transform: uppercase;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 14px;
}

.wrapper .form_wrap .input_wrap {
  max-width: 100%;
  margin: 0 auto 20px;
}

.wrapper .form_wrap .input_wrap:last-child {
  margin-bottom: 0;
}

.wrapper .form_wrap .input_wrap label {
  display: block;
  margin-bottom: 5px;
  font-weight: 500;
}

.wrapper .form_wrap .input_wrap .input {
  border: 2px solid var(--general);
  border-radius: 5px;
  padding: 10px;
  display: block;
  width: 100%;
  font-size: 16px;
  transition: 0.5s ease;
}

.wrapper .form_wrap .input_wrap .input:focus {
  outline-color: var(--third);
}
.wrapper .form_wrap .input_wrap .input:valid {
  outline-color: var(--fourth);
}
.wrapper .form_wrap .input_wrap .input:invalid {
  outline-color: var(--third);
}

.wrapper .btns_wrap {
  max-width: 100%;
  margin: 0 auto;
}

.wrapper .btns_wrap .common_btns {
  display: flex;
  justify-content: space-between;
}

.wrapper .btns_wrap .common_btns.form_1_btns {
  justify-content: flex-end;
}

.wrapper .btns_wrap .common_btns button {
  border: 0;
  padding: 12px 15px;
  background: var(--third);
  color: white;
  justify-content: center;
  display: flex;
  align-items: center;
  font-size: 16px;
  border-radius: 5px;
  transition: 0.5s ease;
  cursor: pointer;
}

.wrapper .btns_wrap .common_btns button.btn_next .icon {
  display: flex;
  margin-left: 10px;
}

.wrapper .btns_wrap .common_btns button.btn_next:hover,
.wrapper .btns_wrap .common_btns button.btn_done:hover {
  background: var(--third);
  opacity: 0.9;
}

.modal_wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  visibility: hidden;
}

.modal_wrapper .shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  opacity: 0;
  transition: 0.2s ease;
}

.modal_wrapper .success_wrap {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -800px);
  background: white;
  padding: 50px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: 0.5s ease;
}

.modal_wrapper .success_wrap .modal_icon {
  margin-right: 20px;
  width: 50px;
  height: 50px;
  background: var(--primary);
  color: var(--white);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  font-weight: 700;
}

.modal_wrapper.active {
  visibility: visible;
}

.modal_wrapper.active .shadow {
  opacity: 1;
}

.modal_wrapper.active .success_wrap {
  transform: translate(-50%, -50%);
}
</style>