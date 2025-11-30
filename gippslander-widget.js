<div id="gippslander-container">
    <div class="gipps-top-bar">
        <div class="gipps-search-wrapper">
            <input type="text" id="gipps-search-input" placeholder="Search jobs (e.g. Barista, Nurse)...">
        </div>
        <a href="https://gippslander.com.au/pricing" target="_blank" class="gipps-post-btn">Post a Job</a>
    </div>

    <div id="gippslander-job-feed">
        <p class="gipps-loading">Loading local opportunities...</p>
    </div>

    <button id="gipps-load-more-btn" style="display:none;">Load More Jobs</button>

    <div class="gipps-footer">
        <span class="gipps-footer-text">Powered by</span>
        <a href="https://gippslander.com.au" target="_blank" class="gipps-footer-link">
            <img src="https://d3535lqr6sqxto.cloudfront.net/logos/rEkuQybTnVw95OUPNTLLVxtGB7t4BbAVgbRJTndj.png" alt="Gippslander" class="gipps-footer-logo">
        </a>
    </div>
</div>

<style>
    /* --- WIDGET CONTAINER --- */
    #gippslander-container {
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        width: 100%;
        max-width: 900px; 
        margin: 0 auto;
        box-sizing: border-box;
    }

    /* --- TOP BAR --- */
    .gipps-top-bar {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin-bottom: 24px;
    }

    .gipps-search-wrapper {
        flex: 1;
        position: relative;
    }

    #gipps-search-input {
        width: 100%;
        padding: 16px 24px;
        font-size: 16px;
        border: 1px solid #ddd;
        border-radius: 50px;
        background-color: #f9f9f9;
        outline: none;
        transition: border-color 0.2s, box-shadow 0.2s;
        box-sizing: border-box;
        height: 54px;
    }

    #gipps-search-input:focus {
        border-color: #a0a0a0;
        background-color: #fff;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
    }

    /* --- POST JOB BUTTON --- */
    .gipps-post-btn {
        background-color: #9e978e; /* Inverloch Grey */
        color: #ffffff !important;
        text-decoration: none;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0 30px;
        height: 54px;
        border-radius: 50px;
        font-weight: 700;
        font-size: 15px;
        white-space: nowrap;
        transition: background-color 0.2s, transform 0.1s;
        box-sizing: border-box;
        border: none;
    }

    .gipps-post-btn:hover {
        background-color: #8a847c;
        transform: translateY(-1px);
    }

    /* --- JOB CARD --- */
    .gipps-job-card {
        background: #ffffff;
        border: 1px solid #e5e7eb;
        border-radius: 12px;
        padding: 24px;
        margin-bottom: 16px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.02);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }

    .gipps-job-card:hover {
        transform: translateY(-2px);
        box-shadow: 0 12px 24px rgba(0,0,0,0.08);
        border-color: #d1d5db;
    }

    /* --- CARD CONTENT --- */
    .gipps-card-top {
        display: flex;
        gap: 20px;
        align-items: flex-start; 
        flex: 1; 
    }

    .gipps-logo-box {
        width: 56px;
        height: 56px;
        min-width: 56px;
        border-radius: 10px;
        background-color: #ffffff;
        border: 1px solid #f3f4f6;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: 700;
        text-transform: uppercase;
        color: #fff;
        flex-shrink: 0;
        object-fit: contain;
        padding: 4px;
    }
    
    .gipps-logo-box.is-letter {
        background-color: #1f2937;
        border: none;
        padding: 0;
    }

    .gipps-job-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-width: 0; 
    }

    .gipps-job-title {
        font-size: 18px;
        font-weight: 700;
        color: #111827;
        margin: 0 0 6px 0;
        line-height: 1.4;
    }

    .gipps-job-company {
        font-size: 15px;
        color: #6b7280;
        font-weight: 500;
        margin-bottom: 10px;
    }

    .gipps-job-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        align-items: center;
    }

    .gipps-tag {
        background-color: #f3f4f6;
        color: #4b5563;
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 13px;
        font-weight: 500;
        white-space: nowrap;
    }

    .gipps-salary {
        background-color: #ecfdf5;
        color: #059669;
        border: 1px solid #d1fae5;
    }

    /* --- APPLY BUTTON --- */
    .gipps-apply-btn {
        background-color: #9e978e;
        color: #ffffff !important;
        text-decoration: none;
        text-align: center;
        padding: 12px 30px;
        border-radius: 6px;
        font-weight: 600;
        font-size: 14px;
        display: block;
        transition: background-color 0.2s, transform 0.1s;
        white-space: nowrap;
        border: none;
        min-width: 120px;
    }

    .gipps-apply-btn:hover {
        background-color: #8a847c; 
        transform: translateY(-1px);
    }

    /* --- LOAD MORE BUTTON --- */
    #gipps-load-more-btn {
        display: block;
        width: 100%;
        max-width: 300px;
        margin: 20px auto 30px auto;
        padding: 12px 24px;
        background: transparent;
        border: 2px solid #9e978e;
        color: #9e978e;
        border-radius: 50px;
        font-weight: 600;
        font-size: 14px;
        cursor: pointer;
        transition: all 0.2s;
    }

    #gipps-load-more-btn:hover {
        background: #9e978e;
        color: white;
    }

    /* --- FOOTER --- */
    .gipps-footer {
        text-align: center;
        padding-top: 10px;
        padding-bottom: 30px;
        border-top: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        margin-top: 20px;
    }

    .gipps-footer-text {
        color: #888;
        font-size: 13px;
    }

    .gipps-footer-logo {
        height: 24px; /* Adjust size of logo */
        width: auto;
        opacity: 0.8;
        transition: opacity 0.2s;
        vertical-align: middle;
    }

    .gipps-footer-logo:hover {
        opacity: 1;
    }

    .gipps-loading {
        text-align: center; 
        color: #888; 
        padding: 40px; 
        font-size: 16px;
    }

    /* --- RESPONSIVE --- */
    @media (min-width: 640px) {
        .gipps-top-bar {
            flex-direction: row;
        }
        .gipps-job-card {
            flex-direction: row;
            align-items: flex-start; 
        }
        .gipps-apply-btn {
            width: auto;
            margin-left: 20px;
            margin-top: 5px; 
        }
    }
