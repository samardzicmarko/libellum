<template>
  <div id="forma">
    <div class="container">
      <div id="panel" class="card">
        <h2 class="card-header">Izrada računa</h2>

        <div class="card-body">
          <div class="row">
            <div class="col-8">
              <form id="izdavatelj">
                <div class="naslovIzdavatelj">
                  <h4>Podaci izadvatelju računa</h4>
                </div>
                <div class="form-group w-75 row">
                  <label for="inputName">Ime i prezime, ime firme/obrta:</label>
                  <input type="text" class="form-control" id="inputName" />
                </div>
                <div class="form-group w-75 row">
                  <label for="inputEmail">E-mail:</label>
                  <input type="email" class="form-control" id="inputEmail" />
                </div>
                <div class="form-group w-75 row">
                  <label for="inputTelephone">Broj telefona:</label>
                  <input
                    type="number"
                    class="form-control"
                    id="inputTelephone"
                  />
                </div>
                <div class="form-group w-75 row">
                  <label for="inputStreet">Ulica:</label>
                  <input type="text" class="form-control" id="inputStreet" />
                </div>
                <div class="form-group w-75 row">
                  <label for="inputCity">Grad, Regija:</label>
                  <input type="text" class="form-control" id="inputCity" />
                </div>
                <div class="form-group w-75 row">
                  <label for="inputZip">Poštanski broj:</label>
                  <input type="text" class="form-control" id="inputZip" />
                </div>
              </form>
            </div>
            <div class="col-md-4">
              <form id="primatelj">
                <div class="naslovPrimatelj">
                  <h4>Podaci primatelju računa</h4>
                </div>
                <div class="form-group row">
                  <label for="inName">Ime i prezime, ime firme/obrta:</label>
                  <input type="text" class="form-control" id="inName" />
                </div>
                <div class="form-group row">
                  <label for="inEmail">E-mail:</label>
                  <input type="email" class="form-control" id="inEmail" />
                </div>
                <div class="form-group row">
                  <label for="inTelephone">Broj telefona:</label>
                  <input type="number" class="form-control" id="inTelephone" />
                </div>
                <div class="form-group row">
                  <label for="inStreet">Ulica:</label>
                  <input type="text" class="form-control" id="inStreet" />
                </div>
                <div class="form-group row">
                  <label for="inCity">Grad, Regija:</label>
                  <input type="text" class="form-control" id="inCity" />
                </div>
                <div class="form-group row">
                  <label for="inZip">Poštanski broj:</label>
                  <input type="text" class="form-control" id="inZip" />
                </div>
              </form>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <form>
                <p>Podaci o računu</p>
                <div class="form-group row">
                  <label for="brRacuna">Broj računa:</label>
                  <input type="text" class="form-control w-50" id="brRacuna" />
                </div>
                <div class="form-group row">
                  <label for="datum">Datum:</label>
                  <datepicker
                    id="datumRacuna"
                    v-model="getCurrentDate"
                  ></datepicker>
                </div>
                <div class="form-group row">
                  <label for="datum">Rok plačanja:</label>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import datepicker from "vue-date";
import moment from "moment";

export default {
  name: "aboutForm.vue",
  components: {
    datepicker,
  },
  data() {
    return {
      currentDate: "",
    };
  },
  methods: {
    getCurrentDate: function(date) {
      const d = moment(date, "YYYY-MM-DD").format("DD/MM/YYYY");
      this.currentDate = d;
    },
  },
  filters: {
    moment: function(date) {
      return moment(date).format("MMM do YYYY");
    },
  },
};
</script>

<style>
#izdavatelj {
  padding: 20px;
}
#primatelj {
  padding: 20px;
}
#panel {
  top: 30px;
}
.naslovIzdavatelj {
  display: flex;
  justify-content: left;
}

.naslovPrimatelj {
  float: left;
}

#datumRacuna {
  padding: 5px;
}
</style>
