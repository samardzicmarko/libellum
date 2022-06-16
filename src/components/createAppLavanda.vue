<template>
  <div class="container">
    <div ref="content">
      <v-card id="mainCard" class="mx-auto">
        <v-card-title id="racun" class="headline justify-center">
          <div id="naslov">Izrada računa</div>
        </v-card-title>
        <hr />

        <div class="row">
          <div class="col-md-6">
            <v-card class="mx-auto" outlined>
              <v-card outlined>
                <v-card-title id="naslovIzdavatelj" class="headline">
                  <div>Podaci o izdavatelju računa</div>
                </v-card-title>
                <GeneralInfo @dataSent="fillData" />
                <v-container id="bankovniPodaci">
                  <v-text-field
                    v-model="racun.iban"
                    maxlength="40"
                    label="IBAN"
                    :rules="[rules.required, rules.adresa]"
                    required
                  ></v-text-field>
                  <v-text-field
                    v-model="racun.swift"
                    maxlength="40"
                    label="SWIFT adresa: "
                    required
                  ></v-text-field>
                </v-container>
              </v-card>
            </v-card>
          </div>
          <div class="col-md-6">
            <v-card class="mx-auto" outlined>
              <v-card-title id="naslovIzdavatelj" class="headline">
                <div>Podaci o klijentu</div>
              </v-card-title>
              <GeneralInfo @dataSent="fillBuyer" />
            </v-card>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <v-card class="mx-auto" outlined>
              <v-card-title id="podaciRacun" class="headline">
                <div>Podaci o računu</div>
              </v-card-title>
              <div class="row">
                <div class="col-md-7" id="racunInfo">
                  <v-text-field
                    v-model="racun.br_racuna"
                    label="Račun Broj: "
                    hint="Primjer: 2020/10/1"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <DateInput @dateSent="fillDate" :hint="hintDatumIzdavanja" />
                  <DateInput
                    @dateSent="fillDospijece"
                    :hint="hintDatumDospijeca"
                  />
                  <v-text-field
                    v-model="racun.mjesto"
                    label="Mjesto izdavanja"
                    :rules="[rules.required]"
                  ></v-text-field>
                  <v-text-field
                    v-model="racun.operater"
                    label="Oznaka operatera:"
                    :rules="[rules.required]"
                    hint="Ime i prezime ili OIB"
                  ></v-text-field>
                </div>

                <div class="col-md-4" id="additionalInfo">
                  <div class="radioTitle">Obračun PDV-a:</div>
                  <v-radio-group
                    v-model="racun.tax_included"
                    @change="
                      calculateTotalWithTax(proizvod);
                      discountTotal();
                    "
                    :rules="[rules.required]"
                  >
                    <v-radio label="S PDV-om" value="yes"></v-radio>
                    <v-radio label="Bez PDV-a" value="no"></v-radio>
                  </v-radio-group>
                  <div class="radioTitle">Valuta plaćanja:</div>
                  <v-radio-group
                    id="valutaRadio"
                    v-model="racun.valuta"
                    :rules="[rules.required]"
                  >
                    <v-radio label="Kuna (HRK)" value="kn"></v-radio>
                    <v-radio label="EURO (‎€)" value="€"></v-radio>
                  </v-radio-group>
                  <v-select
                    v-model="racun.nacin_placanja"
                    :items="paymentMethod"
                    :rules="[rules.required]"
                    solo
                    label="Način plaćanja"
                  ></v-select>
                </div>
              </div>
            </v-card>
          </div>
        </div>
        <div class="row">
          <div class="col-12">
            <v-card class="mx-auto">
              <div class="talbe-responsive-md">
                <table class="table">
                  <thead>
                    <tr>
                      <th id="clearIcon" scope="col"></th>

                      <th
                        scope="col"
                        class="col-sm-3 col-md-3 col-xs-3 col-lg-3"
                      >
                        Usluga/Proizvod
                      </th>
                      <th
                        scope="col"
                        class="col-sm-2 col-md-2 col-xs-2 col-lg-2"
                      >
                        Cijena
                      </th>
                      <th scope="col" class="col-sm-1 col-md-1 col-xs-1">
                        Količina
                      </th>

                      <th
                        scope="col"
                        class="col-sm-2 col-md-2 col-xs-2 col-lg-2"
                      >
                        Konačna cijena
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      v-for="(proizvod, index) in racun.proizvodi"
                      :key="index"
                    >
                      <td scope="row" class="trashIconContainer">
                        <button @click="deleteProduct(index)">
                          <img :src="removeImage" />
                        </button>
                      </td>
                      <td>
                        <div class="input-group input-group-md mb-3">
                          <input
                            class="form-control text-left col-sm-12"
                            type="text"
                            v-model="proizvod.ime"
                          />
                        </div>
                      </td>
                      <td>
                        <div class="input-group input-group-md mb-3">
                          <input
                            class="form-control text-center"
                            type="number"
                            v-model="proizvod.cijena"
                            @change="calculateRowTotal(proizvod)"
                          />
                        </div>
                      </td>
                      <td>
                        <div class="input-group">
                          <input
                            class="form-control text-center"
                            type="number"
                            v-model="proizvod.kolicina"
                            @change="calculateRowTotal(proizvod)"
                          />
                        </div>
                      </td>
                      <td>
                        <div class="input-group input-group-md mb-3">
                          <input
                            class="form-control text-right"
                            type="number"
                            min="0"
                            step=".01"
                            readonly
                            @update="proizvod.iznos_ukupno"
                            v-model="proizvod.iznos_ukupno"
                          />
                        </div>
                      </td>
                    </tr>
                    <tr v-if="racun.tax_included === 'yes'">
                      <td></td>
                      <td></td>
                      <td></td>

                      <td class="text-right">Osnovica:</td>
                      <td class="text-right">
                        {{ racun.iznos_bez_pdv }}
                        <p class="valuta" v-if="racun.valuta === 'kn'">kn</p>
                        <p class="valuta" v-else-if="racun.valuta === '€'">€</p>
                      </td>
                    </tr>
                    <tr v-if="racun.tax_included === 'yes'">
                      <td></td>
                      <td></td>
                      <td></td>

                      <td
                        class="text-right"
                        v-if="racun.tax_included === 'yes'"
                      >
                        PDV {{ racun.pdv }} %
                      </td>
                      <td class="text-right">
                        {{ racun.tax_amount }}
                        <p class="valuta" v-if="racun.valuta === 'kn'">kn</p>
                        <p class="valuta" v-else-if="racun.valuta === '€'">€</p>
                      </td>
                    </tr>

                    <tr v-if="racun.popust !== 'yes'">
                      <td></td>
                      <td></td>
                      <td></td>

                      <td class="text-right" id="totalText">Ukupno:</td>
                      <td
                        class="text-right"
                        id="totalPrice"
                        @change="calculateTotalWithTax(proizvod)"
                      >
                        {{ racun.ukupan_iznos | currency
                        }}{{ racun.iznos_nakon_popusta | currency }}
                        <p class="valuta" v-if="racun.valuta === 'kn'">kn</p>
                        <p class="valuta" v-else-if="racun.valuta === '€'">€</p>
                      </td>
                    </tr>

                    <tr
                      v-if="
                        racun.popust === 'yes' &&
                          (racun.popustPerc > 0 || racun.popustIznos > 0)
                      "
                    >
                      <td></td>
                      <td></td>
                      <td></td>

                      <td class="text-right" id="totalText">Popust:</td>
                      <td
                        class="text-right"
                        id="totalPrice"
                        v-if="racun.popustPerc > 0"
                      >
                        -{{ racun.popustPerc }} %
                      </td>
                      <td
                        class="text-right"
                        id="totalPrice"
                        v-if="racun.popustIznos > 0"
                      >
                        -{{ racun.popustIznos | currency }}
                        <p class="valuta" v-if="racun.valuta === 'kn'">kn</p>
                        <p class="valuta" v-else-if="racun.valuta === '€'">€</p>
                      </td>
                    </tr>

                    <tr
                      v-if="
                        racun.popust === 'yes' &&
                          (racun.popustPerc > 0 || racun.popustIznos > 0)
                      "
                    >
                      <td></td>
                      <td></td>
                      <td></td>

                      <td class="text-right" id="totalText">Ukupno:</td>

                      <td class="text-right" id="totalPrice">
                        {{ discountTotal(racun) | currency }}
                        <p class="valuta" v-if="racun.valuta === 'kn'">kn</p>
                        <p class="valuta" v-else-if="racun.valuta === '€'">€</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <v-card-text>
                  <div class="discount">
                    <button
                      type="button"
                      class="btn btn-info"
                      id="addProductbtn"
                      @click="addNewProduct()"
                    >
                      Dodaj proizvod
                    </button>
                  </div>
                  <br />
                  <div class="discount">
                    <v-checkbox
                      label="Želim dodati popust"
                      v-model="racun.popust"
                      value="yes"
                      required
                    ></v-checkbox>
                  </div>
                  <div class="discChoose" v-if="racun.popust == 'yes'">
                    <div class="row">
                      <div class="col-6" id="discountInfo">
                        <v-text-field
                          type="number"
                          v-model="racun.popustPerc"
                          @change="discountTotal()"
                          label="Popust u obliku postotka (%)"
                          hint="npr. 20%"
                          :rules="[rules.percentage]"
                        ></v-text-field>
                        <v-text-field
                          type="number"
                          @change="discountTotal()"
                          v-model="racun.popustIznos"
                          label="Popust u obliku iznosa"
                          hint="npr. 200 kn"
                        ></v-text-field>
                      </div>
                    </div>
                  </div>
                </v-card-text>
                <v-textarea
                  name="input-7-1"
                  filled
                  label="Dodatne bilješke za ispis na računu. (Proizvoljno)"
                  auto-grow
                  v-model="racun.notes"
                ></v-textarea>
                <div id="disabledBtn">
                  <button
                    v-if="this.racun.proizvodi[0].iznos_ukupno.length < 1"
                    class="btn btn-secondary"
                    style="pointer-events: none;"
                    type="button"
                    disabled
                  >
                    <v-img id="downloadImg" src="@/assets/download.svg" />
                    Preuzmi račun
                  </button>
                </div>
                <router-link
                  :to="{ name: 'CreatePDF', params: { content: racun } }"
                >
                  <button
                    v-if="this.racun.proizvodi[0].iznos_ukupno.length > 0"
                    type="button"
                    id="download"
                    class="btn btn-info download"
                    @click="
                      formatTotalPrices();
                      getInvoiceTime;
                    "
                  >
                    Preuzmi račun
                    <img id="downloadImg" src="../assets/download.svg" />
                  </button>
                </router-link>
              </div>
            </v-card>
          </div>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import GeneralInfo from "./GeneralInfo";
