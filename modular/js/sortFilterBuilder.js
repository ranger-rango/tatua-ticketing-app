function sortFilterBuilder(choice)
{
    const dialog = document.querySelector(".modal");
    const dialogHeader = document.querySelector(".modal-header");
    const dialogContent = document.querySelector(".modal-content");

    dialogHeader.innerHTML = 
    choice === "sort" ?
    `
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#d38571" d="M278.6 438.6L182.6 534.6C170.1 547.1 149.8 547.1 137.3 534.6L41.3 438.6C28.8 426.1 28.8 405.8 41.3 393.3C53.8 380.8 74.1 380.8 86.6 393.3L128 434.7L128 128C128 110.3 142.3 96 160 96C177.7 96 192 110.3 192 128L192 434.7L233.4 393.3C245.9 380.8 266.2 380.8 278.7 393.3C291.2 405.8 291.2 426.1 278.7 438.6zM352 96L384 96C401.7 96 416 110.3 416 128C416 145.7 401.7 160 384 160L352 160C334.3 160 320 145.7 320 128C320 110.3 334.3 96 352 96zM352 224L448 224C465.7 224 480 238.3 480 256C480 273.7 465.7 288 448 288L352 288C334.3 288 320 273.7 320 256C320 238.3 334.3 224 352 224zM352 352L512 352C529.7 352 544 366.3 544 384C544 401.7 529.7 416 512 416L352 416C334.3 416 320 401.7 320 384C320 366.3 334.3 352 352 352zM352 480L576 480C593.7 480 608 494.3 608 512C608 529.7 593.7 544 576 544L352 544C334.3 544 320 529.7 320 512C320 494.3 334.3 480 352 480z"/></svg>
    </span>
    Sort Table
    ` : 
    `
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#d38571" d="M96 128C83.1 128 71.4 135.8 66.4 147.8C61.4 159.8 64.2 173.5 73.4 182.6L256 365.3L256 480C256 488.5 259.4 496.6 265.4 502.6L329.4 566.6C338.6 575.8 352.3 578.5 364.3 573.5C376.3 568.5 384 556.9 384 544L384 365.3L566.6 182.7C575.8 173.5 578.5 159.8 573.5 147.8C568.5 135.8 556.9 128 544 128L96 128z"/></svg>
    </span>
    Filter Table
    `;

    
    dialogContent.innerHTML = 
    `
    <form id="filterForm" action="">
        <div class="filter-rows"></div>
    </form>
    <form id="sortForm" action="">
        <div class="sort-rows"></div>
    </form>
    <p class="add-sf"></p>

    <div class="sf-btn-container">
        <button type="button" class="sf-reset"></button>
        <button type="button" class="sf-submit"></button>
    </div>
    `;

    document.querySelector(".add-sf").addEventListener("click", () => 
    {
        choice === "sort" ? sortForm() : filterForm();
    });

    document.querySelector(".add-sf").innerHTML = 
    choice === "sort" ?
    `
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#5856d6" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
    </span>
    Add Sorter
    ` :
    `
    <span>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"><path fill="#5856d6" d="M352 128C352 110.3 337.7 96 320 96C302.3 96 288 110.3 288 128L288 288L128 288C110.3 288 96 302.3 96 320C96 337.7 110.3 352 128 352L288 352L288 512C288 529.7 302.3 544 320 544C337.7 544 352 529.7 352 512L352 352L512 352C529.7 352 544 337.7 544 320C544 302.3 529.7 288 512 288L352 288L352 128z"/></svg>
    </span>
    </span>
    Add Filter
    `
    ;
    document.querySelector(".sf-reset").innerHTML = choice === "sort" ? "Reset Sorting" : "Reset Filter";
    document.querySelector(".sf-submit").innerHTML = "Submit";

    document.querySelector(".sf-submit").addEventListener("click", () => 
    {
        if (currentPage === "table-render")
        {
            let result =  choice === "sort" ? applySorts(jsRenderTable) : applyFilters(jsRenderTable);
            renderTable(dynamicTableCols, result);
        }
        else
        {
            let result =  choice === "sort" ? applySorts() : applyFilters();
            const tableBody = document.querySelector(".ticket-list-body");
            tableBody.innerHTML = "";
            displayedCounter = 0;
            listTickets(result);
            dialog.close();
        }

    });

    document.querySelector(".sf-reset").addEventListener("click", () => 
    {
        document.querySelector(".filter-rows").innerHTML = "";
        document.querySelector(".sort-rows").innerHTML = "";
    });

    dialog.showModal()

    document.querySelector(".close-modal").addEventListener("click", () => 
    {
        dialogHeader.innerHTML = "";
        dialogContent.innerHTML = "";
        dialog.close();
    });
}