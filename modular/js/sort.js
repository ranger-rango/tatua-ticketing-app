function sortForm()
{
    document.querySelector(".sort-rows").innerHTML += 
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
            <label for="order">Order:</label>
            <select name="order" class="order">
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
            </select>
        </div>
    </div>
    `;
}


function applySorts()
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

    const rows = document.querySelectorAll(".sort-rows .filter-entries");
    let sorted = [...ticketData];

    let sortForUrl = [];

    rows.forEach(row => 
    {
        const column = row.querySelector(".column").value;
        const order = row.querySelector(".order").value;

        if (column && order)
        {
            sortForUrl.push({ column, order});
        }

        sorted.sort((a, b) => 
        {
            let valA = String(a[column]).toLowerCase();
            let valB = String(b[column]).toLowerCase();

            if (valA < valB) return order === "asc" ? -1 : 1;
            if (valA > valB) return order === "asc" ? 1 : -1;
            return 0;
        });
    });

    const query = encodeURIComponent(JSON.stringify(sortForUrl));
    const newUrl = window.location.pathname + (sortForUrl.length ? `?sort=${query}` : "");
    history.pushState({ filters: sortForUrl }, "", newUrl);

    return sorted;
}