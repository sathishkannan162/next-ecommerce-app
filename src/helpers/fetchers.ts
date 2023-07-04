const postData = async (url = "", data = { productId: 0 }) => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response;
};

const fetcher = async (url: string) => {
  const res = await fetch(url);
  return res.json();
};

export { postData, fetcher };
