// ============================================================
// SETTINGS: edit everything here
// ============================================================
const PHONE = "07045667248";
const WHATSAPP_NUMBER = "234" + PHONE.slice(1); // 2347045667248

const LOCATION = "Your shop address, City, State";
const HOURS = [
  { day: "Monday - Friday", time: "8:00 AM - 7:00 PM" },
  { day: "Saturday", time: "9:00 AM - 6:00 PM" },
  { day: "Sunday", time: "Closed" }
];

// Optional banner picture, e.g. "Chocolate.jpg". Leave "" for none.
const HERO_IMAGE = "";

// true = empty gallery slots are shown as "Image coming soon"
// false = empty slots stay hidden until you add the picture
const SHOW_EMPTY_SLOTS = true;

// Prices below are placeholders. Put your real prices in.

// ---- Your 8 cakes (names match your files in the images folder) ----
const specials = [
  { name: "Chocolate Cake", file: "Chocolate.jpg", url: "", price: "₦5,000" },
  { name: "all in one cake", file: "all in one cake.jpg", url: "", price: "₦20000 for each" },
  { name: "buttercream pitch cake", file: "buttercream pitch cake.jpg", url: "", price: "₦10,000" },
  { name: "", file: "black creamcake", url: "black creamcake.jpg", price: "₦40,000" },
  { name: "Naked 1 Layer Vanilla", file: "naked 1 layer vanilla.jpg", url: "", price: "₦4,000" },
  { name: "Naked 2 Layers Vanilla", file: "naked 2 layers vanilla.jpg", url: "", price: "₦10000" },
  { name: "pinky cake", file: "pinky cake.jpg", url: "", price: "₦18,000" },
  { name: "Pitch buttercream Cake", file: "pitch buttercream cake.jpg", url: "", price: "₦10,000" }
];

// ---- 20 spare slots: add pictures named Image1.jpg ... Image20.jpg ----
const gallery = [
  { name: "sweet chocolate cake", file: "sweet chocolate cake.jpg", url: "", price: "₦1,000" },
  { name: "cupcakes", file: "cupcakes.jpg", url: "", price: "₦500" },
  { name: "creamy cupcakes", file: "creamy cupcakes.jpg", url: "", price: "₦700" },
  { name: "Two layers pink birthday cake", file: "Two layers pink birthday cake.jpg", url: "", price: "₦40,000" },
  { name: "Very nice Fishrolls", file: "Very nice Fishrolls.jpg", url: "", price: "₦200 per one" },
  { name: "Delicious meatpie", file: "Delicious meatpie.jpg", url: "", price: "₦1000" },
  { name: "Treat 7", file: "Image7.jpg", url: "", price: "₦1,000" },
  { name: "Treat 8", file: "Image8.jpg", url: "", price: "₦1,000" },
  { name: "Treat 9", file: "Image9.jpg", url: "", price: "₦1,000" },
  { name: "Treat 10", file: "Image10.jpg", url: "", price: "₦1,000" },
  { name: "Treat 11", file: "Image11.jpg", url: "", price: "₦1,000" },
  { name: "Treat 12", file: "Image12.jpg", url: "", price: "₦1,000" },
  { name: "Treat 13", file: "Image13.jpg", url: "", price: "₦1,000" },
  { name: "Treat 14", file: "Image14.jpg", url: "", price: "₦1,000" },
  { name: "Treat 15", file: "Image15.jpg", url: "", price: "₦1,000" },
  { name: "Treat 16", file: "Image16.jpg", url: "", price: "₦1,000" },
  { name: "Treat 17", file: "Image17.jpg", url: "", price: "₦1,000" },
  { name: "Treat 18", file: "Image18.jpg", url: "", price: "₦1,000" },
  { name: "Treat 19", file: "Image19.jpg", url: "", price: "₦1,000" },
  { name: "Treat 20", file: "Image20.jpg", url: "", price: "₦1,000" }
];

