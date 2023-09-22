export default async function fetchApi(url, key) {
  const response = await fetch(url);
  const data = await response.json();
  return key ? data[key] : data;
}
