const { auth,JWT } = require("google-auth-library");
const  {DFP} =require('google-ad-manager-api');
const keys = {
    "type": "service_account",
    "project_id": "api-ad-manager-280412",
    "private_key_id": "625a7cb02b93bba659308e3b4f53274946368b50",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDeWyiyXau/gamu\nwma1OihS7s/uTDN0a7gYCBHVdCsYzmGp9YZ9/cyQ09ucj6Qpmil5ZPPHTO4eFdiN\nqrReE6Oyl0MInkZxGup1ffrkkw9w3qYyJJulPorYYfhosbD6AgGERUIEGyBwt7dQ\nqJqMBdIbRhUOo3zrzxPc5Z+lJijTiAwoHt5oN3L4M7OkJIX1MahaWSn8ajQYhijV\n10n4J4UuGQCBRWeBr2WNJg0su5aFQM7m5TsAh1Ron9D96o8W2SUq39WrbH4DhvWB\nkCus0I5t0OqFi5MDFCnrTU6aVJS76QJJtnUmFk1lJLhyavN//foiwdFRy3jEcpRx\nwrtzEulfAgMBAAECggEAD6F63+cDzsePpRBXZf/7m7Db/xVuPI3h+BaBIm8zJGBF\nr0vqM2sm+TtbYcsbMC19IuJ83JLE3mqMuZC5cy+QP1qwxKdTrlnFB5NekrjfygBs\n0HOQWXJnEkT40GtFVJ3Ve3Xe6Sj7A9F2Wn4vtw4lsfMgQdIuUulQrSObMGHZVt1E\n6kLvFf67A40AnmuCvT9m+oinSI/SUGDGscrle8HNnjDr+GJIHVZKgcIKoTxTbp4L\nwZvfKF2dMtQj1IaKYZdMqJ9XqS7UiCIfqUp8zhAIW8p1KlQqXFrjPp24GpFZ4TRg\nScD1WN7JnneswQoYdTJWjoTnvlXF6lKQcZoNly5bGQKBgQDvGXo1GSufw4JTllxM\noUytEC21nC1EPlxqdLp0gARIvdSpovbfd35xJA56NQMbxASEeckametLFF22M0K8\nSkLDPiwGXYkgKji4B5nBr3R78EQ3H2Bky1MH2TqYbyjzNgUGlChp4LT05VT4Iz74\nbT/l44qnjl6mPUU4aRrK80S2AwKBgQDuErVBvBR+OjFy+pqmTynROoUmn/ffj074\nTgUlj7zqT1dHZ1KPZVrqvTDkMS4UPFjGsc/mmOkwQebv6XmYqwrWnvaWGJJPLlfd\nYIEa/15+aZxtyOTZZIcyxLmYweZspbdyOkrNNiWxyEFf6lMvEXnM2bktQDOErCiX\n+2c/gN0+dQKBgDLalV6Dyv6BA9Apc9osmHVaso4k+I/CP7+4sgujSsX58ihea+md\nrbv8skOV0OJv75IJoRdSU3Q1kbT19CS+GrMSHyT/cfHwaP3jR/WlDr5pnOioeMUX\nZcKOlmLjia8o9yquCmZyj6piuI7KWFNYUTXhDpWSt1jeQUG9QSCXWy7nAoGBAMg0\n0VsTWMSCGZ2Qo8ciIY+DQAAoXKITeRyVN/zLcNo2mLZCbIqMeLWZHml39kEsMpf9\nZlGM2+UqNpQg6pH5nOa5zbKRvVB7L4bKpifXA1cZZ2RnohQzVwLZrx6ISUeq4Kdd\n4BPM6kwklN2dSBD4CE699dzY9bonsQeGcuBTdTsVAoGBAJ5RNLiSCc7Y/34OGSQn\n4yNAwutsbku2KgqhFs7EuDStrdCDa8W4TmNZGeBaHo8kP2yw9trxcdVpAXdHILxB\nqTq1Psl13Olv3hgNBdLJ/FUFNAowXeJdky4vdJ0Fxo0pwj6Kkm98dkujsJUvORjH\nCRtM6IH/NXljRbATuSIewZSm\n-----END PRIVATE KEY-----\n",
    "client_email": "api-ad-manager@api-ad-manager-280412.iam.gserviceaccount.com",
    "client_id": "102458012522636637476",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/api-ad-manager%40api-ad-manager-280412.iam.gserviceaccount.com"
  
};

async function main(){

   

    try{
        const client = auth.fromJSON(keys);
        //console.log(client.scopes);
        client.scopes =  ['https://www.googleapis.com/auth/dfp'];
        //console.log(client.scopes);
    
        const res=await client.authorize();
        //console.log(res);
        //console.log(client.credentials.access_token);
        
        const dfp = new DFP({networkCode: '160436694', apiVersion: 'v202002'});
        const lineItemService = await dfp.getService('LineItemService', client.credentials.access_token);
       // console.log(lineItemService);


        const resp = await lineItemService.getLineItemsByStatement({
            filterStatement: {
                query: "WHERE name LIKE 'prebid%'"
            }
        });
         
        console.log(resp.results[0].id);
    }
    catch(e){
        console.log(e);
    }
    
}
main();


