
const axios = require('axios').default;
require('dotenv').config();

var srs = require('../repository/stores');

class MpesaController {

    async getOAuthToken(req,res,next){
        let consumer_key = process.env.CONSUMER_KEEY;//Consumer_Key;
        let consumer_secret = process.env.CONSUMER_SECREET;//Consumer_Secret;

        let url = process.env.OUATH_TOKEN_URL;//OAuth2Token;

        //form a buffer of the consumer key and secret
        let buffer = new Buffer.from(consumer_key+":"+consumer_secret);

        let auth = `Basic ${buffer.toString('base64')}`;

        try{

            let {data} = await axios.get(url,{
                "headers":{
                    "Authorization":auth
                }
            });

            req.token = data['access_token'];

            return next();

        }catch(err){

            return res.send({
                success:false,
                message:err['response']['statusText']
            });
        }        
    };

    async lipaNaMpesaOnline(req,res){
        
        let cart = {mtoken:req.body.token,
                    phone: req.body.phone,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    email: req.body.email,
                    course: req.body.course,
                    message: req.body.message,
                    merchantRequestID:'',
                    checkoutRequestID:''
                    };
                    
                    //(typeof sess.cart !== 'undefined') ? sess.cart : false;

        let token = req.token;
        let auth = `Bearer ${token}`;
        
        //getting the timestamp
        let timestamp = require('../middleware/timestamp').timestamp;

        let url = process.env.LIPA_NA_MPESA_URL;//STKPush;
        let bs_short_code = process.env.LIPA_NA_MPESA_SHORTCODE;//paybill;
        let passkey = process.env.LIPA_NA_MPESA_PASSKEY;//passkey;
        let password = new Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
        let transcation_type = "CustomerPayBillOnline";
        let amount = "1"; //you can enter any amount
        let partyA = req.body.phone;//"party-sending-funds"; //should follow the format:2547xxxxxxxx
        let partyB = process.env.LIPA_NA_MPESA_SHORTCODE;//paybill;
        let phoneNumber = req.body.phone;//"party-sending-funds"; //should follow the format:2547xxxxxxxx
        let callBackUrl = "https://autodukadb.web.app/lipa-na-mpesa-callback/"+cart.mtoken;//req.body.token;
        let accountReference = "Digital Space site";
        let transaction_desc = "Digital Space site";

        try {

            let {data} = await axios.post(url,{
                "BusinessShortCode":bs_short_code,
                "Password":password,
                "Timestamp":timestamp,
                "TransactionType":transcation_type,
                "Amount":amount,
                "PartyA":partyA,
                "PartyB":partyB,
                "PhoneNumber":phoneNumber,
                "CallBackURL":callBackUrl,
                "AccountReference":accountReference,
                "TransactionDesc":transaction_desc
            },{
                "headers":{
                    "Authorization":auth
                }
            }).catch(console.log);

            cart.merchantRequestID=data.MerchantRequestID;
            cart.checkoutRequestID=data.CheckoutRequestID;
            var lgin=await srs.uploadCart(cart);

            if(lgin){                               
                return res.send({
                    success:true,
                    data:cart
                });            
            }else{
                return res.send({
                            success:false,
                            data
                        });
            }
            
        }catch(err){
            return res.send({
                success:false,
                data
            });
        };
    };


    async lipaNaMpesaPending(req,res){

        let token = req.token;
        let auth = `Bearer ${token}`;
        
        let ord=req.body;
        
        //getting the timestamp
        let timestamp = require('../middleware/timestamp').timestamp;
        
        let url = process.env.LIPA_NA_MPESA_URL;//STKPush;
        let bs_short_code = process.env.LIPA_NA_MPESA_SHORTCODE;//paybill;
        let passkey = process.env.LIPA_NA_MPESA_PASSKEY;//passkey;
        let password = new Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
        let transcation_type = "CustomerPayBillOnline";
        let amount = "1"; //you can enter any amount
        let partyA = req.body.phone;//"party-sending-funds"; //should follow the format:2547xxxxxxxx
        let partyB = process.env.LIPA_NA_MPESA_SHORTCODE;//paybill;
        let phoneNumber = req.body.phone;//"party-sending-funds"; //should follow the format:2547xxxxxxxx
        let callBackUrl = "https://autodukadb.web.app/lipa-na-mpesa-callback/"+req.body.token;
        let accountReference = "Digital Space site";
        let transaction_desc = "Digital Space site";

        // let url = process.env.STKPush;
        // let bs_short_code = process.env.paybill;
        // let passkey = process.env.passkey;
        // let password = new Buffer.from(`${bs_short_code}${passkey}${timestamp}`).toString('base64');
        // let transcation_type = "CustomerPayBillOnline";
        // let amount = Math.round(ord.total); //you can enter any amount
        // let partyA = req.body.phone;//"party-sending-funds"; //should follow the format:2547xxxxxxxx
        // let partyB = process.env.paybill;
        // let phoneNumber = req.body.phone;//"party-sending-funds"; //should follow the format:2547xxxxxxxx
        // let callBackUrl = "https://autodukadb.web.app/lipa-na-mpesa-callback/"+req.body.token;
        // let accountReference = "Digital Space site";
        // let transaction_desc = "Digital Space site";

        try {

            let {data} = await axios.post(url,{
                "BusinessShortCode":bs_short_code,
                "Password":password,
                "Timestamp":timestamp,
                "TransactionType":transcation_type,
                "Amount":amount,
                "PartyA":partyA,
                "PartyB":partyB,
                "PhoneNumber":phoneNumber,
                "CallBackURL":callBackUrl,
                "AccountReference":accountReference,
                "TransactionDesc":transaction_desc
            },{
                "headers":{
                    "Authorization":auth
                }
            }).catch(console.log);

            ord.merchantRequestID=data.MerchantRequestID;
            ord.checkoutRequestID=data.CheckoutRequestID;
            var lgin=await srs.updateCurrentOrder(ord);

            if(lgin){
                return res.send({
                    success:true,
                    data:"lgin"
                });
            }else{
                return res.send({
                            success:false,
                            data:ord
                        });
            }
        }catch(err){
            console.log(err);
            return res.send({
                success:false,
                data
            });
        };
        
    };


   async lipaNaMpesaOnlineCallback(req,res){

        //Get the transaction description
        let message = req.body.Body.stkCallback;

        var lgin=await srs.updateOrder(req.params.id,message);

            if(lgin){       

                return res.send({
                    success:true,
                    message:JSON.stringify(lgin)
                });

            }else{

                return res.send({
                    success:false,
                    message:JSON.stringify(lgin)
                });

            }
        
    };

};

// const mpesa = new MpesaController();

export const mpesa = new MpesaController();;