const endpoint = process.env.REACT_APP_ZENGA_PAY_COLLECTIONS_ENDPOINT_SANDBOX;
const key = process.env.REACT_APP_ZENGA_PAY_API_KEY_DEMO;

export const collectFunds = async (data) => {
  try {
    const url = endpoint + "collections";
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: data,
    }).then((data) => data.json());
    return response;
  } catch (error) {
    return error;
  }
};

export const checkTransaction = async (reference) => {
  try {
    const response = await fetch(
      `${endpoint}collections/${reference}`,
      {
        method: "GET",
        headers: {
          Authorization:
            `Bearer ${key}`,
          "Content-Type": "application/json",
        },
      }
    ).then((data) => data.json());
    return response;
  } catch (error) {
    return error;
  }
};
