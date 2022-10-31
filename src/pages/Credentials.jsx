import React, { useEffect, useState } from "react";
import Box from "@material-ui/core/Box";
import getAccountInformation from "../utils/hederaManager";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';

var vcs =  [
  {"@context": [  
  "https://www.w3.org/2018/credentials/v1",  
  "https://www.w3.org/2018/credentials/examples/v1"  
  ],  
  "id": "http://example.edu/credentials/1872",  
  "type": ["VerifiableCredential", "AlumniCredential"],  
  "issuer": "https://example.edu/issuers/565049",  
  "issuanceDate": "2010-01-01T19:23:24Z",  
  "credentialSubject": {   
  "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",  
  "alumniOf": {  
  "id": "did:example:c276e12ec21ebfeb1f712ebc6f1",  
  "name": [{  
  "value": "Example University",  
  "lang": "en"  
  }, {  
  "value": "Exemple d'Université",  
  "lang": "fr"  
  }]  
  }  
  },  
  "proof": {  
  "type": "RsaSignature2018",  
  "created": "2017-06-18T21:19:10Z",  
  "proofPurpose": "assertionMethod",  
  "verificationMethod": "https://example.edu/issuers/565049#key-1",  
  "jws": "eyJhbGciOiJSUzI1NiIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..TCYt5X  \
  sITJX1CxPCT8yAV-TVkIEq_PbChOMqsLfRoPsnsgw5WEuts01mq-pQy7UJiN5mgRxD-WUc  \
  X16dUEMGlv50aqzpqh4Qktb3rk-BuQy72IFLOqV0G_zS245-kronKb78cPN25DGlcTwLtj  \
  PAYuNzVBAh4vGHSrQyHUdBBPM"  
  }  
},{
"@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://www.w3.org/2018/credentials/examples/v1"
],
"id": "https://yqs3j2p1k9.execute-api.us-east-1.amazonaws.com/prod/credentials/d98b8f50-c472-11eb-97fb-cbf4e5918c09",
"type": [
    "VerifiableCredential",
    "UniversityDegreeCredential"
],
"issuer": "https://mercury-credentials-public-tb0172-prod.s3.us-east-1.amazonaws.com/controller.json",
"issuanceDate": "2021-06-01T12:00:00.000Z",
"credentialSubject": {
    "id": "did:example:ebfeb1f712ebc6f1c276e12ec21",
    "degree": "Bachelor of Science",
    "degreeType": "BachelorDegree",
    "degreeSchool": "Mercury University"
},
"proof": {
    "type": "Ed25519Signature2018",
    "created": "2021-06-03T13:51:52Z",
    "jws": "eyJhbGciOiJFZERTQSIsImI2NCI6ZmFsc2UsImNyaXQiOlsiYjY0Il19..8YIj2tG6HoiDKw476_ElxcCFiCTr89jHX24Osr1zgklp0Sgfkgx-ipu6Li5og4wtLGMoa7__xJpcHWHzwWZoCQ",
    "proofPurpose": "assertionMethod",
    "verificationMethod": "https://mercury-credentials-public-tb0172-prod.s3.us-east-1.amazonaws.com/publicKey.json"
}
}]

  const ResolveDID = (didURL) => {
    return null;
  }

  
  const Credentials = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
      getAccountInformation().then(setData);
    }, []);

    return (
      <List>
      <ListItem key={data}>{data}</ListItem>
      {
      vcs.map((vc,index) => (
      <ListItem key={index}>
      <ListItemText>{JSON.stringify(vc)}</ListItemText>
      </ListItem>
      ))
      }
      </List>
    )
  }



export default Credentials;