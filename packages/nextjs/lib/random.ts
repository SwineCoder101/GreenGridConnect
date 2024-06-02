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
  "https://picsum.photos/200",
  "https://i.seadn.io/s/raw/files/cd5cd1ccaa3a3d2bcce53c275c44d9ff.png?auto=format&dpr=1&w=3840",
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
