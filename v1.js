const axios = require('axios');

exports.handler = async (event) => {
    const API_KEY = process.env.JBOARD_API_KEY;
    const locParam = event.queryStringParameters.loc || "Inverloch";
    const towns = locParam.split(',').map(t => t.trim());

    try {
        const requests = towns.map(town => 
            axios.get('https://app.jboard.io/api/jobs', {
                params: { 'filter[query]': town, 'perPage': 10 },
                headers: { 'Authorization': `Bearer ${API_KEY}` }
            })
        );

        const responses = await Promise.all(requests);
        let allJobs = responses.flatMap(r => r.data.data);

        // Deduplicate using the 'id' field from your schema
        const uniqueJobsMap = new Map();
        allJobs.forEach(job => uniqueJobsMap.set(job.id, job));

        // Sort by 'posted_at' so newest is on top
        const finalResults = Array.from(uniqueJobsMap.values())
            .sort((a, b) => new Date(b.posted_at) - new Date(a.posted_at));

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
            body: JSON.stringify(finalResults)
        };
    } catch (error) {
        return { statusCode: 500, body: "Error" };
    }
};
