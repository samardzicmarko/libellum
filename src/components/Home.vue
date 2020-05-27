<template>
  <div class="container-fluid">
    <div class="row">
      <div class="row" id="title">
        <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7">
          <div class="title-header">
            Jednostavna izrada ponude.
            <div
              class="subtitle"
            >Kreirajte ponudu ili predračun na brz, jednostavan i pregledan način, potpuno besplatno.</div>
            <div class="subtext">
              Ispunite potrebne podatke unutar forme i u par minuta izradite
              profesionalan račun. Spreman za printanje, slanje e-mailom ili
              vođenje evidencije. Bez registracije.
            </div>
            <div class="button-action">
              <router-link to="/create/invoice">
                <v-btn id="btnGo" color="#e1e2e1" dark large>Kreiraj ponudu</v-btn>
              </router-link>
            </div>
          </div>
        </div>
        <div class="col-lg-5 col-md-5 col-sm-5 col-xs5">
          <div class="image">
            <img id="imageInvoice" src="../assets/invoice/3572626.jpg" />
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <div class="benefits">
            <v-card id="benefitsCard" color="white">
              <v-card-title
                id="titleBenefits"
                class="justify-center"
              >Promjenite način izrade računa.</v-card-title>
              <div class="icons">
                <div class="row">
                  <div class="col">
                    <img id="clock" src="../assets/idea.svg" />
                    <div class="titleClock">
                      <p id="TitleClock">Efikasnost</p>
                      <div class="textClock">
                        Način izrade računa na koji ćete se lako naviknuti. Bez
                        brige o formatu, stilu, fontu i ostalim problemima koje
                        obično susrećete.
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <img id="clock" src="../assets/check.svg" />
                    <div class="titleClock">
                      <p id="TitleClock">Jednostavnost</p>
                      <div class="textClock">
                        Dodavanje neograničeni broj proizvoda, izračun PDV-a,
                        valuta i popusta nikad nije bilo lakše.
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <img id="clock" src="../assets/gdpr.svg" />
                    <div class="titleClock">
                      <p id="TitleClock">Konzistentnost</p>
                      <div class="textClock">
                        Svaki račun imati će jednak predložak te će sadržavati sve
                        potrebne komponente koje svaki račun mora imati. Nakon
                        toga račun se sprema u PDF formatu.
                      </div>
                    </div>
                  </div>
                  <div class="col">
                    <img id="clock" src="../assets/save-time.svg" />
                    <div class="titleClock">
                      <p id="TitleClock">Uštedite vrijeme</p>
                      <div class="textClock">
                        Na vama je samo da ispunite podatke koje želite prikazati
                        na računu. Mi ćemo se pobrinuti za tehnički dio.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </v-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "home"
};
</script>

<style>
.title-header {
  font-family: "Roboto";
  font-size: 45px;
  font-weight: 900;
  color: white;
  text-align: left;
  margin-left: 50px;
  margin-top: 60px;
}
.subtext {
  font-family: "Roboto";
  font-size: 16px;
  font-weight: 400;
  color: white;
}

#TitleClock {
  font-family: "Roboto";
  color: #398c80;
  font-weight: 700;
  font-size: 1.1rem;
}

.subtitle {
  font-family: "Roboto";
  font-size: 30px;
  font-weight: 400;
  color: white;
  text-align: left;
}
#invoice {
  width: 426px;
  height: 426px;
}
.benefits {
  width: 100%;
  left: 0;
}

.icons {
  margin-left: 10%;
  margin-right: 10%;
}
#benefitsCard {
  height: 460px;
}

#title {
  height: 500px;
}

#imageInvoice {
  width: 400px;
  height: 400px;
  border-radius: 50%;
  margin-top: 50px;
}

#clock {
  width: 80px;
  height: 80px;
  padding: 10px;
}

#titleBenefits {
  font-family: "Roboto";
  font-size: 35px;
  font-weight: 600;
  color: #398c80;
  text-align: left;
  padding: 40px;
}

#btnGo {
  font-family: "Roboto";
  font-size: 18px;
  font-weight: 500;
  color: black;
}
</style>
