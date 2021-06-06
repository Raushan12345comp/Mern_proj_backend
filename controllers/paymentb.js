const braintree = require("braintree");

const gateway = new braintree.BraintreeGateway({
  environment: braintree.Environment.Sandbox,
  merchantId: "pnygfhqdzv2cmht2",
  publicKey: "tny74fb86sh6gbrp",
  privateKey: "8bb565efd237c7fed5d84d993e342ad6"
});

exports.getToken = (req, res) => {
  gateway.clientToken.generate({}, function (err, response) {
    if (err) {
      res.status(500).send(err);
    } else {
      res.send(response);
    }
  });
};

exports.processPayment = (req, res) => {

    let nonceFromTheClient = req.body.paymentMethodNonce

    let amountFromtheClient = req.body.amount

    gateway.transaction.sale({
        amount: amountFromtheClient,
        paymentMethodNonce: nonceFromTheClient,
        options: {
          submitForSettlement: true
        }
      }, (err, result) => {
          if (err) {
              res.status(500).json(error)
          } else {
              res.json(result)
          }
      });
};
