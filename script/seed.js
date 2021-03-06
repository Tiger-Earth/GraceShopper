'use strict'

const db = require('../server/db')
const {User, Wine, Order} = require('../server/db/models')

const userData = [
  {name: 'Cody', email: 'cody@email.com', password: '123'},
  {name: 'Murphy', email: 'murphy@email.com', password: '123'}
]

const orderData = [
  {
    status: 'open'
  },
  {
    status: 'closed'
  },
  {
    status: 'open'
  }
]

const wineData = [
  {
    name: '2010 Agrapart Minéral Blanc de Blancs Grand Cru',
    price: 11995,
    imageURL:
      'https://i.pinimg.com/564x/53/49/4a/53494a951f7147e94580f0408c127201.jpg',
    color: 'White'
  },

  {
    name: '2017 Pascal Cotat Chavignol Rosé',
    price: 4995,
    imageURL: 'https://s3.amazonaws.com/crush-online-assets/CotatRose2017.jpg',
    color: 'Rose'
  },
  {
    name: 'Ramona Fizz',
    price: 495,
    imageURL: 'https://s3.amazonaws.com/crush-item-images/14487.jpg',
    color: 'Rose'
  },
  {
    name: '2010 Paolo Bea Sagrantino di Montefalco “Pagliaro”',
    price: 5995,
    imageURL:
      'https://s3.amazonaws.com/crush-online-assets/BeaPagliaro2010.jpg',
    color: 'Red'
  },

  {
    name: 'NV Coutier Brut Rose 750 ml',
    price: 4495,
    imageURL: 'https://s3.amazonaws.com/crush-item-images/47227.jpg',
    color: 'Rose'
  },
  {
    name: '2017 Commanderie de Peyrassol Cotes de Provence Rose 750 ml',
    price: 1899,
    imageURL: 'https://s3.amazonaws.com/crush-item-images/15002.jpg',
    color: 'Rose'
  },
  {
    name: '2013 Brovia Barolo',
    price: 3995,
    imageURL:
      'https://i.pinimg.com/564x/86/47/69/864769dd95ad5e4ee5a93761d6b70771.jpg',
    color: 'Red'
  },
  {
    name: '2014 Norton Ridge Merlot 750 ml',
    price: 1799,
    imageURL: 'https://s3.amazonaws.com/crush-item-images/28263.jpg',
    color: 'White'
  },
  {
    name: '2016 FX Pichler Riesling Unendlich',
    price: 24999,
    imageURL:
      'https://s3.amazonaws.com/crush-online-assets/PichlerUnendlich.jpg',
    color: 'White'
  },
  {
    name: '2016 Alzinger Riesling Steinertal',
    price: 6995,
    imageURL:
      'https://s3.amazonaws.com/crush-online-assets/AlzingerSteinertalRiesling2016.jpg',
    color: 'White'
  },
  {
    name: '2014 Grange des Péres VDP l’Herault',
    price: 10995,
    imageURL:
      'https://s3.amazonaws.com/crush-online-assets/GrangedePeres2014.jpg',
    color: 'Red'
  },
  {
    name: '2015 Weiser-Künstler Gaispfad',
    price: 1599,
    imageURL: 'https://s3.amazonaws.com/crush-online-assets/WKGaisfpad2015.jpg',
    color: 'White'
  },
  {
    name: '2012 Bartolo Mascarello Barolo',
    price: 17999,
    imageURL:
      'https://s3.amazonaws.com/crush-online-assets/MascarelloBartolo2012Barolo.jpg',
    color: 'Red'
  },
  {
    name: 'NV La Bota Equipo Navazos Palo Cortado Diez Años Despues No. 62',
    price: 47999,
    imageURL: 'https://s3.amazonaws.com/crush-item-images/6k094.jpg',
    color: 'White'
  },
  {
    name: '2015 Pelican Poulsard',
    price: 4995,
    imageURL:
      'https://s3.amazonaws.com/crush-online-assets/PelicanPoulsard2015.jpg',
    color: 'Red'
  },
  {
    name: '2002 Calon-Ségur',
    price: 9999,
    imageURL:
      'https://i.pinimg.com/564x/04/d3/01/04d30127cfdaad50209d10a6275d7f1b.jpg',
    color: 'Red'
  }
]

// const wineData = [
//   {
//     name: 'Alessandro Viola - Sinfonia Di Grillo 2016',
//     price: 38.0,
//     imageURL:
//       'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/alessandro-viola-sinfonia-di-grillo_1.jpg&w=155&h=184',
//     color: 'white'
//   },
//   {
//     name: 'Cantina Furlani - Sur Lie Rosato NV',
//     price: 30.0,
//     imageURL:
//       'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/cantina-furlani-sur-lie-rosato_1.jpg&w=155&h=184',
//     color: 'red'
//   },
//   {
//     name: 'Cantina Giardino - Vino Bianco 2017 (1.5L)',
//     price: 42.0,
//     imageURL:
//       'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/cantina-giardino-vino-bianco_1.jpg&w=220&h=250',
//     color: 'white'
//   },
//   {
//     name: 'Les Vins Pirouettes (Binner) - Pinot Noir Hubert et Christian',
//     price: 25.0,
//     imageURL:
//       'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/les-vins-pirouettes-binner-pinot-noir-d-hubert-et-christian_1.jpg&w=155&h=184',
//     color: 'red'
//   },
//   {
//     name: 'Christian Tschida - Felsen I 2015',
//     price: 84.0,
//     imageURL:
//       'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/christian-tschida-felsen-i_1.jpg&w=155&h=184',
//     color: 'red'
//   },
//   {
//     name: 'Christian Tschida - Yummy Yummy 2015',
//     price: 90.0,
//     imageURL:
//       'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/christian-tschida-yummy-yummy_1.jpg&w=155&h=184',
//     color: 'red'
//   },
//   {
//     name: 'Arianna Occhipinti - Il Frappato 2014 (1.5L)',
//     price: 95.0,
//     imageURL:
//       'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/arianna-occhipinti-il-frappato_1.jpg&w=155&h=184',
//     color: 'red'
//   },
//   {
//     name: 'Alessandro Viola - Note Di Bianco 2017',
//     price: 26.0,
//     imageURL:
//       'https://www.discoverywines.com/thumb/thumbme.html?src=/images/sites/discoverywines/labels/alessandro-viola-note-di-bianco_1.jpg&w=155&h=184',
//     color: 'white'
//   }
// ]

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const [wines, users, orders] = await Promise.all([
    Wine.bulkCreate(wineData, {returning: true}),
    User.bulkCreate(userData, {returning: true}),
    Order.bulkCreate(orderData, {returning: true})
  ])
  await users[1].addOrder(orders[1])
  await users[1].addOrder(orders[2])
  await users[0].addOrder(orders[0])
  await orders[0].addWine(1, {
    through: {
      quantity: 4
    }
  })
  await orders[0].addWine(2, {
    through: {
      quantity: 2
    }
  })
  await orders[1].addWine(1, {
    through: {
      quantity: 6
    }
  })

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${wines.length} wines`)
  console.log(`seeded ${orders.length} orders`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
