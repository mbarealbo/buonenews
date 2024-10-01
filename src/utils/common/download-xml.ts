export async function downloadXml(url: string) {
  return fetch(url).then((res) => res.text());
}