</style>

<script>
(function() {
    const ORIGINAL_URL = 'https://app.jboard.io/board/5976/feeds/ratg7azz61-visininverlochco';
    const PROXY_URL = 'https://corsproxy.io/?' + encodeURIComponent(ORIGINAL_URL);
    
    const CONTAINER = document.getElementById('gippslander-job-feed');
    const SEARCH_INPUT = document.getElementById('gipps-search-input');
    const LOAD_MORE_BTN = document.getElementById('gipps-load-more-btn');
    
    let ALL_JOBS = [];
    let visibleCount = 10; // Initial jobs to show

    // --- Helpers ---
    function getXmlVal(el, tagName) {
        const node = el.querySelector(tagName);
        return node ? node.textContent.trim() : '';
    }

    function formatSalary(salaryStr) {
        if (!salaryStr) return '';
        const isHourly = salaryStr.includes('hourly');
        const matches = salaryStr.match(/([\d\.]+)/g);
        if (!matches) return '';
        
        const min = parseFloat(matches[0]);
        const max = matches[1] ? parseFloat(matches[1]) : null;

        if (isHourly) {
            const minClean = Math.round(min);
            const maxClean = max ? Math.round(max) : null;
            return maxClean ? `$${minClean} - $${maxClean} / hr` : `$${minClean} / hr`;
        } else {
            const minK = Math.round(min / 1000) + 'k';
            if (!max) return `$${minK}`;
            const maxK = Math.round(max / 1000) + 'k';
            return `$${minK} - $${maxK}`;
        }
    }

    function renderJobs(jobs, isSearch = false) {
        CONTAINER.innerHTML = ''; 

        // Logic: If searching, show all matches. If default, show only 'visibleCount'.
        const jobsToShow = isSearch ? jobs : jobs.slice(0, visibleCount);

        if (jobs.length === 0) {
            CONTAINER.innerHTML = '<p style="text-align:center; padding:40px; color:#666;">No jobs found matching your search.</p>';
            LOAD_MORE_BTN.style.display = 'none';
            return;
        }

        jobsToShow.forEach(item => {
            const card = document.createElement('div');
            card.className = 'gipps-job-card';

            const { title, company, location, type, link, salaryRaw, logoUrl } = item;
            const salaryFormatted = formatSalary(salaryRaw);
            let salaryTag = salaryFormatted ? `<span class="gipps-tag gipps-salary">${salaryFormatted}</span>` : '';

            let logoHtml;
            if (logoUrl && logoUrl.length > 0) {
                logoHtml = `<img src="${logoUrl}" class="gipps-logo-box" alt="${company}">`;
            } else {
                const letter = company.charAt(0);
                logoHtml = `<div class="gipps-logo-box is-letter">${letter}</div>`;
            }

            card.innerHTML = `
                <div class="gipps-card-top">
                    ${logoHtml}
                    <div class="gipps-job-info">
                        <h3 class="gipps-job-title">${title}</h3>
                        <div class="gipps-job-company">${company}</div>
                        <div class="gipps-job-meta">
                            <span class="gipps-tag">${location}</span>
                            ${type ? `<span class="gipps-tag">${type}</span>` : ''}
                            ${salaryTag}
                        </div>
                    </div>
                </div>
                <a href="${link}" target="_blank" class="gipps-apply-btn">Apply</a>
            `;
            CONTAINER.appendChild(card);
        });

        // Logic to show/hide "Load More" button
        if (!isSearch && jobs.length > visibleCount) {
            LOAD_MORE_BTN.style.display = 'block';
            LOAD_MORE_BTN.textContent = `Load More Jobs (${jobs.length - visibleCount} remaining)`;
        } else {
            LOAD_MORE_BTN.style.display = 'none';
        }
    }

    // --- Fetch & Init ---
    fetch(PROXY_URL)
    .then(response => response.text())
    .then(str => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(str, "text/xml");
        const items = xmlDoc.querySelectorAll("item");

        if (items.length === 0) {
            CONTAINER.innerHTML = '<p style="text-align:center; padding:20px;">No current listings available.</p>';
            return;
        }

        ALL_JOBS = Array.from(items).map(item => ({
            title: getXmlVal(item, 'title'),
            company: getXmlVal(item, 'employer_name') || 'Gippslander',
            location: getXmlVal(item, 'location'),
            type: getXmlVal(item, 'job_type_title'),
            link: getXmlVal(item, 'url'),
            salaryRaw: getXmlVal(item, 'salary'),
            logoUrl: getXmlVal(item, 'employer_logo')
        }));

        renderJobs(ALL_JOBS);
    })
    .catch(err => {
        console.error('Widget Error:', err);
        CONTAINER.innerHTML = '<p style="text-align:center; padding:20px;">View all jobs at <a href="https://gippslander.com.au">Gippslander.com.au</a></p>';
    });

    // --- Search Listener ---
    SEARCH_INPUT.addEventListener('keyup', (e) => {
        const term = e.target.value.toLowerCase();
        
        if (term.length === 0) {
            // Reset to default view if search is cleared
            renderJobs(ALL_JOBS, false);
            return;
        }

        const filtered = ALL_JOBS.filter(job => 
            job.title.toLowerCase().includes(term) || 
            job.company.toLowerCase().includes(term) || 
            job.location.toLowerCase().includes(term)
        );
        // Render all matches (isSearch = true)
        renderJobs(filtered, true);
    });

    // --- Load More Listener ---
    LOAD_MORE_BTN.addEventListener('click', () => {
        visibleCount += 10; // Show 10 more
        renderJobs(ALL_JOBS, false); // Re-render
    });

})();
</script>
