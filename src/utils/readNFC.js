const { client } = require("../config/dbConfig");

async function readNFC(res) {
  // without Babel in ES2015
  const { NFC } = require("nfc-pcsc");

  var card_Data;
  const nfc = new NFC(); // optionally you can pass logger

  //   nfc.on("reader", (reader) => {
  //     console.log(`${reader.reader.name}  device attached`);

  // enable when you want to auto-process ISO 14443-4 tags (standard=TAG_ISO_14443_4)
  // when an ISO 14443-4 is detected, SELECT FILE command with the AID is issued
  // the response is available as card.data in the card event
  // see examples/basic.js line 17 for more info
  // reader.aid = 'F222222222';

  //     reader.on("card", async (card) => {
  //       // card is object containing following data
  //       // [always] String type: TAG_ISO_14443_3 (standard nfc tags like MIFARE) or TAG_ISO_14443_4 (Android HCE and others)
  //       // [always] String standard: same as type
  //       // [only TAG_ISO_14443_3] String uid: tag uid
  //       // [only TAG_ISO_14443_4] Buffer data: raw data from select APDU response

  //       console.log(`${reader.reader.name}  card detected`, card);
  //       console.log(`card detected`, card);

  //       // example reading 12 bytes assuming containing text in utf8

  //       const key_a = "FFFFFFFFFFFF";
  //       const keyTypeA = "0x61";
  //       await reader.authenticate(4, keyTypeA, key_a);
  //       console.info(`sector authenticated`);
  //       const data1 = await reader.read(4, 48, 16);
  //       console.info(`data read for sector 1`, data1.toString());
  //       await reader.authenticate(8, keyTypeA, key_a);
  //       const data2 = await reader.read(8, 48, 16);
  //       console.info(`data read for sector 2`, data2.toString());
  //     });

  //     reader.on("card.off", (card) => {
  //       console.log(`${reader.reader.name}  card removed`, card);
  //       res.status(200).json({
  //         msg: "Read: True",
  //         uid: card,
  //       });
  //     });

  //     reader.on("error", (err) => {
  //       console.log(`${reader.reader.name}  an error occurred`, err);
  //     });

  //     reader.on("end", () => {
  //       console.log(`${reader.reader.name}  device removed`);
  //     });
  //   });

  //   nfc.on("error", (err) => {
  //     console.log("an error occurred", err);
  //   });
  // return card_Data;

  nfc.on("reader", (reader) => {
    console.log(reader.name + " reader attached, waiting for cards ...");

    reader.on("card", async (card) => {
      console.log(card.uid);
      reader.close();
      if (card.uid) {
        var findPatient = await client.query(
          "SELECT * from tbl_patients WHERE patient_id = $1",
          [card.uid]
        );
        console.log(findPatient.rows);
        res.status(200).json({
          uid: card.uid,
          data: findPatient.rows[0]
        });
      }
    });

    reader.on("error", (err) => {
      console.error("reader error", err);
    });

    reader.on("end", () => {
      console.log(reader.name + " reader disconnected.");
    });
  });

  nfc.on("error", (err) => {
    console.error(err);
  });
}

module.exports = {
  readNFC,
};
