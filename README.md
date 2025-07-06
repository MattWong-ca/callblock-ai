# 🛡️ CallBlock.AI
Track: Secure Sovereign Systems - Fresh Code
<br/>
Bounties: Flow Most Killer App Potential

Live demo: https://www.callblock.ai/
<br/>
YouTube: https://youtu.be/x7BVqj6cVvA

<img width="1440" alt="Landing" src="https://github.com/user-attachments/assets/f2506fdf-9744-4365-87b5-18f722e75367" />

# About
CallBlock.AI lets you create proxy phone numbers that can screen calls for spam and scams. Sign up for a number to use in public, and your custom AI assistant will screen every incoming call for you. Only if the call is legitimate, then will it be forwarded to you. 

The platform also features an IPFS-powered spam registry that serves as a public, tamper-proof record accessible for everyone, allowing the community to share and access verified spam numbers in a decentralized manner.

Most importantly, CallBlock.AI is a secure phone screening system that restores the **_digital sovereignty_** of millions of people.


<img width="1120" alt="Screenshot 2025-07-06 at 2 10 16 PM" src="https://github.com/user-attachments/assets/12a91d76-65ae-413a-a901-4df2d5232d28" />


# Screenshots

<img width="502" alt="Dashboard" src="https://github.com/user-attachments/assets/bc451eb4-d57c-46ad-8856-4e5313233bc3" />
<img width="502" alt="Phone numbers" src="https://github.com/user-attachments/assets/a343fc5d-19d5-449e-a6c9-ad65568f280a" />
<img width="502" alt="Call logs" src="https://github.com/user-attachments/assets/8a7b092a-cfc3-40e6-8180-beb862819943" />
<img width="502" alt="Spam registry" src="https://github.com/user-attachments/assets/ab1c7b38-13ca-4631-bd1d-145058361a3b" />

# How it works

Tools: v0, Cursor
<br/>
APIs: Vapi, Pinata, Supabase
<br/>
Blockchain: Flow, IPFS, Pinata, Ethers, Hardhat, Alchemy

<img width="1121" alt="How it works" src="https://github.com/user-attachments/assets/3b483398-63fa-46ab-83ee-21cac52ab0ed" />
<br/>

**Vapi:**

- For all voice AI related capabilities, like creating the phone numbers in the backend, the voice AI agents, as well as fetching call logs and detecting spam. For demo purposes the phone numbers are currently manually pre-bought, but this can be done through API depending on demand in the future.
- The voice AI agents are unique and customizable for every user, enabling you to how lenient it is when screening calls. You can also add whitelist numbers that can bypass it.

**Flow:**
- Deployed the monthly subscription payments contract. Using crypto rails makes the platform globally accessible and also benefits onchain identity.
- Contract: [0xE9f4bFA4f4351eDD69AB7cAab516bdc73aA29922](https://evm-testnet.flowscan.io/address/0xE9f4bFA4f4351eDD69AB7cAab516bdc73aA29922)
- Deployed the Solidity smart contract using Hardhat and Alchemy, and used Ethers to interact with it in the frontend.

**IPFS + Pinata:**
-  Using the Pinata API to upload/fetch spam call numbers and info to/from the spam registry powered by IPFS.

**Supabase:**
- Associating the user's number with their AI proxy number offchain, as well as storing call logs and info from Vapi.

# Team

Matt Wong

- Discord: mattwong.ca
- [LinkedIn](https://www.linkedin.com/in/mattwong-ca/)
- [X](https://x.com/mattwong_ca)
