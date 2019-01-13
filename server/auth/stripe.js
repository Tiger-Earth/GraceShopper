const router = require('express').Router()
module.exports = router

//req.email, id(card), [amount], customer.id
router.post('/charge', (req, res) => {
  stripe.customers
    .create({
      email: req.body.email,
      card: req.body.id
    })
    .then(customer =>
      stripe.charges.create({
        amount,
        description: 'Sample Charge',
        currency: 'usd',
        customer: customer.id
      })
    )
    .then(charge => res.send(charge))
    .catch(err => {
      console.log('Error:', err)
      res.status(500).send({error: 'Purchase Failed'})
    })
})