// ============================================================
// CODE (no need to edit below)
// ============================================================
function whatsappLink(message) {
  return "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
}

// Every place the page will look for a picture, in order
function imageSources(item) {
  const list = [];
  if (item.url) list.push(item.url);
  const folders = ["images/", "../images/", "", "../", "image/", "../image/", "Gift/", "../Gift/"];
  folders.forEach(function(folder) {
    list.push(encodeURI(folder + item.file)); // spaces become %20
    list.push(folder + item.file); // as typed
  });
  return list;
}

function makeCard(item, hideIfMissing) {
  const card = document.createElement("div");
  card.className = "card";
  
  // Picture box
  const pic = document.createElement("div");
  pic.className = "pic";
  
  const img = document.createElement("img");
  img.alt = item.name;
  
  const missing = document.createElement("div");
  missing.className = "missing";
  missing.innerHTML = "<strong>Image coming soon</strong><span>Looking for: " +
    item.file + "</span>";
  
  const sources = imageSources(item);
  let tried = 0;
  img.onerror = function() {
    tried++;
    if (tried < sources.length) {
      img.src = sources[tried];
    } else {
      img.onerror = null;
      pic.classList.add("empty");
      if (hideIfMissing && !SHOW_EMPTY_SLOTS) card.style.display = "none";
    }
  };
  img.src = sources[0];
  
  pic.appendChild(img);
  pic.appendChild(missing);
  
  // Info: name, price, order button
  const info = document.createElement("div");
  info.className = "info";
  
  const h3 = document.createElement("h3");
  h3.textContent = item.name;
  
  const price = document.createElement("p");
  price.className = "price";
  price.textContent = item.price;
  
  const btn = document.createElement("button");
  btn.type = "button";
  btn.textContent = "Order";
  btn.addEventListener("click", function() {
    const msg = "Hello Mags Bakes and Chops, I would like to order: " +
      item.name + " (" + item.price + ")";
    window.open(whatsappLink(msg), "_blank");
  });
  
  info.appendChild(h3);
  info.appendChild(price);
  info.appendChild(btn);
  
  card.appendChild(pic);
  card.appendChild(info);
  return card;
}

// Build the cards
const specialsBox = document.getElementById("specials");
specials.forEach(function(item) { specialsBox.appendChild(makeCard(item, false)); });

const galleryBox = document.getElementById("gallery-grid");
gallery.forEach(function(item) { galleryBox.appendChild(makeCard(item, true)); });

// Hero picture (optional)
if (HERO_IMAGE) {
  const hero = document.querySelector(".hero");
  const heroSources = imageSources({ file: HERO_IMAGE, url: "" });
  let h = 0;
  const test = new Image();
  test.onload = function() {
    hero.style.backgroundImage =
      "linear-gradient(rgba(90,51,33,.65), rgba(90,51,33,.65)), url('" + test.src + "')";
    hero.style.backgroundSize = "cover";
    hero.style.backgroundPosition = "center";
  };
  test.onerror = function() {
    h++;
    if (h < heroSources.length) test.src = heroSources[h];
  };
  test.src = heroSources[0];
}

// Location and hours
document.getElementById("location-text").textContent = LOCATION;
document.getElementById("map-link").href =
  "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(LOCATION);
const hoursList = document.getElementById("hours-list");
HOURS.forEach(function(h) {
  const li = document.createElement("li");
  li.innerHTML = "<span>" + h.day + "</span><strong>" + h.time + "</strong>";
  hoursList.appendChild(li);
});

// Contact buttons
document.querySelectorAll(".js-call").forEach(function(a) {
  a.href = "tel:" + PHONE;
});
document.querySelectorAll(".js-whatsapp").forEach(function(a) {
  a.href = whatsappLink("Hello Mags Bakes and Chops, I would like to place an order.");
  a.target = "_blank";
});
document.getElementById("phone-text").textContent = PHONE;
document.getElementById("year").textContent = new Date().getFullYear();
