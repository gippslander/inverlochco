export const handler = async (event) => {
  // 1. Check if the API key exists
  const API_KEY = process.env.JBOARD_API_KEY; 
  
  if (!API_KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: "Server configuration error: Missing API Key" }) };
  }

  const locParam = event.queryStringParameters.loc || "Inverloch";
  const towns = locParam.split(',').map(t => t.trim());

  try {
    const requests = towns.map(async (town) => {
      const response = await fetch(`https://app.jboard.io/api/v1/jobs?filter[query]=${encodeURIComponent(town)}`, {
        headers: { "Authorization": API_KEY }
      });
      
      // 2. Safety Check: If Jboard returns an error page, don't try to parse it as JSON
      if (!response.ok) return { items: [] }; 
      
      return response.json();
    });

    const responses = await Promise.all(requests);
    let allJobs = responses.flatMap(r => r.items || []);

    const uniqueJobs = Array.from(new Map(allJobs.map(job => [job.id, job])).values());

    return {
      statusCode: 200,
      headers: { 
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*" 
      },
      body: JSON.stringify(uniqueJobs)
    };
  } catch (error) {
    return { statusCode: 500, body: JSON.stringify({ error: "Fetch failed" }) };
  }
};
