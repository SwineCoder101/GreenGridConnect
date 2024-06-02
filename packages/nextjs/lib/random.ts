export type Product = {
  id: string;
  name: string;
  provider: string;
  verified: boolean;
  price: number;
  currency: string;
  currencyImg: string;
  image: string;
  inUse: number;
  createdAt: Date;
};

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

const SOURCES = ["Wind", "Solar", "Turbine"];
const LOCATIONS = ["Belfast", "Dublin", "Galway", "Ennis", "Cork", "Bushmill", "Wicklow"];
const PROVIDERS = ["Bord Gais Energy", "TNB", "myEnergy"];
const CURRENCIES = [{ name: "EURe", img: "/eure.png" }];
const IMAGES = [
  "https://www.greenbiz.com/sites/default/files/styles/16_9_cropped/public/2022-09/FloatingSolar_setsoPhoto_sstock1470.jpg?itok=kdsSpnrx",
  "https://www.iec.ch/system/files/styles/original_image/private/2021-11/green-renewable-alternative-energy-concept-wind-generator-turbines-generating-electricity-wind-farm-crete-island-greece-with-small-white-church_0.jpg?itok=W4jT8bVY",
  "https://gwec.net/wp-content/uploads/2020/09/3-1024x576.png.webp",
  "https://worldoceanreview.com/wp-content/uploads/2010/10/7_12-c-simulated-wave-farm.jpg",
  "https://fox2now.com/wp-content/uploads/sites/14/2023/11/GettyImages-1453859222-e1700336229465.jpg?w=2560&h=1440&crop=1",
];

export const randomProduct = (): Product => {
  const currency = CURRENCIES[getRandomInt(CURRENCIES.length)];
  return {
    id: window.crypto.randomUUID(),
    name: `${SOURCES[getRandomInt(SOURCES.length)]} @ ${LOCATIONS[getRandomInt(LOCATIONS.length)]}`,
    provider: PROVIDERS[getRandomInt(PROVIDERS.length)],
    verified: getRandomInt(2) === 0 ? false : true,
    price: parseFloat(`${getRandomInt(10000) + 100}.${getRandomInt(100)}`),
    currency: currency.name,
    currencyImg: currency.img,
    image: IMAGES[getRandomInt(IMAGES.length)],
    inUse: getRandomInt(100),
    createdAt: new Date(),
  };
};
