const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0pUc2kxendtaXliV0NOYUgzL2pxVnZXWnI5TGFoc0E1b3hiK2dMYVNsYz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS2lJbUVMN3hGUHMra0tsblBQQzRQbER5TTJpdVZGZUtvdnJyRjBkK0tDZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFRUtBc1VqcXdPZGVOMzUvUFQ4c3J3ejY2SVhvKzJoQnJwV2JOSkRPM25BPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqTlgyZ0xXbGVYa1RIQ0ZNQTVuRDVOMWFkdFo2NmhhWUdIRnA5bjlCU0NNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldGYmVNZTRYNHp6UnI2UWhBWnBZWVJ2bGRua0ZwQ0FxaFdkODBKME5nWEk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlZ3RVJmUC84b1lnd0pmL1dzQndsWUVUWnk3RGFjYVgxZ2UyeG9qd0ROams9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYVBiNkVjRzVrQVdPb3VTYk5RTDJyQ2FxcTFOaXVTajFYMWp6eFVnYVlIaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiajB3WmNRdXE1UE0xZ284RVRraUcyWG4wT3pqc3ltRUgvdFljc0VONjZtWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InpPcktHVHFGQjc1YmpJcUxzelIwMmZ6WlhBOEpJZ0NzUkRNb09Qb1B5Vlp2eFAyaHRQODFFZG1hOEx4UUJVcXZzR2ZkOHhtYTBrUU16QnpFR2xwS0RRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjMzLCJhZHZTZWNyZXRLZXkiOiJzd2Uybld5QmM1RitrMnNBOU9RQUpDU0hTU3NTbVFaU0YwMHdkRVd3bFFZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI1NDcwNTY5MTMxOEBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiJGODgzMDJDQzJEQkRGMkUzRDU1MjRBNEJENDNBQjEwQSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzUyNTY3MDQ4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNTQ3MDU2OTEzMThAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiOUMxRDIxMkFFMDA3N0E1NzVFMDI5MEQwNEI0NTRCNkYifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc1MjU2NzA1NH0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjU0NzA1NjkxMzE4QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjFEQzM2Qzg0MUM1RjRFOEY3QzMyN0U2RjQyMzNCODUxIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NTI1NjcwNzh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjEyM0xPVFVTIiwibWUiOnsiaWQiOiIyNTQ3MDU2OTEzMTg6MjBAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi77S+IOuTnOumvCDqsIDsnbR+IPCdlY0t8J2UufCdlYPwnZWA8J2UuSDwnZWL8J2UvOKEguKEjX4iLCJsaWQiOiIyMjgwODAzNjI3NTQxNTY6MjBAbGlkIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLNlNnL2tDRVBHWjJNTUdHRFFnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJqbEVaOVBJWjhDVzVDNTViUzBaYVdlbHhHSWUwRW1lYnNTSFhVb3gvNGpVPSIsImFjY291bnRTaWduYXR1cmUiOiIvUkttN3JuMEdrcGo4cDl6RWc5eGQ0SHB4T1BGZngwNlF0STlTcG4rd3pMeHlBTlBPYjNUekRQNmF3VDY5aFVvTTdOanAwaUFRL0hCZVVVNFJyQ25Edz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiUlJiNXpVNW1GSU4rdG1Zd2VCTkFTd0lGU01sd2lXTW96ekFsT0llSnJUcUc2SExabUsrdVVyTndLMUVLdkl2U25HKzBmSkhXQ1R3ak1QNnNmcTNRRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTQ3MDU2OTEzMTg6MjBAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWTVSR2ZUeUdmQWx1UXVlVzB0R1dsbnBjUmlIdEJKbm03RWgxMUtNZitJMSJ9fV0sInBsYXRmb3JtIjoic21iYSIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0FJSURRPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzUyNTY3MDM5LCJsYXN0UHJvcEhhc2giOiJQV2s1QiIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSU03In0=',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "®V-BLIB TECH",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "254705691318",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'CHARLESKE-XMD',
    URL : process.env.BOT_MENU_LINKS || 'https://files.catbox.moe/p6uxq0.png',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.CHATBOT || 'no',
    AUDIO_CHATBOT : process.env.AUDIO_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "no",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    ANTIDELETE1 : process.env.ANTIDELETE1 || 'yes',
                  ANTIDELETE2 : process.env.ANTIDELETE2 || 'yes',
                  CHARLESKE_CHATBOT : process.env.CHARLESKE_CHATBOT || 'yes',
                  ANTICALL : process.env.ANTICALL || 'yes',
                  AUTO_REACT : process.env.AUTO_REACT || 'no',
                  AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
                  AUTO_REPLY : process.env.AUTO_REPLY || 'yes',
                  AUTO_READ : process.env.AUTO_READ || 'no',
                  AUTO_SAVE_CONTACTS : process.env.AUTO_SAVE_CONTACTS || 'no',
                  AUTO_REJECT_CALL : process.env.AUTO_REJECT_CALL || 'yes',
                  AUTO_BIO : process.env.AUTO_BIO || 'yes',
                  AUDIO_REPLY : process.env.AUDIO_REPLY || 'yes',
                  AUTO_TAG_STATUS : process.env.AUTO_TAG_STATUS || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
