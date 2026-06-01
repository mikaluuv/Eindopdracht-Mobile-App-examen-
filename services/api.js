const getEnv = () => {
  if (typeof process !== "undefined") {
    return process.env;
  }

  return {};
};

const getToken = () =>
  getEnv().EXPO_PUBLIC_WEBFLOW_API_TOKEN ||
  getEnv().WEBFLOW_API_TOKEN ||
  "";

const getSiteId = () =>
  getEnv().EXPO_PUBLIC_WEBFLOW_SITE_ID ||
  getEnv().WEBFLOW_SITE_ID ||
  "6a17394aeaf50d0113a71782";

const getHeaders = () => ({
  Authorization: `Bearer ${getToken()}`,
  Accept: "application/json",
});

const getProductsUrl = () =>
  `https://api.webflow.com/v2/sites/${getSiteId()}/products`;

const CAMPUS_COLLECTION_ID = "6a18810d807483bd4af584f4";
const NEWS_COLLECTION_ID = "6a19b00a7a65f0720b83cf54";
const PRODUCT_CATEGORIES_COLLECTION_ID = "6a1b6578850dcc5431b57fe4";
const STUDIES_COLLECTION_ID = "6a1c99235999bd4226b0c266";

const getCollectionUrl = (collectionId) =>
  `https://api.webflow.com/v2/collections/${collectionId}/items`;

const campusColors = {
  Botaniek: "#d94f8c",
  Caputsteen: "#2f66b3",
  "De Beemden": "#57b6c9",
  Basisverpleegkunde: "#d94f8c",
  Nekkerspoel: "#c8c94b",
  Pitzemburg: "#a03c91",
  Stassart: "#f0aa3c",
  Zandpoort: "#d94b3d",
};

const newsCategoryNames = {
  "0fbd77e7612671dfabb91901aa294675": "Schoolnieuws",
  fcf6d1ae437a6c2a5d5fda32e3d3389a: "Evenementen",
  "6c7fc0f1624dbcf6fc389c49e0dd5e97": "Belangrijk",
};

const studyCampuses = {
  "43277fe29231313d28ce6c43925b366d": "BA Pitzemburg",
  "6e876f3722f3f92ce134a0cc739b03a2": "BA Botaniek",
  eccac4b14df49910786dae6206557f46: "BA Stassart",
  c21c2071a2fb57c96dc29cfa152e3f1d: "BA Caputsteen",
  "165994e92c14c59dac18d11064d548df": "BA De Beemden",
  "22db0ce59c6dfbdfeca16e0d7ddf371c": "BA Basisverpleegkunde",
  "1194f15ee083d9ede91f9ecf12c86b0d": "BA Campus Zandpoort",
  "1155f3a6e2f35a2d0247862268955c37": "BA Campus Nekkerspoel",
};

const studyInterests = {
  bafcc10e47ecc0313a73111bafd84ace: "Wetenschap",
  "3888a109b3b6f846737422053ab5e987": "Gezondheid",
  f0c7610be50fef6eb363923de3bbc54b: "Talen",
  a5d6aaf4bbf62be36c7467eb24b99114: "Economie",
  bef053fd835dc4ae366d52fdcd564f22: "Creatief",
  "9c9a303b8012c7f1f88e8f344112ad65": "Sport",
  e3a37f3efd1ffee7155cc25819aee035: "Techniek",
};

const studyGrades = {
  "0492f083565c00e716c6186c3d75d1f8": "1ste graad",
  "87359ec06dcdcd52934c4f60ed123259": "2de graad",
  "9323397c465ca60fe01f9b278eece952": "3de graad",
  "9f1e73fe9670f0c9fa69cbd0e38b246c": "7de jaar",
};

