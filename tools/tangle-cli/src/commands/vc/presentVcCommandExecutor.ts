// Copyright 2021 IOTA Stiftung.
// SPDX-License-Identifier: Apache-2.0.
import { Document, VerifiableCredential, VerifiablePresentation } from "@iota/identity-wasm/node";
import { Arguments } from "yargs";
import { getNetworkParams } from "../../globalParams";
import { IdentityHelper } from "../identityHelper";
import { VcHelper } from "./vcHelper";

export default class PresentVcCommandExecutor {
    public static async execute(args: Arguments): Promise<boolean> {
        const credential = args.vc as string;
        const presentationType = args.type as string;
        const presentationId = args.id as string;
        let holderDid = args.holder as string;

        try {
            const { result, credentialObj } = VcHelper.validateVc(credential);

            if (!result) {
                console.log("Error:", "Not a VerifiableCredential");
                return false;
            }

            // If no holder is passed then the holder is the subject
            if (!holderDid) {
                holderDid = (credentialObj.credentialSubject as Credential).id;
            }

            const identityClient = IdentityHelper.getClient(getNetworkParams(args));
            const holderDoc: Document = await identityClient.resolve(holderDid);

            const holderDocument = Document.fromJSON(holderDoc);

            const vp = new VerifiablePresentation(
                holderDocument,
                VerifiableCredential.fromJSON(credentialObj),
                presentationType,
                presentationId
            );

            const signedPresentation = holderDocument.signPresentation(vp, {
                private: args.secret,
                method: holderDocument.resolveKey(args.method as string).toJSON().id
            });

            let output = signedPresentation.toJSON();
            if (args.json) {
                output = JSON.stringify(output, undefined, 2);
            }

            console.log(output);
        } catch (error) {
            console.log("Error:", error);
            return false;
        }

        return true;
    }
}
