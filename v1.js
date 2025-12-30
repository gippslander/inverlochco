(async () => {
    // 1. More robust way to find the script tag
    const scripts = document.getElementsByTagName('script');
    let scriptTag = document.currentScript;
    
    if (!scriptTag) {
        // Fallback: search for the script by its filename
        scriptTag = Array.from(scripts).find(s => s.src.includes('v1.js'));
    }

    if (!scriptTag) {
        console.error("Gippslander Widget: Could not find script tag to anchor to.");
        return;
    }

    const locations = scriptTag.getAttribute('loc') || 'Inverloch';
    const brandColor = scriptTag.getAttribute('btn-color') || '#a39c8e';
    const API_URL = `https://cdn.gippslander.com.au/get-jobs?loc=${encodeURIComponent(locations)}`;

    // 2. Create the container immediately before fetching
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
    container.innerHTML = `<div style="text-align:center; padding:20px; color:#94a3b8;">Loading jobs...</div>`;

    try {
        const response = await fetch(API_URL);
        const allJobs = await response.json();

        if (!allJobs || allJobs.length === 0) {
            container.innerHTML = `<div style="text-align:center; padding:40px; color:#666; border:1px dashed #ccc; border-radius:16px;">No current openings in ${locations}.</div>`;
            return;
        }

        // 3. Clear the loading message and build UI
        container.innerHTML = `
            <style>
                .gipps-search-container { display: flex; gap: 12px; margin-bottom: 24px; align-items: center; }
                .gipps-search-input { 
                    flex-grow: 1; padding: 14px 22px; border-radius: 50px; border: 1px solid #e2e8f0; 
                    font-size: 15px; outline: none; background: #f8fafc; transition: all 0.2s;
                }
                .gipps-search-input:focus { border-color: ${brandColor}; background: #fff; }
                .gipps-post-btn { 
                    background: ${brandColor}; color: white !important; text-decoration: none; padding: 14px 28px; 
                    border-radius: 50px; font-weight: 700; font-size: 14px; white-space: nowrap; transition: opacity 0.2s;
                }
                .gipps-post-btn:hover { opacity: 0.9; }
                .gipps-card { 
                    background: #fff; border: 1px solid #f1f5f9; border-radius: 16px; padding: 24px; 
                    margin-bottom: 16px; display: flex; align-items: center; box-shadow: 0 4px 6px -1px rgba(0,0,0,0.03); 
                    transition: all 0.2s ease; text-decoration: none; color: inherit;
                }
                .gipps-card:hover { border-color: #cbd5e1; transform: translateY(-1px); }
                .gipps-meta-container { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 12px; }
                .gipps-badge {
                    background: #f1f5f9; color: #475569; padding: 6px 12px; border-radius: 6px; 
                    font-size: 12px; font-weight: 500;
                }
                .gipps-badge-salary {
                    background: #ecfdf5; color: #065f46; border: 1px solid #d1fae5;
                }
                .gipps-apply-btn { 
                    background: ${brandColor}; color: white !important; text-decoration: none; padding: 12px 32px; 
                    border-radius: 8px; font-weight: 700; font-size: 14px; margin-left: auto; transition: background 0.2s;
                }
                @media (max-width: 600px) {
                    .gipps-card { flex-direction: column; text-align: center; }
                    .gipps-apply-btn { margin-left: 0; margin-top: 20px; width: 100%; box-sizing: border-box; }
                    .gipps-search-container { flex-direction: column; }
                    .gipps-post-btn { width: 100%; text-align: center; }
                    .gipps-meta-container { justify-content: center; }
                }
            </style>
            
            <div class="gipps-search-container">
                <input type="text" class="gipps-search-input" id="gippsSearch" placeholder="Search jobs...">
                <a href="https://gippslander.com.au/post-a-job" target="_blank" class="gipps-post-btn">Post a Job</a>
            </div>

            <div id="gippsJobList"></div>

            <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee; display: flex; flex-direction: column; align-items: center; gap: 10px;">
                <div style="display: flex; align-items: center; gap: 8px; opacity: 0.8;">
                    <span style="font-size: 10px; color: #94a3b8; text-transform: uppercase; letter-spacing: 1px; font-weight: 700;">Powered by</span>
                    <a href="https://gippslander.com.au" target="_blank">
                        <img src="https://d3535lqr6sqxto.cloudfront.net/logos/rEkuQybTnVw95OUPNTLLVxtGB7t4BbAVgbRJTndj.png" alt="Gippslander" style="height: 26px;">
                    </a>
                </div>
            </div>
        `;

        const jobListContainer = document.getElementById('gippsJobList');
        const searchInput = document.getElementById('gippsSearch');

        const renderJobs = (filteredJobs) => {
            if (filteredJobs.length === 0) {
                jobListContainer.innerHTML = `<div style="text-align:center; padding:30px; color:#94a3b8;">No matching jobs found.</div>`;
                return;
            }
            jobListContainer.innerHTML = filteredJobs.map(job => {
                const jobType = job.job_type?.name || 'Full-time';
                const locationLabel = job.location ? job.location.split(',')[0] : 'Gippsland';
                const salaryHtml = (job.salary_min || job.salary_max) 
                    ? `<span class="gipps-badge gipps-badge-salary">$${job.salary_min || ''}${job.salary_max ? ' - $'+job.salary_max : ''}</span>` 
                    : '';

                return `
                <div class="gipps-card">
                    <img src="${job.employer.logo || 'https://gippslander.com.au/favicon.ico'}" style="width: 64px; height: 64px; border-radius: 12px; object-fit: contain; margin-right: 24px; border: 1px solid #f1f5f9; background: #fff;">
                    <div style="text-align: left; flex-grow: 1;">
                        <div style="font-weight: 700; font-size: 19px; color: #0f172a; margin-bottom: 2px;">${job.title}</div>
                        <div style="font-size: 15px; color: #64748b;">${job.employer.name}</div>
                        <div class="gipps-meta-container">
                            <span class="gipps-badge">${locationLabel}, VIC</span>
                            <span class="gipps-badge">${jobType}</span>
                            ${salaryHtml}
                        </div>
                    </div>
                    <a href="${job.job_details_url}" target="_blank" class="gipps-apply-btn">Apply</a>
                </div>`;
            }).join('');
        };

        renderJobs(allJobs);
        searchInput.addEventListener('input', (e) => {
            const term = e.target.value.toLowerCase();
            renderJobs(allJobs.filter(j => 
                j.title.toLowerCase().includes(term) || 
                j.employer.name.toLowerCase().includes(term)
            ));
        });

    } catch (e) {
        container.innerHTML = `<div style="text-align:center; padding:20px; color:#ef4444;">Error loading jobs.</div>`;
    }
})();
