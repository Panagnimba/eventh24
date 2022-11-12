<template>
  <div class="w-full h-full overflow-hidden">
    <!-- partner header -->
    <div
      class="flex justify-between items-center bg-primary text-white px-4 py-1"
    >
      <nuxt-link to="/" class="font-bold text-xl">
        Vino<span class="text-third">Ticket</span>
        <!-- <img src="/logo.png" class="w-12" /> -->
      </nuxt-link>
      <div
        @click="deconnexion"
        class="flex flex-col items-center gap-1 cursor-pointer"
      >
        <i class="fa-solid fa-power-off"></i>
        <span class="text-xs">Deconnexion</span>
      </div>
    </div>
    <div class="h-screen flex flex-col scanwrapper sm:flex-row p-4">
      <div
        class="w-full h-full flex flex-col gap-2 justify-center items-center"
      >
        <!-- Select event -->
        <select class="w-72 p-2" v-model="eventId">
          <option :value="null" disabled>Selectionner l'évènement</option>
          <option v-for="(evt, k) in this.events" :key="k" :value="evt._id">
            {{ evt.intitule }}
          </option>
        </select>
        <!-- scanner -->
        <div class="scan w-72 h-72">
          <div class="qrcode w-full h-full">
            <video ref="video" class="w-full h-full object-cover"></video>
          </div>
          <h3>Qr Code Scanning...</h3>
          <div class="scanborder"></div>
        </div>
        <!--  -->
        <div class="w-72 flex justify-between" v-if="this.eventId">
          <button
            @click="startScanner"
            class="bg-fourth text-white px-8 font-semibold p-1 rounded-xl"
          >
            Start
          </button>
          <button
            @click="stopScanner"
            class="bg-third text-white px-8 font-semibold p-1 rounded-xl"
          >
            Stop
          </button>
        </div>
        <!--  -->

        <audio id="success_audio" src="/Scanner/beep_success.wav" />
        <audio id="error_audio" src="/Scanner/beep_error.mp3" />
      </div>
      <!-- result -->
      <div class="w-full flex flex-col gap-3 bg-general h-1/2 p-2">
        <div class="w-full flex flex-col gap-3 p-2">
          <div class="font-bold text-second text-sm">
            CMDID:
            <span class="text-third px-2">{{ this.scanResult.cmmdeId }}</span>
          </div>
          <div class="font-bold text-second text-sm">
            EVTID:
            <span class="text-third px-2">{{ this.scanResult.eventId }}</span>
          </div>

          <!-- event -->
          <div class="font-bold text-second text-sm">
            EVENT:
            <span class="text-third px-2">{{ this.eventId }}</span>
          </div>
          <div class="font-bold text-second text-sm">
            EVENT:
            <span class="text-third px-2">{{ this.eventId }}</span>
          </div>
        </div>
        <!-- loader -->
        <div class="w-full" v-if="this.isPending">
          <loader></loader>
        </div>
        <!-- La categorie du ticket normal couple vip ... -->
        <div v-else class="text-2xl text-fourth text-center font-bold">
          {{ this.eventCategorie }}
        </div>
      </div>
      <!--  -->
      <notification-notif
        v-if="this.notif.show"
        @closeNotif="notif.show = false"
        :notif="this.notif"
      ></notification-notif>
    </div>
  </div>
