import myKey from "./khaltiKey"
let config = {
    // replace this key with yours
    "publicKey": "myKey.publicTestKey",
"mobile": "9843671236",
"transactionPin": "1234",
"amount": 10000,
"productIdentity": "book/id-120",
"productName": "A Song of Ice and Fire",
"productUrl": "http://bookexample.com",
    "eventHandler": {
        onSuccess (payload) {
            // hit merchant api for initiating verfication
            console.log(payload);
        },
        // onError handler is optional
        onError (error) {
            // handle errors
            console.log(error);
        },
        onClose () {
            console.log('widget is closing');
        }
    },
    "paymentPreference": ["KHALTI", "EBANKING","MOBILE_BANKING", "CONNECT_IPS", "SCT"],
};

export default config ;