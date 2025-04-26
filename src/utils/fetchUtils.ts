export async function fetchData(
  url: string,
  method: "GET" | "POST" | "DELETE" = "GET",
  body?: any
): Promise<any> {
  const options: RequestInit = {
    method,
    headers: {
      "Content-Type": "application/json",
    },
  };

  if (method === "POST" && body) {
    options.body = JSON.stringify(body);
  } else if (method === "DELETE" && body) {
    options.body = JSON.stringify(body);
  }

  try {
    // const response = await fetch(url, options);
    //   if (!response.ok) {
    //     throw new Error(`HTTP error! status: ${response.status}`);
    //   }
    // return response.status !== 204 ? await response. json() : null;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
