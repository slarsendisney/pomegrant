## 🌳 **Using NEAR to reduce our digital carbon footprint while promoting a creator economy**

👋 Hey everybody my name is Sam Larsen-Disney, excited to be hacking at NEARCON. This has been my first introduction to web3 and it’s been so great to do it here in person in Lisbon.

This project consists of 1732 lines code (I'm hoping that's my new lucky number) and **written entirely during the NEARCON 2022 hackathon in Lisbon**.

## ⚡️ Quick Links:
- [Visit the Github Repo](https://github.com/slarsendisney/pomegrant)

![](https://ik.imagekit.io/sld/Frame_6__5__N8NnhOfyj.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663106719235)

## 💡 Inspiration 
The internet is responsible for 3.7% of global greenhouse gas emissions. Every time we transfer a webpage’s data, we use energy and in just over 2/3 cases that energy is not coming from a sustainable source. Meaning that **the transfer of data is emitting carbon**.

We should all be doing more to reduce the amount of data we send. But, for this hackathon I wanted to focus on reducing the data transferred by a particular group of images. A group that I can guarantee you all do not enjoy - Ads!

Ads, when implemented can make up between 18% to 70% of the data transferred when accessing a website. But if you switch on an ad blocker to circumvent that, you are directly harming the creators who’s content you consume.

## 🤩 What it does
Sometimes the best things come in small packages and a little chrome extension might look simple from the outside but we think you might be surprised! Its functionality can be split into two main categories:

### 🚫 An Ad blocker Alternative
It all starts when you install our chrome extension. As a logged in user you can choose to stream NEAR instead of seeing adverts on supporting sites. By streaming NEAR instead of rendering ads you are reducing your digital footprint. Unlike a conventional ad blocker,  you are continuing to support the creators who's content you are enjoying.

### 🤔 A smart contract
Pomegrant is also a smart contract that keeps track of the carbon saved and sites sponsored. This data is then aggregated and can be queried via call methods or by visiting the stats page of the Pomegrant website.

![](https://ik.imagekit.io/sld/Frame_7_yQV5_VgIV.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663106831006)

The application was built with:
- **NEAR JS SDK** for all things near. 
- **Chrome APIs** to communicate to and from our extension. 
- **ReactJS** as the de-facto JavaScript library for building user interfaces
- **NextJS**  blazing fast React framework for performance, scalability, security and accessibility
- **TailwindCSS** to leverage the benefits and speed of the utility first CSS framework .

## 🚀 How to use:
1. Install the Chrome Extension
2. Navigate to a supported webpage
3. Select support within the extension.

## 💰 Monetisation Strategy
There isn't one! I believe that we need to provide everyone with the tools to combat climate change and if this tool might help, I think it should be free to use.

## 🔥 Challenges we ran into
- **Learning Web3 and NEAR**: This was my first Web3 event and hackathon! I had to learn the fundamental concepts before I could start creating. I was lucky to get up to speed quickly thanks to the help of the in-person mentors.
- **Full Access Keys in Chrome Extensions**: If you try and implement a wallet login within a chrome extension you quickly end up with issues with the redirect back to your application as the private key which should be stored in local storage is dropped. Speaking to mentors they didn't have the solution either! I managed to circumvent the need to do this by sending the user to a webpage, having the login happen there and then using the webpage to communicate the credentials back to the extension.
- **Smart Contract**: Finding errors in the smart contract once it had deployed was a nightmare. This was a nightmare of my own making though as I had prioritised shipping fast over thorough testing.

## 🤩Accomplishments that I'm proud of

Over the past three days I've turned an idea I thought to be impossible into a product I could actually use and actually reduce emission!

![](https://ik.imagekit.io/sld/Frame_8_A9n98sgDJ.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663107032104)

### 💘 Increasing User Base Q4, 2022. 
I would like to target a few high-traffic creator sites and get them onboarded and advertising their involvement with Pomegrant. This would hopefully drive increased adoption.

### 👨‍💻 First major version release. Q1, 2023.
Release a more refined version of the extension for use by the masses! Iron out the bugs but avoiding rolling out any additional features.

### 👨‍💻 R&D and Second major version release. Q2, 2023.
Use the analytics gathered from users in the first version to drive the features that will make the largest difference.

![](https://ik.imagekit.io/sld/Frame_3_6IwcztFeP.png?ik-sdk-version=javascript-1.4.3&updatedAt=1663106229475)
