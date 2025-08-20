let sessionStorageState = JSON.parse(sessionStorage.getItem("sessionStorageState")) || false;
let localStorageState = JSON.parse(localStorage.getItem("localStorageState")) || false;
let currentPage = localStorage.getItem("current_page") || "current-page";

document.addEventListener("DOMContentLoaded", () => 
{
    const html = document.documentElement;
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

    document.querySelector(".to-ticket-list").addEventListener("click", () => 
    {
        currentPage = "ticket-list";
        localStorage.setItem("current_page", "ticket-list");
        listTickets();
        html.setAttribute("current-page", currentPage);
    });


    document.getElementById("submit-btn").addEventListener("click", () => 
    {
        storeTicket();
    });

    document.querySelector(".session-storage-on").addEventListener("click", () => 
    {
        sessionStorageState = true;
        localStorageState = false;
        sessionStorage.setItem("sessionStorageState", JSON.stringify(true));

        let sessionLabel = document.querySelector(".session-storage-title");
        sessionLabel.innerHTML = "Sess: ON";
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

});

let ticketData = [];
function storeTicket()
{
    const form = document.getElementById("raise-ticket-form");
    const formData = new FormData(form);

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    const submitTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    formData.append("created_at", submitTime);

    ticketData.push(Object.fromEntries(formData.entries()));

    if (sessionStorageState)
    {
        sessionStorage.setItem("sessionData", JSON.stringify(ticketData));
    }

    if (localStorageState)
    {
        localStorage.setItem("localData", JSON.stringify(ticketData));
    }
}

let displayedCounter = 0;
function delRow(id)
{
    ticketData.splice(id, 1);
    sessionStorage.setItem("sessionData", JSON.stringify(ticketData));
    localStorage.setItem("localData", JSON.stringify(ticketData));
    const tableBody = document.querySelector(".ticket-list-body");
    tableBody.innerHTML = "";
    displayedCounter = 0;
    listTickets();
}

function listTickets()
{
    const tableBody = document.querySelector(".ticket-list-body");
    let tableHtml = ``;

    if (sessionStorageState)
    {
        ticketData = JSON.parse(sessionStorage.getItem("sessionData")) || [];
    }

    if (localStorageState)
    {
        ticketData = JSON.parse(localStorage.getItem("localData")) || [];
    }


    for (displayedCounter; displayedCounter < ticketData.length; displayedCounter ++)
    {
        tableHtml += 
        `
        <tr id="row${displayedCounter}">
            <td>${displayedCounter}</td>

            <td>
                <p class="main-info">${ticketData[displayedCounter].full_name}</p>
                <p class="extra-info">${(ticketData[displayedCounter].contact_method == "email" ? ticketData[displayedCounter].email_address : ticketData[displayedCounter].phone_number)}</p>
            </td>

            <td>
                <p class="main-info">${ticketData[displayedCounter].subject}</p>
                <p class="extra-info">${ticketData[displayedCounter].message}</p>
            </td>

            <td>${ticketData[displayedCounter].created_at}</td>

            <td class="table-actions">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#605d6d" d="M320 576C461.4 576 576 461.4 576 320C576 178.6 461.4 64 320 64C178.6 64 64 178.6 64 320C64 461.4 178.6 576 320 576zM288 224C288 206.3 302.3 192 320 192C337.7 192 352 206.3 352 224C352 241.7 337.7 256 320 256C302.3 256 288 241.7 288 224zM280 288L328 288C341.3 288 352 298.7 352 312L352 400L360 400C373.3 400 384 410.7 384 424C384 437.3 373.3 448 360 448L280 448C266.7 448 256 437.3 256 424C256 410.7 266.7 400 280 400L304 400L304 336L280 336C266.7 336 256 325.3 256 312C256 298.7 266.7 288 280 288z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#444054" d="M352 96C352 78.3 337.7 64 320 64C302.3 64 288 78.3 288 96L288 306.7L246.6 265.3C234.1 252.8 213.8 252.8 201.3 265.3C188.8 277.8 188.8 298.1 201.3 310.6L297.3 406.6C309.8 419.1 330.1 419.1 342.6 406.6L438.6 310.6C451.1 298.1 451.1 277.8 438.6 265.3C426.1 252.8 405.8 252.8 393.3 265.3L352 306.7L352 96zM160 384C124.7 384 96 412.7 96 448L96 480C96 515.3 124.7 544 160 544L480 544C515.3 544 544 515.3 544 480L544 448C544 412.7 515.3 384 480 384L433.1 384L376.5 440.6C345.3 471.8 294.6 471.8 263.4 440.6L206.9 384L160 384zM464 440C477.3 440 488 450.7 488 464C488 477.3 477.3 488 464 488C450.7 488 440 477.3 440 464C440 450.7 450.7 440 464 440z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#999999" d="M224.2 89C216.3 70.1 195.7 60.1 176.1 65.4L170.6 66.9C106 84.5 50.8 147.1 66.9 223.3C104 398.3 241.7 536 416.7 573.1C493 589.3 555.5 534 573.1 469.4L574.6 463.9C580 444.2 569.9 423.6 551.1 415.8L453.8 375.3C437.3 368.4 418.2 373.2 406.8 387.1L368.2 434.3C297.9 399.4 241.3 341 208.8 269.3L253 233.3C266.9 222 271.6 202.9 264.8 186.3L224.2 89z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#5f5c6d" d="M125.4 128C91.5 128 64 155.5 64 189.4C64 190.3 64 191.1 64.1 192L64 192L64 448C64 483.3 92.7 512 128 512L512 512C547.3 512 576 483.3 576 448L576 192L575.9 192C575.9 191.1 576 190.3 576 189.4C576 155.5 548.5 128 514.6 128L125.4 128zM528 256.3L528 448C528 456.8 520.8 464 512 464L128 464C119.2 464 112 456.8 112 448L112 256.3L266.8 373.7C298.2 397.6 341.7 397.6 373.2 373.7L528 256.3zM112 189.4C112 182 118 176 125.4 176L514.6 176C522 176 528 182 528 189.4C528 193.6 526 197.6 522.7 200.1L344.2 335.5C329.9 346.3 310.1 346.3 295.8 335.5L117.3 200.1C114 197.6 112 193.6 112 189.4z"/></svg>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#444054" d="M128.1 64C92.8 64 64.1 92.7 64.1 128L64.1 512C64.1 547.3 92.8 576 128.1 576L274.3 576L285.2 521.5C289.5 499.8 300.2 479.9 315.8 464.3L448 332.1L448 234.6C448 217.6 441.3 201.3 429.3 189.3L322.8 82.7C310.8 70.7 294.5 64 277.6 64L128.1 64zM389.6 240L296.1 240C282.8 240 272.1 229.3 272.1 216L272.1 122.5L389.6 240zM332.3 530.9L320.4 590.5C320.2 591.4 320.1 592.4 320.1 593.4C320.1 601.4 326.6 608 334.7 608C335.7 608 336.6 607.9 337.6 607.7L397.2 595.8C409.6 593.3 421 587.2 429.9 578.3L548.8 459.4L468.8 379.4L349.9 498.3C341 507.2 334.9 518.6 332.4 531zM600.1 407.9C622.2 385.8 622.2 350 600.1 327.9C578 305.8 542.2 305.8 520.1 327.9L491.3 356.7L571.3 436.7L600.1 407.9z"/></svg>
                <svg onClick="delRow(${displayedCounter})" id="del${displayedCounter}" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#fd675f" d="M262.2 48C248.9 48 236.9 56.3 232.2 68.8L216 112L120 112C106.7 112 96 122.7 96 136C96 149.3 106.7 160 120 160L520 160C533.3 160 544 149.3 544 136C544 122.7 533.3 112 520 112L424 112L407.8 68.8C403.1 56.3 391.2 48 377.8 48L262.2 48zM128 208L128 512C128 547.3 156.7 576 192 576L448 576C483.3 576 512 547.3 512 512L512 208L464 208L464 512C464 520.8 456.8 528 448 528L192 528C183.2 528 176 520.8 176 512L176 208L128 208zM288 280C288 266.7 277.3 256 264 256C250.7 256 240 266.7 240 280L240 456C240 469.3 250.7 480 264 480C277.3 480 288 469.3 288 456L288 280zM400 280C400 266.7 389.3 256 376 256C362.7 256 352 266.7 352 280L352 456C352 469.3 362.7 480 376 480C389.3 480 400 469.3 400 456L400 280z"/></svg>
            </td>
        </tr>
        `;
    }

    tableBody.innerHTML += tableHtml;
}