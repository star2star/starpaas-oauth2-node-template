"use strict";
const { google } = require('googleapis');

const s2sMS = require('star2star-js-ms-sdk');

const request = require("request-promise");

async function main(params) {
  try {
    const cTypes = {
      'Files only': "mimeType != 'application/vnd.google-apps.folder'",
      'Folders only': "mimeType = 'application/vnd.google-apps.folder'",
      'Files and folders': ''
    }

    // TODO update this for production
    s2sMS.setMsHost("https://cpaas.star2starglobal.net");

    if (!params.hasOwnProperty("access_token") || !params.hasOwnProperty("oauth2_uuid")) {
      throw Error("accss_token or oauth2_uuid missing");
    }

    const oauth2Obj = await s2sMS.Lambda.invokeLambda(params.access_token, "globalgetoauth2token", {'access_token': params.access_token, 'oauth2_uuid': params.oauth2_uuid });
    const requestOptions = {
      method: "GET",
      uri: "https://www.googleapis.com/drive/v2/files/",
      headers: {
        "Content-type":  "application/json",
        "Authorization": `Bearer ${oauth2Obj.access_token}`
      }
    };
    const googleResponse = await request(requestOptions);
    //console.log('>>>>', googleResponse);

    return ({ status: "completed", message: "", data: googleResponse});
  } catch (error) {
    console.log('errro', error);
    return Promise.reject({
      "status": error.hasOwnProperty("statusCode") ? error.statusCode : 400,
      "message": error.hasOwnProperty("message") ? error.message : error
    });
  }
}

module.exports = {
  "main": main
};