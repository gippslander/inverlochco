(async () => {
    const scriptTag = document.currentScript;
    const locations = scriptTag.getAttribute('loc') || 'Inverloch';
    const API_URL = `https://cdn.gippslander.com.au/get-jobs?loc=${encodeURIComponent(locations)}`;

    const container = document.createElement('div');
    container.style.cssText = `
        font-family: 'Inter', -apple-system, system-ui, sans-serif;
        width: 100%;
        max-width: 850px; 
        margin: 20px auto;
        padding: 0 15px;
        box-sizing: border-box;
    `;
    scriptTag.parentNode.insertBefore(container, scriptTag);

    try {
        const response = await fetch(API_URL);
        const allJobs = await response.json();

        if (!allJobs || allJobs.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding:40px; color:#666; border:1px dashed #ccc; border-radius:16px;">No current openings in ${locations}.</div>`;
            return;
        }

        // 1. Setup Header with Search Bar and Post a Job Button
        container.innerHTML = `
            <style>
                .gipps-search-container { display: flex; gap: 15px; margin-bottom: 25px; align-items: center; }
                .gipps-search-input { 
                    flex-grow: 1; padding: 14px 25px; border-radius: 50px; border: 1px solid #e1e4e8; 
                    font-size: 15px; outline: none; transition: border 0.2s; background: #f9fafb;
                }
                .gipps-search-input:focus { border-color: #a39c8e; background: #fff; }
                .gipps-post-btn { 
                    background: #a39c8e; color: white; text-decoration: none; padding: 14px 30px; 
                    border-radius: 50px; font-weight: 700; font-size: 15px; white-space: nowrap; transition: opacity 0.2s;
                }
                .gipps-post-btn:hover { opacity: 0.9; }
                .gipps-card { 
                    background: #fff; border: 1px solid #eef0f2; border-radius: 16px; padding: 20px 24px; 
                    margin-bottom: 12px; display: flex; align-items: center; box-shadow: 0 2px 4px rgba(0,0,0,0.02); 
                    transition: all 0.2s ease; 
                }
                .gipps-card:hover { border-color: #d1d8df; box-shadow: 0 8px 16px rgba(0,0,0,0.04); transform: translateY(-1px); }
                .gipps-apply-btn { background: #a39c8e; color: white; text-decoration: none; padding: 12px 32px; border-radius: 10px; font-weight: 700; font-size: 14px; margin-left: 20px; transition: background 0.2s; }
                @media (max-width: 600px) {
                    .gipps-search-container { flex-direction: column; align-items: stretch; }
                    .gipps-card { flex-direction: column; text-align: center; }
                    .gipps-card div { margin-right: 0 !important; margin-bottom: 10px; }
                    .gipps-apply-btn { margin-left: 0; width: 100%; box-sizing: border-box; margin-top: 10px; }
                }
            </style>
            
            <div class="gipps-search-container">
                <input type="text" class="gipps-search-input" id="gippsSearch" placeholder="Search jobs (e.g. Barista, Nurse)...">
                <a href="https://gippslander.com.au/post-a-job" target="_blank" class="gipps-post-btn">Post a Job</a>
            </div>

            <div id="gippsJobList"></div>

            <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #eee; display: flex; flex-direction: column; align-items: center; gap: 12px;">
                <div style="display: flex; align-items: center; gap: 10px; opacity: 0.9;">
                    <span style="font-size: 11px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Powered by</span>
                    <a href="https://gippslander.com.au" target="_blank">
                        <img src="https://d3535lqr6sqxto.cloudfront.net/logos/rEkuQybTnVw95OUPNTLLVxtGB7t4BbAVgbRJTndj.png" alt="Gippslander" style="height: 28px; display: block;">
                    </a>
                </div>
            </div>
        `;

        const jobListContainer = document.getElementById('gippsJobList');
        const searchInput = document.getElementById('gippsSearch');

        // 2. Function to Render Cards
        const renderJobs = (filteredJobs) => {
            if (filteredJobs.length === 0) {
                jobListContainer.innerHTML = `<div style="text-align:center; padding:20px; color:#999;">No matching jobs found.</div>`;
                return;
            }
            jobListContainer.innerHTML = filteredJobs.map(job => `
                <div class="gipps-card">
                    <div style="width: 56px; height: 56px; flex-shrink: 0; margin-right: 24px;">
                        <img src="${job.employer.logo || 'https://gippslander.com.au/favicon.ico'}" style="width: 100%; height: 100%; border-radius: 10px; object-fit: contain; border: 1px solid #f8f9fa;">
                    </div>
                    <div style="flex-grow: 1; text-align: left;">
                        <div style="font-weight: 700; font-size: 18px; color: #1a1b1e; margin-bottom: 4px;">${job.title}</div>
                        <div style="font-size: 15px; color: #525960;">${job.employer.name}</div>
                    </div>
                    <a href="${job.job_details_url}" target="_blank" class="gipps-apply-btn">Apply</a>
                </div>
            `).join('');
        };

        // Initial render
        renderJobs(allJobs);

        // 3. Search Logic
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            const filtered = allJobs.filter(job => 
                job.title.toLowerCase().includes(term) || 
                job.employer.name.toLowerCase().includes(term)
            );
            renderJobs(filtered);
        });

    } catch (e) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:#fa5252;">Error loading jobs.</div>`;
    }
})();
