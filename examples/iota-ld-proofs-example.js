import { IotaSigner, IotaLdProofGenerator, IotaLdProofVerifier, SignatureTypes } from "@tangle-js/ld-proofs";
import { IotaAnchoringChannel } from "@tangle-js/anchors";

/**

   DID used

{
  did: 'did:iota:4sQE2rDL578awq4mzhVU47cLSax2pGDdtHvCP8fXBRgf',
  keys: {
    'sign-0': {
      public: '25Y6Kykfytd3wqdKAucZ7JSMKqtU3VPm2HQHSU8r1d8X',
      private: 'Bg7qw6PXEAyw9dQKCaPMUVC6cbKm1nAkYqXwK7LnnVgp'
    },
    'dv-0': {
      public: 'BQsz1sYqQDXMN2WdpFJpxMbPSDmriabDhJ8PSyPF2Xi6',
      private: 'EnGTu7jYTapWn84Z9iiVjnzJaF3fc1x5JptPb3bcVhx1'
    }
  },
  transactionUrl: 'https://explorer.iota.org/mainnet/message/f58d2fb23165f836f5ef9f5bcd86e41002db7a96c87ebab63584b15d50c6b302'
}

 */

// Example on how to create LD Proofs anchored to the Tangle
export default async function main() {
    console.log('calling verify');
    const doc = {
        "@context": "https://schema.org",
        "id": "http://example.org/car-tracker/bd91402c-d9b9-11eb-b8bc-0242ac130003",
        "type": "Vehicle",
        "speed": {
            "type": "QuantitativeValue",
            "value": 50.2,
            "unitCode": "KMH"
        },
        "dateUpdated": '2022-06-16T13:21:36.820Z'
    };
    const proof = {
        type: 'IotaLinkedDataProof2021',
        verificationMethod: 'did:iota:4sQE2rDL578awq4mzhVU47cLSax2pGDdtHvCP8fXBRgf',
        proofPurpose: 'dataVerification',
        proofValue: {
            channelID: 'f678d1dea9f340d787f589814329c346b2bfe2297c924b46c2ba7832aa6f8d3c0000000000000000:568435cd2daecc47bb1115a4',
            anchorageID: '568435cd2daecc47bb1115a4',
            msgID: 'c75d28e0c08f161bad515920',
            msgIDL1: '820f81c83916ffc3ec032fffa5495cebefbfc1a357b417830e7e9a2376bc0fda'
        },
        created: '2022-06-16T13:21:45.413Z'
    };

    const anchoredDoc = {
        ...doc,
        proof,
    };
    const result = await IotaLdProofVerifier.verifyJson(anchoredDoc);
    console.log(result);
}
