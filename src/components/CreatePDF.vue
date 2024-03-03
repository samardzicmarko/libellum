<template>
  <v-card height="300" id="succesCard">
    <div>
      {{ invoice }}
      <success id="msg" v-if="showSucces" :message="msg" />Preuzimanje nije
      krenulo automatski?
      <br />
      <v-card-text class="justify-center">
        <button
          type="button"
          id="downloadManual"
          class="btn btn-info downloadManual"
          @click="generatePDF"
        >
          Preuzmi ručno
        </button>
      </v-card-text>
    </div>
    <v-spacer />
  </v-card>
</template>
<script>
import Success from "./Success";
export default {
  components: {
    Success,
  },
  data: function() {
    return {
      invoice: {},
      valuta: "",
      msg: "Cestitamo na uspješno izrađenom računu!",
      showSucces: null,
    };
  },
  methods: {
    generatePDF() {
      console.log("ss", this.invoice.izdavatelj[0].ime);

      var pdfMake = require("pdfmake/build/pdfmake.js");
      if (pdfMake.vfs == undefined) {
        var pdfFonts = require("pdfmake/build/vfs_fonts.js");
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
      }
      var docDefinition = {
        content: [
          {
            columns: [
              {
                style: "invoiceBillingDetails",
                text: {
                  text:
                    this.invoice.izdavatelj[0].ime +
                    "\n" +
                    this.invoice.izdavatelj[0].email +
                    "\n" +
                    "OIB: " +
                    this.invoice.izdavatelj[0].oib +
                    "\n" +
                    this.invoice.izdavatelj[0].ulica +
                    "\n" +
                    this.invoice.izdavatelj[0].grad +
                    ", " +
                    this.invoice.izdavatelj[0].zip +
                    "\n" +
                    "Tel: " +
                    this.invoice.izdavatelj[0].mobitel +
                    "\n" +
                    "IBAN: " +
                    this.invoice.iban +
                    "\n" +
                    "SWIFT Adresa: " +
                    this.invoice.swift,
                },
              },
              {
                text: {
                  text:
                    this.invoice.primatelj[0].ime +
                    "\n" +
                    this.invoice.primatelj[0].email +
                    "\n" +
                    "OIB: " +
                    this.invoice.primatelj[0].oib +
                    "\n" +
                    this.invoice.primatelj[0].ulica +
                    "\n" +
                    this.invoice.primatelj[0].grad +
                    ", " +
                    this.invoice.primatelj[0].zip +
                    "\n" +
                    "Tel: " +
                    this.invoice.primatelj[0].mobitel,
                },
                style: "invoiceBuyerDetails",
              },
            ],
          },
          {
            columns: [
              {
                text: {
                  text: this.invoice.ponuda
                    ? "Ponuda br. " + this.invoice.br_racuna
                    : "Račun br." + this.invoice.br_racuna,
                },
                style: "invoiceNumber",
              },
            ],
          },
          {
            columns: [
              {
                text: {
                  text:
                    "Datum: " +
                    this.invoice.datum +
                    "\n" +
                    "Vrijeme izdavanja računa: " +
                    this.invoice.vrijeme_izrade +
                    "\n" +
                    "Dospijeće: " +
                    this.invoice.dospijece +
                    "\n" +
                    "Operater: " +
                    this.invoice.operater +
                    "\n" +
                    "Način plaćanja: " +
                    this.invoice.nacin_placanja,
                },
                style: "aboutInvoice",
              },
            ],
          },
          {
            columns: [
              this.table(this.invoice.proizvodi, [
                "Ime",
                "Kolicina",
                "Cijena",
                "Konacnacijena",
              ]),
            ],
          },
          {
            layout: "lightHorizontalLines",
            columns: [this.filterTax(this.invoice)],
          },
          {
            layout: "lightHorizontalLines",
            columns: [this.addDiscount(this.invoice)],
          },

          // TOTAL

          {
            columns: [{ text: this.invoice.notes, style: "notesText" }],
          },
        ],

        styles: {
          invoiceBillingDetails: {
            alignment: "left",
            fontSize: 12,
            margin: [0, 20, 0, 5],
          },
          invoiceBuyerDetails: {
            alignment: "right",
            fontSize: 12,
            margin: [0, 100, 0, 5],
          },
          aboutInvoice: {
            alignment: "right",
            fontSize: 10,
            margin: [0, 60, 0, 5],
          },

          invoiceNumber: {
            alignment: "center",
            fontSize: 14,
            bold: true,
          },
          itemsHeader: {
            margin: [0, 5, 0, 5],
            bold: true,
          },
          center: {
            alignment: "center",
          },
          itemTable: {
            margin: [0, 5, 0, 5],
            alignment: "center",
          },
          tableHeader: {
            bold: true,
          },
          line: {
            margin: [0, 20, 0, 0],
          },
          totalTitle: {
            margin: [0, 5, 0, 5],
            fontSize: 10,
            alignment: "right",
          },
          totalValue: {
            margin: [0, 5, 0, 5],
            fontSize: 10,
            alignment: "center",
          },
          notesText: {
            fontSize: 10,
            margin: [0, 90, 0, 0],
          },
          itemsFooterSubTitle: {
            margin: [0, 5, 40, 5],
            fontSize: 11,
            alignment: "right",
          },
          itemsFooterTotalTitle: {
            margin: [0, 5, 0, 5],
            fontSize: 11,
            alignment: "right",
          },
          itemsFooterSubValue: {
            margin: [0, 5, 0, 5],
            fontSize: 11,
            alignment: "center",
          },
          itemsFooterTotalValue: {
            margin: [0, 5, 0, 5],
            fontSize: 11,
            bold: true,
            alignment: "center",
          },
        },
      };
      pdfMake.createPdf(docDefinition).download("racun.pdf");
      this.showSucces = true;
    },
    populateData() {
      this.invoice = this.$route.params.content;
      console.log("punii", this.invoice);
    },
    generateRows(items, invoice) {
      var tempArr = [];
      for (var i = 0; i < items.length; i++) {
        tempArr.push({
          Br: items[i].br + ".",
          Ime: items[i].ime,
          Cijena: items[i].cijena + " " + invoice.valuta,
          Kolicina: items[i].kolicina,
          PDV: items[i].productPdv + "%",
          Konacna: items[i].iznos_ukupno + " " + invoice.valuta,
        });
      }

      return tempArr;
    },

    buildTableBody(data) {
      if (this.invoice.tax_included != "special") {
        let body = [];
        let col = ["Br", "Ime", "Kolicina", "Cijena", "Konacna"];

        data = this.generateRows(this.invoice.proizvodi, this.invoice);
        console.log("ajmo vvidit tu", data);

        body.push(col);
        data.forEach(function(row) {
          var dataRow = [];
          col.forEach(function(column) {
            dataRow.push(row[column]);
            console.log("row", row[column]);
          });

          body.push(dataRow);
        });
        return body;
      } else {
        let body = [];
        let col = ["Br", "Ime", "Cijena", "Kolicina", "PDV", "Konacna"];

        data = this.generateRows(this.invoice.proizvodi, this.invoice);
        console.log("druga", data);

        body.push(col);
        data.forEach(function(row) {
          var dataRow = [];
          col.forEach(function(column) {
            dataRow.push(row[column]);
            console.log("row", row[column]);
          });

          body.push(dataRow);
        });
        return body;
      }
    },
    filterTax() {
      if (this.invoice.tax_included === "no") {
        return {
          table: {
            headerRows: 0,
            widths: ["*", 80],

            body: [
              [
                {
                  text: "",
                  style: "line",
                },
                {
                  text: "",
                  style: "",
                },
              ],
              [
                { text: "Ukupno", style: "itemsFooterSubTitle" },
                {
                  text: this.invoice.ukupan_iznos + this.getCurrency(),
                  style: "itemsFooterSubValue",
                },
              ],
            ],
          },
          layout: "lightHorizontalLines",
        };
      } else if (this.invoice.tax_included === "yes") {
        return {
          table: {
            // headers are automatically repeated if the table spans over multiple pages
            // you can declare how many rows should be treated as headers
            headerRows: 0,
            widths: ["*", 80],

            body: [
              // Total
              [
                {
                  text: "Osnovica: ",
                  style: "itemsFooterSubTitle",
                },
                {
                  text: this.invoice.iznos_bez_pdv + " " + this.getCurrency(),
                  style: "itemsFooterSubValue",
                },
              ],
              [
                {
                  text: "PDV 25%",
                  style: "itemsFooterSubTitle",
                },
                {
                  text: this.invoice.tax_amount + " " + this.getCurrency(),
                  style: "itemsFooterSubValue",
                },
              ],
              [
                {
                  text: "Sveukupno:",
                  style: "itemsFooterSubTitle",
                },
                {
                  text: this.invoice.ukupan_iznos + " " + this.getCurrency(),
                  style: "itemsFooterTotalValue",
                },
              ],
            ],
          },
          layout: "lightHorizontalLines",

          // table
        };
      }
    },
    addDiscount() {
      if (this.invoice.popust === "yes") {
        if (this.invoice.popustPerc > 0) {
          return {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 0,
              widths: ["*", 80],

              body: [
                [
                  {
                    text: "Popust: ",
                    style: "itemsFooterSubTitle",
                  },
                  {
                    text: this.invoice.popustPerc + "%",
                    style: "itemsFooterSubValue",
                  },
                ],
                [
                  {
                    text: "Sveukupno: ",
                    style: "itemsFooterSubTitle",
                  },
                  {
                    text: this.invoice.iznos_nakon_popusta + this.getCurrency(),
                    style: "itemsFooterTotalValue",
                  },
                ],
              ],
            },
            layout: "lightHorizontalLines",

            // table
          };
        }
        if (this.invoice.popustIznos > 0) {
          return {
            table: {
              // headers are automatically repeated if the table spans over multiple pages
              // you can declare how many rows should be treated as headers
              headerRows: 0,
              widths: ["*", 80],

              body: [
                [
                  {
                    text: "Popust: ",
                    style: "itemsFooterSubTitle",
                  },
                  {
                    text: this.invoice.popustIznos + this.getCurrency(),
                    style: "itemsFooterSubValue",
                  },
                ],
                [
                  {
                    text: "Sveukupno: ",
                    style: "itemsFooterSubTitle",
                  },
                  {
                    text: this.invoice.iznos_nakon_popusta + this.getCurrency(),
                    style: "itemsFooterTotalValue",
                  },
                ],
              ],
            },
            layout: "lightHorizontalLines",

            // table
          };
        }
      }
    },
    table(data, columns) {
      console.log("table", columns);
      console.log("d", this.buildTableBody(data, columns));

      if (this.invoice.tax_included !== "special") {
        return {
          table: {
            headerRows: 1,
            widths: [20, 200, "*", "*", "*"],
            body: this.buildTableBody(data, columns),
            style: { alignment: "center", margin: [0, 5, 0, 5] },
          },
        };
      } else if (this.invoice.tax_included === "special") {
        return {
          table: {
            headerRows: 1,
            widths: [20, 200, "*", "*", "*", "*"],
            body: this.buildTableBody(data, columns),
          },
        };
      }
    },

    getCurrency() {
      return this.invoice.valuta;
    },
    count() {
      let count = 0;
      return count++;
    },
  },

  created() {
    this.populateData();
    this.generatePDF();
  },
};
</script>

<style>
.downloadManual {
  background-color: #398c80;
}

#msg {
  width: 80%;

  margin: 0 auto;
  padding: 20px;
}

#succesCard {
  width: 50%;
  margin: 0 auto;
}
</style>
