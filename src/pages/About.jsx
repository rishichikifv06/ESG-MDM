import React from 'react';

function About () {
    return (
        <div class='about'>
            <a href='https://www.ledger.com/academy/what-is-a-dapp'>Read up about Decentralized App (dApp)</a>
            <p><b>Decentralized Identifiers (DIDs)</b> are a new type of identifier for verifiable, "self-sovereign" digital identity. 
            DIDs are fully under the control of the DID subject, independent from any centralized registry, identity provider, or 
            certificate authority. DIDs are URLs that relate a DID subject to means for trustable interactions with that subject. 
            DIDs resolve to DID Documents — simple documents that describe how to use that specific DID. Each DID Document contains 
            at least three things: cryptographic material, authentication suites, and service endpoints. Cryptographic material combined 
            with authentication suites provide a set of mechanisms to authenticate as the DID subject (e.g., public keys, pseudonymous 
            biometric protocols, etc.). Service endpoints enable trusted interactions with the DID subject.</p>
            <br/>
            <p>Most digital activities between people, organizations, devices, and other entities require the exchange of messages and data. 
                For entities to exchange messages and data for credential, app, or service flows, they need an interface through which to store, 
                discover, and fetch data related to the flows and experiences they are participating in. A Decentralized Web Node (DWN) is a 
                data storage and message relay mechanism entities can use to locate public or private permissioned data related to a given 
                Decentralized Identifier (DID). Decentralized Web Nodes are a mesh-like datastore construction that enable an entity to 
                operate multiple nodes that sync to the same state across one another, enabling the owning entity to secure, manage, and 
                transact their data with others without reliance on location or provider-specific infrastructure, interfaces, or routing mechanisms.

            </p>
        </div>
    );
}

export default About;