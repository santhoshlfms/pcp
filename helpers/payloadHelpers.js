let payloads = {

    createOrders : function(merchantEmail){
        return {
            "intent": "CAPTURE",
            "purchase_units": [{
                "reference_id": "prixsofttestbravo2_v1",
                "amount": {
                    "currency_code": "USD",
                    "value": "100.00"
                },
                "payee": {
                    "email_address": merchantEmail,
                    "display_data": {
                        "business_email": merchantEmail,
                        "brand_name": "PrixSoft Seller 01",
                        "business_phone": {
                            "country_code": "US",
                            "national_number": "4083969979"
                        }
                    }
                },
                "shipping": {
                    "address": {
                        "shipping_name": "Singpr William Woodbridge",
                        "phone": "4083969979",
                        "address_line_1": "No.15 Huayuan Street",
                        "address_line_2": "#100",
                        "admin_area_2": "Central singapore",
                        "admin_area_1": "T nagar",
                        "postal_code": "95131",
                        "country_code": "US",
                        "address_details": {}
                    },
                    "method": "USPS"
                },
                "payment_instruction": {
                    "disbursement_mode": "INSTANT",
                    "platform_fees": [{
                        "amount": {
                            "currency_code": "USD",
                            "value": "10.01"
                        },
                        "payee": {
                            "email_address": merchantEmail
                        }
                    }]
                }
            }],
            "application_context": {
                "brand_name": "PRIXSOFT",
                "locale": "en-US",
                "landing_page": "LOGIN",
                "shipping_preference": "SET_PROVIDED_ADDRESS",
                "user_action": "PAY_NOW",
                "return_url": "https://www.google.com",
                "cancel_url": "https://www.yahoo.com"
            }
        }
    },

    createOrdersForMerchant : function(reference_id) {
        return {
            "intent": "CAPTURE",
            "purchase_units": [
              {
                "reference_id": reference_id,
                "amount": {
                  "currency_code": "USD",
                  "value": "1.00"
                }
              }
            ]
          }
    }

}

module.exports = payloads;