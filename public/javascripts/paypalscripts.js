function loadPayPalButton() {
paypal
    .Buttons({
      // Specify the style of the button
      style: {
        layout: "vertical",
        shape: "rect", // pill | rect
        color: "gold", // gold | blue | silve | black
        label: "checkout" // checkout | pay | paypal
      },
      createOrder: function(data, actions) {
        return fetch("/create-orders?email="+$("#merchantEmail").val(), {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(res => {
          res = JSON.parse(res)
          if(!res.id)
            console.log(JSON.stringify(res, null, 4));
          else
             console.log("Order Id : "+ res.id)
          return res;
        })
        .then(d => d.id);
      },
     
      onApprove: function(data, actions) {
        // Get the transaction details
        return fetch("/capture-payments?id="+data.orderID,{
          method: 'POST',
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          }
        })
        .then(res => res.json())
        .then(res => {
            debugger
            res = JSON.parse(res);
            if(!res.id) {
                console.log(JSON.stringify(res,null,4));
            }
            if(res.status == 'COMPLETED') {
                alert("Payment captured")
            }
        })
      
      },
      onCancel : function(err) {
        console.log(JSON.stringify(res,null,4));
        return  alert("You cancelled the operation");
      },
      onError: function(err) {
        console.log("Some error occurred " + err);
        alert("Some Error Occurred . Please open console to see the error " + JSON.stringify(err));
      },
      onInit: function(data, actions) {
        console.log("PayPal Button Loaded");  
      }
    })
    .render("#paypal-payment-holder")
    .catch(err => {
      console.log("errrrrror ", err);
      console.log("ERROR - " + err.message, "error");
    })

}