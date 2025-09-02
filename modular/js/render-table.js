function renderTable(tableCols, tableData)
{
    const tHead = document.querySelector(".tbleHeaderCont");
    tHead.innerHTML = ``;
    const headerRow = document.createElement("tr");
    headerRow.className = "rowHeader";

    tableCols.forEach(col => 
    {

        if (!col.hide)
        {
            th = document.createElement("th");
            th.innerText = col.columnName;
            headerRow.appendChild(th);
        }
    });
    tHead.appendChild(headerRow);

    const tBody = document.querySelector(".tbleBodyCont");
    tBody.innerHTML = ``;
    tableData.forEach(row => 
    {
        const tableRow = document.createElement("tr");
        tableCols.forEach(col => 
        {
            if (!col.hide)
            {
                const dataHolder = document.createElement("td");
                if (typeof col.render === "function")
                {
                    dataHolder.innerText = col.render(row);
                }
                else
                {
                    dataHolder.innerText = row[col.columnName];
                }
                tableRow.appendChild(dataHolder);
            }
        });
        tBody.appendChild(tableRow);
    });
}

function fetchData(url)
{
    return fetch(url)
    .then(response => 
    {
        if (!response.ok)
        {
            throw new Error("HTTP Error: " + response.status);
        }
        return response.json();
    });
}

let totalCount = 0;
let jsRenderTable;
let dynamicTableCols;
async function main(pageSize = 5, currentPage = 0, filter = [], sort = [])
{
    const skip = currentPage * pageSize;
    // let orderUrl = `https://services.odata.org/v4/TripPinServiceRW/People?$orderby=LastName asc`;
    // let filterUrl = `https://services.odata.org/v4/TripPinServiceRW/People?$filter=FirstName eq 'Russell'`;
    let siteUrl = `https://services.odata.org/v4/TripPinServiceRW/People?$count=true&$top=${pageSize}&$skip=${skip}${filter.length === 2 ? `&$filter=${filter[0]} eq '${filter[1]}'` : ""}${sort.length === 2 ? `&$orderby=${sort[0]} ${sort[1]}` : ""}`;
    
    const data = await fetchData(siteUrl);
    console.log(data);
    dynamicTableCols = [
        {
            "id" : 'user_name',
            "columnName" : "UserName",
            "hide" : false,
            render : false
        },
        {
            "id" : 'first_name',
            "columnName" : "FirstName",
            "hide" : false,
            render : false
        },
        {
            "id" : 'last_name',
            "columnName" : "LastName",
            "hide" : false,
            render : false
        },
        {
            "id" : 'middle_name',
            "columnName" : "FullName",
            "hide" : false,
            render : (row) => 
            {
                return row.FirstName + " " + row.LastName;
            }
        },
        {
            "id" : 'gender',
            "columnName" : "Gender",
            "hide" : false,
            render : false
        },
        {
            "id" : 'age',
            "columnName" : "Age",
            "hide" : false,
            render : false
        }
    ];

    jsRenderTable = data.value;
    renderTable(dynamicTableCols, jsRenderTable);
}

let currPage = 0;
let pageSize = 5;
let currentFilter = [];
let currentSort = [];
document.addEventListener("DOMContentLoaded", () => 
{
    document.getElementById("nextBtn").addEventListener("click", () => 
    {
        if (currPage < Math.ceil(20 / pageSize) - 1)
        {
            currPage++;
            main(pageSize, currPage, currentFilter, currentSort);
            document.getElementById("pageInfo").innerText = `Page ${currPage + 1} of ${Math.ceil(20 / pageSize)}`;
        }
        if (currPage === Math.ceil(20 / pageSize) - 1)
        {
            document.getElementById("nextBtn").style.backgroundColor = '#9e9898';
        }
        else
        {
            document.getElementById("prevBtn").style.backgroundColor = '#65558f';
            document.getElementById("nextBtn").style.backgroundColor = '#65558f';
        }
    });

    document.getElementById("prevBtn").addEventListener("click", () => 
    {
        if (currPage > 0) {
            currPage--;
            main(pageSize, currPage, currentFilter, currentSort);
            document.getElementById("pageInfo").innerText = `Page ${currPage + 1} of ${Math.ceil(20 / pageSize)}`;
        }
        if (currPage === 0)
        {
            document.getElementById("prevBtn").style.backgroundColor = '#9e9898';
        }
        else
        {
            document.getElementById("prevBtn").style.backgroundColor = '#65558f';
            document.getElementById("nextBtn").style.backgroundColor = '#65558f';

        }
    });

    document.addEventListener("submit", (e) => 
    {
        if (e.target && e.target.id === "filterSortForm")
        {
            e.preventDefault();

            const form = e.target;
            const filterField = form.querySelector("#filterField").value;
            const filterValue = form.querySelector("#filterValue").value.trim();
            const sortField = form.querySelector("#sortField").value;
            const sortDir = form.querySelector("#sortDir").value;

            currentFilter = filterField && filterValue ? [filterField, filterValue] : [];
            currentSort = sortField ? [sortField, sortDir] : [];

            currPage = 0;
            if (currPage === 0)
            {
                document.getElementById("prevBtn").style.backgroundColor = '#9e9898';
            }

            main(pageSize, currPage, currentFilter, currentSort);
            document.getElementById("pageInfo").innerText = `Page ${currPage + 1} of ${Math.ceil(20 / pageSize)}`;
        }
    });

    
    if (currPage === 0)
    {
        document.getElementById("prevBtn").style.backgroundColor = '#9e9898';
    }

    main(pageSize, currPage, currentFilter, currentSort);
    document.getElementById("pageInfo").innerText = `Page ${currPage + 1} of ${Math.ceil(20 / pageSize)}`;
});