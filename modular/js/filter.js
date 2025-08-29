function filterForm()
{
    document.querySelector(".filter-rows").innerHTML += 
    `
    <div class="filter-entries">
        <div class="filter-entry">
            <label for="column">Column:</label>
            <select name="column" class="column">
                <option value="full_name">Full Name</option>
                <option value="email_address">Email</option>
                <option value="phone_number">Phone</option>
                <option value="created_at">Created At</option>
                <option value="ticket_id">Ticket ID</option>
            </select>
        </div>
        <div class="filter-entry">
            <label for="relation">Relation:</label>
            <select name="relation" class="relation">
                <option value="equals">Equals</option>
                <option value="contains">Contains</option>
                <option value="starts with">Starts With</option>
                <option value="ends with">Ends With</option>
            </select>
        </div>
        <div class="filter-entry">
            <label for="filt_value">Filter Value:</label>
            <input type="text" name="filt_value" class="filt_value" placeholder="Enter Value" />
        </div>
    </div>
    `;
}

function applyFilters()
{
    if (sessionStorageState)
    {
        ticketData = JSON.parse(sessionStorage.getItem("sessionData")) || [];
    }

    if (localStorageState)
    {
        let encTicketData = localStorage.getItem("localData");

        ticketData = encTicketData ? JSON.parse(dec(encTicketData)) : [];
    }

    const rows = document.querySelectorAll(".filter-rows .filter-entries");
    let filtered = [...ticketData];

    let filtersForUrl = [];

    rows.forEach(row => 
    {
        const column = row.querySelector(".column").value;
        const relation = row.querySelector(".relation").value;
        const value = row.querySelector(".filt_value").value.toLowerCase();

        if (column && relation && value)
        {
            filtersForUrl.push({ column, relation, value });
        }

        filtered = filtered.filter(item => 
        {
            const cellValue = String(item[column]).toLowerCase();
            switch (relation) 
            {
                case "equals": return cellValue === value;
                case "contains": return cellValue.includes(value);
                case "starts with": return cellValue.startsWith(value);
                case "ends with": return cellValue.endsWith(value);
                default: return true;
            }
        });
    });

    const query = encodeURIComponent(JSON.stringify(filtersForUrl));
    const newUrl = window.location.pathname + (filtersForUrl.length ? `?filters=${query}` : "");
    history.pushState({ filters: filtersForUrl }, "", newUrl);

    return filtered;
}