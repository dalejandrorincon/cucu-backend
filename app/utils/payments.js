const {
    STRIPE_SECRET
} = process.env;


async function createCustomer (data) {
    const stripe = require('stripe')(STRIPE_SECRET);

    let role = ""
    switch(data.role){
        case "1":
            role = "Admin"
            break;
        case "2":
            role = "Translator"
            break;
        case "3": 
            role = "Client"
            break;
        case "4":
            role = "Company client"
    }

    console.log(role)

    const customer = await stripe.customers.create({

        name: data.firstname + " " + data.lastname + (data.company_name? " - "+data.company_name : "" ),
        email: data.email,
        phone: data.phone,
        description: role,
    });

    return customer;
};


module.exports = {
    createCustomer
};
  