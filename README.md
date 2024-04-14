# Krishi Kiran

## Overview
Krishi Kiran provides a complete interface for the farmers as well as consumers for buying and selling crops in the web app. In this web app we are integrating AI chatbot for the farmers through which the farmers can ask any desired questions they want. Also through our ML model the farmers can check whether the crop has been been affected by disease or not. For the consumers we have added 'Compare crops' feature so that they can compare the prices of the crops uploaded by farmers.
This makes Krishi Kiran a complete web-app for farmers and consumers.

## Installation

### Pre-requisites :
1) [Node.JS](https://nodejs.org/en/download)
2) [MySQL](https://dev.mysql.com/downloads/mysql/) 
>>Make sure to add the path of MySQL
3) [NPM](https://www.npmjs.com/package/download)

### Terminal

Open a new folder in VS code and in the terminal enter the following :

Initializing the git
```terminal
git int
```

Cloning the git-repo
```terminal
git clone https://github.com/VasuOOCh/byteverse_TeamAgora
```

installing node modules
```terminal
npm install
```

## Usage

```javascript
const connection = mysql.createConnection({
  host: 'hostname',
  user: 'user',
  database: 'database',
  password : process.env.MYSQL_PASS //Enter MySQL password
});

const anthropic = new Anthropic({
    apiKey: process.env.API_KEY // Enter your API key here
    });

async function answer(ques) {
    const message = await anthropic.messages.create({
    max_tokens: 1024,
    messages: [{ role: 'user', content: ques }],
    model: 'claude-3-opus-20240229',
});


return message.content[0].text;
    
}
```

## Dependencies

1) "@anthropic-ai/sdk": "^0.20.1",
2) "axios": "^1.6.8",
3) "dotenv": "^16.4.5",
4) "ejs": "^3.1.9",
5) "express": "^4.19.2",
6)"method-override": "^3.0.0",
7) "mysql2": "^3.9.4",
8) "uuidv4": "^6.2.13"

Please make sure to update tests as appropriate.
