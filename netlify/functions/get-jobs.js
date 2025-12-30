export const handler = async (event) => {
  const API_KEY = process.env.JBOARD_API_KEY; 
  const locParam = event.queryStringParameters.loc || "";
  const towns = locParam ? locParam.split(',').map(t => t.trim()) : [""];

  try {
    const requests = towns.map(async (town) => {
      // Added page=1 and perPage=20 to the query string
      const url = `https://app.jboard.io/api/v1/jobs?filter[query]=${encodeURIComponent(town)}&page=1&perPage=20`;
      
      const response = await fetch(url, {
        headers: { "Authorization": API_KEY }
      });

      if (!response.ok) return { items: [] };
      
      return response.json();
    });

    const responses = await Promise.all(requests);
    
    // Combine 'items' from all responses
    let allJobs = responses.flatMap(r => r.items || []);

    // Deduplicate jobs by their unique ID to handle jobs mentioning multiple towns
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
    return { statusCode: 500, body: JSON.stringify({ error: "API connection failed" }) };
  }
};