</template>
<script>
import QrScanner from "qr-scanner";
export default {
  data() {
    return {
      isPending: false, //loader
      qrScanner: null,
      eventId: null,
      eventCategorie: "",
      events: [],
      //
      scanResult: {
        eventId: "null",
        cmmdeId: "null",
      },
      notif: {
        show: false,
        type: "",
        message: "",
      },
      //
      requestHeader: {
        Authorization: `Bearer ${this.$store.state.partner.token}`,
        "Content-Type": "application/json",
      },
    };
  },
  // Check partner login
  middleware({ store, redirect }) {
    if (
      store.state.partner.isAuthenticated == false ||
      store.state.partne.token == null
    )
      return redirect("/partner/login");
  },
  async fetch() {
    this.isPending = true;
    let resp1 = await this.$axios.get("/partner/getScanEvents", {
      headers: this.requestHeader,
    });
    this.isPending = false;
    if (resp1.data.success) {
      this.events = resp1.data.result.filter((evnt) => {
        let eventDate = new Date(evnt.date).getTime();
        let actualDate = new Date().getTime();
        // au moins un jour avant le spectacle et 5h apres
        return (
          actualDate > eventDate - 24 * 60 * 60 * 1000 &&
          actualDate < eventDate + 5 * 60 * 60 * 1000
        );
      });
    }
  },
  async mounted() {
    this.qrScanner = await new QrScanner(this.$refs.video, async (result) => {
      this.qrScanner.stop();
      this.scanResult.cmmdeId = result.split("|")[0];
      this.scanResult.eventId = result.split("|")[1];
      //
      if (this.scanResult.eventId == this.eventId) {
        this.isPending = true;
        let resp = await this.$axios.post(
          `/eventh24/deleteCommande`,
          { commandeId: this.scanResult.cmmdeId, eventId: this.eventId },
          {
            headers: this.requestHeader,
          }
        );
        this.isPending = false;
        if (resp.data.success) {
          // restart scannning process
          document.querySelector("#success_audio").play();
          this.scanResult = {
            eventId: "null",
            cmmdeId: "null",
          };
          this.notif.show = true;
          this.notif.type = "success";
          this.notif.message = `${resp.data.message} ==> (${resp.data.categorie})`;
          this.eventCategorie = resp.data.categorie;
          //
          this.qrScanner.start();
        } else {
          document.querySelector("#error_audio").play();
          this.notif.show = true;
          this.notif.type = "error";
          this.notif.message = resp.data.message;
        }
      } else {
        document.querySelector("#error_audio").play();
        this.notif.show = true;
        this.notif.type = "warning";
        this.notif.message = "Evènement non disponible actuellement";
      }
    });
    this.qrScanner.setInversionMode("both");
  },
  methods: {
    startScanner() {
      if (QrScanner.hasCamera()) this.qrScanner.start();
      else console.log("Cet appareil ne dispose pas de camera");
      this.eventCategorie = "";
      this.scanResult = {
        eventId: "null",
        cmmdeId: "null",
      };
    },
    stopScanner() {
      this.qrScanner.stop();
      this.scanResult = {
        eventId: "null",
        cmmdeId: "null",
      };
    },
    deconnexion() {
      let auth = {
        isAuthenticated: false,
        token: null,
      };
      //commit state to logout admin
      this.$store.commit("authenticatePartner", auth);
      this.$router.push("/partner/login");
    },
  },
};
</script>
<style scoped>
.scanwrapper {
  background-color: #111;
}
.scan {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}
.scan .qrcode {
  position: relative;

  background: url("/Scanner/QR_Code01.png");
  background-size: 100%;
  border: 1px solid white;
}
.scan .qrcode::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  background: url("/Scanner/QR_Code02.png");
  background-size: 100%;
  animation: animate 4s linear infinite;
}
.scan .qrcode::after {
  content: "";
  position: absolute;
  inset: 20px;
  width: calc(100% - 40px);
  height: 2px;
  background-color: #35fd5c;
  filter: drop-shadow(0 0 20px #35fd5c) drop-shadow(0 0 60px #35fd5c);
  animation: animateLine 4s linear infinite;
}
@keyframes animateLine {
  0%,
  100% {
    top: 0%;
  }
  50% {
    top: 100%;
  }
}
@keyframes animate {
  0%,
  100% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
}
.scanborder {
  position: absolute;
  inset: 0;
  background: url("/Scanner/border.png");
  background-size: 100%;
  background-repeat: no-repeat;
  animation: animateText 1.2s linear infinite;
}
.scan h3 {
  text-transform: uppercase;
  color: white;
  filter: drop-shadow(0 0 20px #fff) drop-shadow(0 0 60px #fff);
  animation: animateText 0.5s steps(1) infinite;
}
@keyframes animateText {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
}
</style>