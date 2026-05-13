export async function fetchConveniosList(url) {
  const res = await fetch(url, {
    headers: {Accept: "application/json"},
  });

  const text = await res.text();
  let data;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    throw new Error("La respuesta no es JSON válido.");
  }

  if (!res.ok) {
    const msg =
      data && typeof data === "object" && data.mensaje != null ? String(data.mensaje) : `Error HTTP ${res.status}`;
    throw new Error(msg);
  }

  return data;
}
