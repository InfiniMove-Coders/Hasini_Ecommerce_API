const Category = require("../models/category");
const mongoose = require("mongoose");

const categories = [
  {
    name: "Chocolates",
    description: "Delicious and sweet chocolates in various flavors.",
    slug: "chocolates",
    image: "https://example.com/images/chocolates.jpg",
  },
  {
    name: "Biscuits",
    description: "Crunchy and tasty biscuits for snacks.",
    slug: "biscuits",
    image: "https://example.com/images/biscuits.jpg",
  },
  {
    name: "Cakes",
    description: "Soft and spongy cakes for celebrations.",
    slug: "cakes",
    image: "https://example.com/images/cakes.jpg",
  },
  {
    name: "Ice Creams",
    description: "Cold and creamy ice creams in different flavors.",
    slug: "ice-creams",
    image: "https://example.com/images/ice-creams.jpg",
  },
  {
    name: "Snacks",
    description: "Savory and crispy snacks for munching.",
    slug: "snacks",
    image: "https://example.com/images/snacks.jpg",
  },
];

const products = [
  {
    name: "Milk Chocolate Bar",
    description:
      "Smooth and creamy milk chocolate made from the finest ingredients.",
    brand: "SweetDelight",
    pieces: 10,
    weight: 500, // in grams
    price: 5.99, // in USD
    isActive: true,
    stock: 50,
    imageUrl: "https://example.com/images/milk-chocolate-bar.jpg",
    createdAt: "2024-12-05T05:45:00.000Z",
    updatedAt: "2024-12-05T05:45:00.000Z",
  },
  {
    name: "Butter Cookies",
    description: "Delicious butter cookies baked to golden perfection.",
    brand: "GoldenBakes",
    pieces: 20,
    weight: 300, // in grams
    price: 4.49, // in USD
    isActive: true,
    stock: 100,
    imageUrl: "https://example.com/images/butter-cookies.jpg",
    createdAt: "2024-12-05T05:45:10.000Z",
    updatedAt: "2024-12-05T05:45:10.000Z",
  },
  {
    name: "Chocolate Fudge Cake",
    description: "Rich and moist chocolate cake layered with creamy fudge.",
    brand: "CakeHouse",
    pieces: 1,
    weight: 1200, // in grams
    price: 15.99, // in USD
    isActive: true,
    stock: 20,
    imageUrl: "https://example.com/images/chocolate-fudge-cake.jpg",
    createdAt: "2024-12-05T05:45:20.000Z",
    updatedAt: "2024-12-05T05:45:20.000Z",
  },
  {
    name: "Vanilla Ice Cream Tub",
    description: "Classic vanilla ice cream made with real vanilla beans.",
    brand: "CoolTreats",
    pieces: 1,
    weight: 2000, // in grams
    price: 10.49, // in USD
    isActive: true,
    stock: 30,
    imageUrl: "https://example.com/images/vanilla-ice-cream-tub.jpg",
    createdAt: "2024-12-05T05:45:30.000Z",
    updatedAt: "2024-12-05T05:45:30.000Z",
  },
  {
    name: "Spicy Potato Chips",
    description: "Crispy potato chips seasoned with a blend of spicy flavors.",
    brand: "SnackTime",
    pieces: 1,
    weight: 150, // in grams
    price: 2.99, // in USD
    isActive: true,
    stock: 200,
    imageUrl: "https://example.com/images/spicy-potato-chips.jpg",
    createdAt: "2024-12-05T05:45:40.000Z",
    updatedAt: "2024-12-05T05:45:40.000Z",
  },
];

mongoose
  .connect(
    "mongodb+srv://sai:saipassword@hasini.ymwc3.mongodb.net/?retryWrites=true&w=majority&appName=hasini"
  )
  .then(() => {
    console.log("Connected to the database");
    return Category.insertMany(categories);
  })
  .then((result) => {
    console.log("Data inserted:", result);
    mongoose.disconnect();
  })
  .catch((error) => {
    console.error("Error inserting data:", error);
    mongoose.disconnect();
  });

  // {
  //   "products": [
  //     {
  //       "product": "6751e319ab152ef60b79b942",
  //       "quantity": 1
  //     }
  //   ],
  //   "deliveryTimeSlot": "09:00 AM - 12:00 PM",
  //   "deliveryAt": "2024-12-20",
  //   "shippingAddress": "67641cc91f44d208205eee9f"
  // }