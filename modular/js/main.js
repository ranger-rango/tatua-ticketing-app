let displayedCounter = 0;
let ticketData = [];
const secretKey = "mysecret123";

const tableHead = [
    {
        "id" : 'ticket_id',
        "columnName" : "Ticket ID",
        "hide" : false
    },
    {
        "id" : 'raised_by',
        "columnName" : "Raised By",
        "hide" : false
    },
    {
        "id" : 'ticket_details',
        "columnName" : "Ticket Details",
        "hide" : false
    },
    {
        "id" : 'date_created',
        "columnName" : "Date Created",
        "hide" : false
    },
    {
        "id" : 'actions',
        "columnName" : "Actions",
        "hide" : false
    }
];

let sessionStorageState = JSON.parse(sessionStorage.getItem("sessionStorageState")) || false;
let localStorageState = JSON.parse(localStorage.getItem("localStorageState")) || false;
let currentPage = localStorage.getItem("current_page") || "current-page";

document.addEventListener("DOMContentLoaded", () => 
{
    // const path = window.location.pathname;
    // routes(path);

    const html = document.documentElement;
    if (currentPage == "ticket-list")
    {
        listTickets();
    }
    html.setAttribute("current-page", currentPage);

    let sessionLabel = document.querySelector(".session-storage-title");
    sessionLabel.innerHTML = (sessionStorageState ? "Sess: ON" : "Sess: OFF");

    let localLabel = document.querySelector(".local-storage-title");
    localLabel.innerHTML = (localStorageState ? "Local: ON" : "Local: CLR");

    document.querySelector(".to-raise-ticket").addEventListener("click", () => 
    {
        currentPage = "raise-ticket";
        localStorage.setItem("current_page", "raise-ticket");
        html.setAttribute("current-page", currentPage);
    });
    displaytableHead();
    document.querySelector(".to-ticket-list").addEventListener("click", () => 
    {
        currentPage = "ticket-list";
        localStorage.setItem("current_page", "ticket-list");
        // displaytableHead();
        listTickets();
        html.setAttribute("current-page", currentPage);
    });

    document.querySelector(".to-table-render").addEventListener("click", () => 
    {
        currentPage = "table-render";
        localStorage.setItem("current_page", "table-render");
        html.setAttribute("current-page", currentPage);
    });

    formValidation();

    document.getElementById("submit-btn").addEventListener("click", () => 
    {
        storeTicket();
        const dialog = document.querySelector(".modal");
        const modalContent = document.querySelector(".modal-content");
        modalContent.innerHTML = 
        `
        <p class="successful-ticket-submission">Thank you for your feedback. Your concerns will be addressed as soon as possible.</p>
        `;
        dialog.showModal();
        document.getElementById("raise-ticket-form").reset();
        setTimeout(() => 
        {
            dialog.close();
        }, 3500);
    });

    document.querySelector(".session-storage-on").addEventListener("click", () => 
    {
        sessionStorageState = true;
        localStorageState = false;
        sessionStorage.setItem("sessionStorageState", JSON.stringify(true));

        let sessionLabel = document.querySelector(".session-storage-title");
        sessionLabel.innerHTML = "Sess: ON";

        // routes();
    });

    document.querySelector(".session-storage-off").addEventListener("click", () => 
    {
        sessionStorageState = false;
        sessionStorage.setItem("sessionStorageState", JSON.stringify(false));

        let sessionLabel = document.querySelector(".session-storage-title");
        sessionLabel.innerHTML = "Sess: OFF";
    });

    document.querySelector(".local-storage-on").addEventListener("click", () => 
    {
        localStorageState = true;
        sessionStorageState = false;
        localStorage.setItem("localStorageState", JSON.stringify(true));

        let localLabel = document.querySelector(".local-storage-title");
        localLabel.innerHTML = "Local: ON";
    });

    document.querySelector(".local-storage-off").addEventListener("click", () => 
    {
        localStorageState = false;
        localStorage.setItem("localStorageState", JSON.stringify(false));

        let localLabel = document.querySelector(".local-storage-title");
        localLabel.innerHTML = "Local: OFF";
    });

    document.querySelector(".local-storage-clr").addEventListener("click", () => 
    {
        localStorageState = false;
        localStorage.clear();

        let localLabel = document.querySelector(".local-storage-title");
        localLabel.innerHTML = "Local: CLR";
    });

    document.querySelectorAll(".sort-btn").forEach(btn => 
    {
        btn.addEventListener("click", () => {
            sortFilterBuilder("sort");
        });
    });

    document.querySelectorAll(".filter-btn").forEach(btn => 
    {
        btn.addEventListener("click", () => {
            sortFilterBuilder("");
        });
    });

    document.querySelector(".sort-filter-btn").addEventListener("click", () => 
    {
        const form = document.querySelector(".filterSortForm");
        const clone = form.cloneNode(true);
        clone.style.display = 'flex';
        const dialog = document.querySelector(".modal");
        const dialogContent = document.querySelector(".modal-content");
        dialogContent.appendChild(clone);
        dialog.showModal();

        document.addEventListener("click", (e) => 
        {
            if (e.target && e.target.id === "sortFilterBtn")
            {
                dialog.close();
            }
        });

        document.querySelector(".close-modal").addEventListener("click", () => 
        {
            dialog.close();
        });

    });

    document.querySelector(".refresh-btn").addEventListener("click", () => 
    {
        // history.pushState({}, "", "/tatua-ticketing-app/index.html");
        location.reload();
    });

});
