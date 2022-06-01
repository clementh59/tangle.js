import { IotaSigner, IotaLdProofGenerator, IotaLdProofVerifier, SignatureTypes } from "@tangle-js/ld-proofs";
import { IotaAnchoringChannel } from "@tangle-js/anchors";

/**

   DID used

{
  did: 'did:iota:HeNzaWXCT6jTsshy9gyXCz9242NgZtMrbW1EC66iXZNP',
  keys: {
    public: '6vRR8c2ceLbThT4acvNZj7rS9mL6g6dwu3SWFmV15KSJ',
    private: '8XghdzhFGWrferW8v1PwpV86gtHKALKzxhGKSi4vGs3R'
  },
  transactionUrl: 'https://explorer.iota.org/mainnet/message/ed5cf851662d052b6a8fdfbaa11bb058df738faf066b72eee723631f345f419f'
}

 */

// Example on how to create LD Proofs anchored to the Tangle
export default async function main() {
    const document = {
        "@context": "https://schema.org",
        "id": "http://example.org/car-tracker/bd91402c-d9b9-11eb-b8bc-0242ac130003",
        "type": "Vehicle",
        "speed": {
            "type": "QuantitativeValue",
            "value": 50.2,
            "unitCode": "KMH"
        },
        "dateUpdated": new Date().toISOString()
    };

    const ldProof = {
        "type": "IotaLinkedDataProof2021",
        "verificationMethod": "did:iota:HeNzaWXCT6jTsshy9gyXCz9242NgZtMrbW1EC66iXZNP",
        "proofPurpose": "dataVerification",
        "proofValue": {
            "channelID": "e0e5eace86812334d11d28faecda6f38f037dd4c2dd318a04313d049c387b1510000000000000000:dace9268a21d6619806d986e",
            "anchorageID": "dace9268a21d6619806d986e",
            "msgID": "61ab8fb28d34f0b3cc96fb30",
            "msgIDL1": "7848f224ffd901fcfaf97ebbb549bc4e9662ca1521418885f4d6f140a22a8b77"
        },
        "created": "2022-05-31T16:13:44.354Z"
    }

    const anchoredDoc = {
      ...document,
      proof: ldProof
    };
    const result = await IotaLdProofVerifier.verifyJson(anchoredDoc);

    console.log("Verified: ", result);
}
