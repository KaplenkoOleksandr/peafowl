import { LogLevel, Configuration, BrowserCacheLocation } from '@azure/msal-browser';

const isIE = window.navigator.userAgent.indexOf("MSIE ") > -1 || window.navigator.userAgent.indexOf("Trident/") > -1;
 
export const b2cPolicies = {
     names: {
         signUpSignIn: "B2C_1_DipUserFlow",
         editProfile: "B2C_1_DipUserFlow_EDIT"
     },
     authorities: {
         signUpSignIn: {
             authority: "https://kaplenko.b2clogin.com/kaplenko.onmicrosoft.com/B2C_1_DipUserFlow",
         },
         editProfile: {
             authority: "https://kaplenko.b2clogin.com/kaplenko.onmicrosoft.com/B2C_1_DipUserFlow_EDIT"
         }
     },
     authorityDomain: "kaplenko.b2clogin.com"
 };
 
 
export const msalConfig: Configuration = {
     auth: {
         clientId: '909f7650-dc5c-4f65-84b7-5d22b91eb687',
         authority: b2cPolicies.authorities.signUpSignIn.authority,
         knownAuthorities: [b2cPolicies.authorityDomain],
         redirectUri: '/', 
     },
     cache: {
         cacheLocation: BrowserCacheLocation.LocalStorage,
         storeAuthStateInCookie: isIE, 
     },
     system: {
         loggerOptions: {
            loggerCallback: (logLevel, message, containsPii) => {
                console.log(message);
             },
             logLevel: LogLevel.Verbose,
             piiLoggingEnabled: false
         }
     }
 };