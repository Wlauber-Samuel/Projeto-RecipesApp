export default async function fetchApi(url, key) {
  const response = await (await fetch(url)).json();
  const data = key ? await response[key] : await response;
  return data;
}