const stripHtml = (text) => {
  if (!text) {
    return "";
  }

  return String(text).replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

const getText = (fieldData, names, fallback = "") => {
  for (const name of names) {
    if (fieldData?.[name]) {
      return stripHtml(fieldData[name]);
    }
  }

  return fallback;
};

const getImage = (fieldData) => {
  const image =
    fieldData?.afbeelding ||
    fieldData?.image ||
    fieldData?.["main-image"] ||
    fieldData?.thumbnail;

  if (image?.url) {
    return { uri: image.url };
  }

  return require("../assets/school.webp");
};

export const fetchProducts = async () => {
  const [productsResponse, categoriesResponse] = await Promise.all([
    fetch(getProductsUrl(), {
      headers: getHeaders(),
    }),
    fetch(getCollectionUrl(PRODUCT_CATEGORIES_COLLECTION_ID), {
      headers: getHeaders(),
    }),
  ]);

  if (!productsResponse.ok) {
    throw new Error("Producten konden niet geladen worden.");
  }

  const productsData = await productsResponse.json();
  const categoriesData = categoriesResponse.ok
    ? await categoriesResponse.json()
    : { items: [] };
  const categoryNames = {};

  (categoriesData.items || []).forEach((category) => {
    categoryNames[category.id] = category.fieldData?.name || "Product";
  });

  return (productsData.items || []).map((item) => {
    const fields = item.product?.fieldData;
    const priceNumber = (item.skus?.[0]?.fieldData?.price?.value || 0) / 100;
    const categoryId = fields?.category;
    const categoryName = categoryNames[categoryId] || "Product";

    return {
      id: item.product?.id || item.id,
      title: getText(fields, ["name", "titel"], "Product"),
      description: getText(fields, ["description", "beschrijving"], "Geen beschrijving beschikbaar."),
      details: getText(
        fields,
        ["detail-product", "inhoud", "description", "beschrijving"],
        "Geen details beschikbaar.",
      ),
      price: `EUR ${priceNumber.toFixed(2)}`,
      priceNumber: priceNumber,
      category: categoryName,
      image: item.skus?.[0]?.fieldData?.["main-image"]?.url
        ? { uri: item.skus[0].fieldData["main-image"].url }
        : require("../assets/school.webp"),
    };
  });
};

export const fetchNews = async () => {
  const response = await fetch(getCollectionUrl(NEWS_COLLECTION_ID), {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Nieuws kon niet geladen worden.");
  }

  const data = await response.json();

  return (data.items || []).map((item) => {
    const fields = item.fieldData;

    return {
      id: item.id,
      title: getText(fields, ["name", "titel", "title"], "Nieuwsbericht"),
      description: getText(
        fields,
        ["intro", "korte-beschrijving", "beschrijving", "summary"],
        "Geen intro beschikbaar.",
      ),
      date: getText(fields, ["datum", "date"], "Geen datum"),
      category: newsCategoryNames[fields?.categorie] || "Nieuws",
      content: getText(fields, ["inhoud", "content", "body"], "Geen inhoud beschikbaar."),
      image: getImage(fields),
    };
  });
};

export const fetchCampuses = async () => {
  const response = await fetch(getCollectionUrl(CAMPUS_COLLECTION_ID), {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Campussen konden niet geladen worden.");
  }

  const data = await response.json();

  return (data.items || []).map((item) => {
    const fields = item.fieldData;
    const name = getText(fields, ["name", "naam"], "Campus");

    return {
      id: item.id,
      name: name,
      focus: getText(fields, ["focus", "categorie", "richting"], "Busleyden Atheneum"),
      address: getText(fields, ["adres", "address"], "Mechelen"),
      description: getText(
        fields,
        ["korte-beschrijving", "beschrijving", "description"],
        `Meer info over ${name}.`,
      ),
      color: campusColors[name] || "#1f4432",
    };
  });
};

export const fetchStudies = async () => {
  const response = await fetch(getCollectionUrl(STUDIES_COLLECTION_ID), {
    headers: getHeaders(),
  });

  if (!response.ok) {
    throw new Error("Studies konden niet geladen worden.");
  }

  const data = await response.json();

  return (data.items || []).map((item) => {
    const fields = item.fieldData;

    return {
      id: item.id,
      title: getText(fields, ["naam-opleiding", "name", "titel"], "Opleiding"),
      interest: studyInterests[fields?.interessegebied] || "Algemeen",
      grade: studyGrades[fields?.graad] || "Graad",
      campus: studyCampuses[fields?.campus] || "Busleyden Atheneum",
    };
  });
};
