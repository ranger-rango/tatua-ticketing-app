async function storeTicket()
{
    const form = document.getElementById("raise-ticket-form");
    const formData = new FormData(form);

    const submitTime = genDataTime();

    formData.append("created_at", submitTime);
    formData.append("ticket_id", genID());
    let formFiles = formData.getAll("file_attachment");

    let files = await Promise.all(
        formFiles.map(file => 
        {
            return new Promise((resolve, reject) => 
            {
                const reader = new FileReader();
                reader.onload = () => 
                {
                    resolve(
                        {
                            name: file.name,
                            type: file.type,
                            size: file.size,
                            data: reader.result
                        }
                    );
                };
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        })
    );

    formData.set("file_attachment", JSON.stringify(files));

    ticketData.push(Object.fromEntries(formData.entries()));

    if (sessionStorageState)
    {
        sessionStorage.setItem("sessionData", JSON.stringify(ticketData));
    }

    if (localStorageState)
    {
        let encTicketData = enc(JSON.stringify(ticketData));
        localStorage.setItem("localData", encTicketData);
        // localStorage.setItem("localData", JSON.stringify(encTicketData));
    }
}