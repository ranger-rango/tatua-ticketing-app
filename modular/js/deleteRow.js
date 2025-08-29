async function delRow(tick_id)
{
    // ticketData.splice(id, 1);
    if (localStorageState)
    {
        let encTicketData = localStorage.getItem("localData");
        ticketData = encTicketData ? JSON.parse(dec(encTicketData)) : [];
    }
    ticketData = ticketData.filter(ticket => ticket.ticket_id !== tick_id);

    if (sessionStorageState)
    {
        sessionStorage.setItem("sessionData", JSON.stringify(ticketData));
    }

    if (localStorageState)
    {
        let encTicketData = enc(JSON.stringify(ticketData));
        localStorage.setItem("localData", encTicketData);
    }
    const tableBody = document.querySelector(".ticket-list-body");
    tableBody.innerHTML = "";
    displayedCounter = 0;
    listTickets();
}