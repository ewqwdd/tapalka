# About
This instruciton provided to aware devleopers how to run the game backend part locally

# Prerequisites:

1. Git clone the rep
2. Create .env file for secrets in the root of the rep
3. Add secrets/creds to .env file
TOKEN=YOUR_TELEGRAM_BOT_TOKEN


# Instruction
## How to run the game backend(both web application and telegram bot) locally
1. Run docker compose services(Redis, postgres)
docker compose up --build
2. Make sure .env is valid and ready to use
3. Run the backend
npm start

## How to run Telegram Bot locally
1. Make sure .env is valid and ready to use
2. Run the Telegram Bot
npm run start:bot


## How to deploy
