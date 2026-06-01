const WEBFLOW_TOKEN = "VUL_HIER_JE_TOKEN_IN";
const SITE_ID = "6a17394aeaf50d0113a71782";
const NEWS_COLLECTION_ID = "6a19b00a7a65f0720b83cf54";
const CAMPUSES_COLLECTION_ID = "6a18810d807483bd4af584f4";
const STUDIES_COLLECTION_ID = "6a1c99235999bd4226b0c266";

const headers = {
  Authorization: `Bearer ${WEBFLOW_TOKEN}`,
};

const stripHtml = (text) => {
  if (!text) {
    return "";
  }

  return text.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
};

export const fetchProducts = async () => {
  const response = await fetch(`https://api.webflow.com/v2/sites/${SITE_ID}/products`, {
    headers: headers,
  });
  const data = await response.json();

  return data.items.map((item) => ({
    id: item.product.id,
    title: item.product.fieldData.name,
    description: item.product.fieldData.description,
    details: stripHtml(item.product.fieldData["detail-product"]),
    price: `EUR ${item.skus[0].fieldData.price.value / 100}`,
    priceNumber: item.skus[0].fieldData.price.value / 100,
    category: "Product",
    image: { uri: item.skus[0].fieldData["main-image"].url },
  }));
};

export const fetchNews = async () => {
  const response = await fetch(
    `https://api.webflow.com/v2/collections/${NEWS_COLLECTION_ID}/items`,
    { headers: headers },
  );
  const data = await response.json();

  return data.items.map((item) => ({
    id: item.id,
    title: item.fieldData.name,
    description: item.fieldData.intro,
    date: item.fieldData.datum,
    category: item.fieldData.categorie,
    content: stripHtml(item.fieldData.inhoud),
    image: { uri: item.fieldData.afbeelding.url },
  }));
};

export const fetchCampuses = async () => {
  const response = await fetch(
    `https://api.webflow.com/v2/collections/${CAMPUSES_COLLECTION_ID}/items`,
    { headers: headers },
  );
  const data = await response.json();

  return data.items.map((item) => ({
    id: item.id,
    name: item.fieldData.name,
    focus: item.fieldData["korte-beschrijving"],
    address: item.fieldData.adres,
    description: item.fieldData.beschrijving,
    phone: item.fieldData.telefoon,
    hours: item.fieldData.openingsuren,
    image: { uri: item.fieldData.afbeelding.url },
  }));
};

export const fetchStudies = async () => {
  const response = await fetch(
    `https://api.webflow.com/v2/collections/${STUDIES_COLLECTION_ID}/items`,
    { headers: headers },
  );
  const data = await response.json();

  return data.items.map((item) => ({
    id: item.id,
    title: item.fieldData["naam-opleiding"],
    campus: item.fieldData.campus,
    interest: item.fieldData.interessegebied,
    grade: item.fieldData.graad,
    description: stripHtml(item.fieldData.beschrijving),
    image: { uri: item.fieldData.afbeelding.url },
  }));
};
