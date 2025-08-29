function formValidation()
{
    document.querySelectorAll(".inp-val").forEach(inp=> 
    {
        const errMsg = inp.parentElement.querySelector(".input-err-msg");
        inp.addEventListener("blur", (event) => 
        {
            if(!event.currentTarget.value.trim())
            {
                event.currentTarget.style.border = ".1rem solid var(--bin)";
                errMsg.style.display = "flex";
            }
            else
            {
                event.currentTarget.style.border = ".1rem solid green";
                errMsg.style.display = "none";
            }
        })
    });

}