import DateInput from "./DateInput";

export default {
  name: "lavanda",
  props: {
    data: {
      type: Object,
    },
  },
  components: {
    GeneralInfo: GeneralInfo,
    DateInput: DateInput,
  },

  data() {
    return {
      hintDatumIzdavanja: "Datum izdavanja",
      hintDatumDospijeca: "Datum dospijeća",
      discount: ["Popust u obliku iznosa", "Popust u postotku"],
      paymentMethod: ["Transakcijski račun", "Gotovinsko plačanje"],

      racun: {
        br_racuna: "",
        dospijece: "",
        nacin_placanja: "",
        izdavatelj: [],
        mjesto: "",
        datum: this.dateFormatted,
        operater: "",
        primatelj: [],
        vrijeme_izrade: "",
        countProducts: 2,
        iban: "",
        proizvodi: [
          {
            br: 1,
            ime: "",
            cijena: "",
            kolicina: "",
            iznos_ukupno: "",
            total: 0,
            productPdv: 0,
          },
        ],
        iznos_bez_pdv: 0,
        ukupan_iznos: 0,
        iznos_nakon_popusta: "",
        pdv: 25,
        popust: "no",
        valuta: "kn",
        popustPerc: 0,
        popustIznos: 0,
        tax_included: "no",
        tax_amount: 0,
        notes: "",
      },
      removeImage: require("@/assets/clear.svg"),
      date: (vm) => ({
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),
      }),
      rules: {
        required: (value) => !!value || "Ovo polje je obavezno.",
        counter: (value) => value.length <= 40 || "Max 20 characters",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return (
            pattern.test(value) || "Molimo unesite ispravnu e-mail adresu."
          );
        },
        percentage: (value) =>
          value < 100 || "Postotak ne može biti veći od 100",
      },
    };
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date);
    },
  },

  methods: {
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },

    parseDate(date) {
      if (!date) return null;
      const [month, day, year] = date.split("/");
      return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
    },

    getInvoiceTime() {
      let unix = Math.round(+new Date() / 1000);
      let time = new Date(unix * 1000);
      let hours = time.getHours();
      let minutes = "0" + time.getMinutes();
      console.log("hous" + hours + "minutes" + hours);
      this.racun.vrijeme_izrade = hours + ":" + minutes.substr(-2);

    },
    addNewProduct() {
      this.racun.proizvodi.push({
        br: this.racun.countProducts++,
        ime: "",
        cijena: 0,
        kolicina: 0,
        iznos_ukupno: 0,
        productPdv: 0,
        redaka: 0,
        tax_am: "",
      });
    },
    deleteProduct(index) {
      this.racun.proizvodi.splice(index, 1);
    },
    calculateRowTotal(proizvod) {
      let total = parseFloat(proizvod.cijena) * parseFloat(proizvod.kolicina);
      if (!isNaN(total)) {
        proizvod.iznos_ukupno = total.toFixed(2);
        this.calculateTotalWithTax();
      }
    },
    calculateTotalWithTax() {
      let bez_pdv, total, tax_am;
      bez_pdv = this.racun.proizvodi.reduce(function(sum, proizvod) {
        let rowTotal = parseFloat(proizvod.iznos_ukupno);
        if (!isNaN(rowTotal)) {
          return sum + rowTotal;
        }
      }, 0);
      this.racun.iznos_bez_pdv = this.$options.filters.currency(
        bez_pdv.toFixed(2)
      );

      if (this.racun.tax_included === "no") {
        this.racun.ukupan_iznos = bez_pdv.toFixed(2);

        return this.$options.filters.currency(bez_pdv.toFixed(2));
      } else if (this.racun.tax_included === "yes") {
        total = bez_pdv * (this.racun.pdv / 100) + bez_pdv;
        tax_am = bez_pdv * (this.racun.pdv / 100);
        tax_am = total - bez_pdv;

        this.racun.tax_amount = tax_am.toFixed(2);

        total = parseFloat(total);
        if (!isNaN(total)) {
          this.racun.ukupan_iznos = total.toFixed(2);

          return this.$options.filters.currency(total.toFixed(2));
        } else {
          this.racun.ukupan_iznos = "0.00";
        }
      }
    },
    discountTotal(racun) {
      if (this.racun.popustPerc > 0) {
        let discounted;
        let originalPrice = parseInt(racun.ukupan_iznos);
        let discount = racun.popustPerc / 100;
        console.log("dics", discount);

        // prettier-ignore
        discounted = (originalPrice) - (originalPrice * parseFloat(discount));

        this.racun.iznos_nakon_popusta = discounted;

        return discounted;
      } else if (this.racun.popustIznos > 0) {
        this.racun.iznos_nakon_popusta = racun.ukupan_iznos - racun.popustIznos;
        this.$options.filters.currency(this.racun.iznos_nakon_popusta);

        return this.racun.iznos_nakon_popusta.toFixed(2);
      }
    },

    formatTotalPrices() {
      let afterDisconut = this.$options.filters.currency(
        this.racun.iznos_nakon_popusta
      );
      console.log("jesam", afterDisconut);

      this.racun.iznos_nakon_popusta = afterDisconut;
    },
    passToPDFMaker() {
      this.$emit("passToPDF", this.racun);
    },
    fillData(info) {
      this.racun.izdavatelj.push(info);
    },
    fillBuyer(info) {
      this.racun.primatelj.push(info);
    },
    fillDate(date) {
      this.racun.datum = date;
    },
    fillDospijece(date) {
      this.racun.dospijece = date;
    },
  },
  created() {
    this.fillDate();
  },
};
</script>
<style>
#racun {
  font-weight: bold;
}
#mainCard {
  padding: 20px;
}
#racunInfo,
#discountInfo {
  margin-left: 15px;
}
#clearProduct {
  height: 20px;
  width: 20px;
  margin-top: 11px;
  margin-left: 11px;
}
#addProductbtn {
  background-color: #398c80;
}

#totalPrice,
#totalText {
  font-weight: bold;
}

.table {
  max-width: none;
  table-layout: fixed;
  word-wrap: break-word;
}

#clearIcon {
  width: 50px;
}

.valuta {
  display: inline;
}

#valutaRadio {
  padding-left: 0px;
}

#podaciRacun {
  background-color: #e1e2e1;
}

#additionalInfo {
  margin-top: 25px;
}
#download {
  background-color: #398c80;
  margin-bottom: 20px;
}
#downloadImg {
  width: 20px;
  height: 20px;
  color: white;
}

#naslov {
  font-weight: 400;
}
#naslovIzdavatelj {
  background-color: #e1e2e1;
}

.radioTitle {
  font-size: 1.2rem;
}

#bankovniPodaci {
  padding-top: 0;
}

#disabledBtn {
  padding-bottom: 20px;
}
</style>
