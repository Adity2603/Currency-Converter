let dropdown = document.querySelectorAll(".flex-container select")
const BASE_URL ="https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";
let generate = document.querySelector("button")
let from = document.querySelector("#select-from")
let to = document.querySelector("#select-to") 


const updateFlag = (element)=>{

    let flags = element.value
    let country_flags = countryList[flags]
    let newsrc = `https://flagsapi.com/${country_flags}/flat/64.png`
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;

    

}

const Exchange = async () =>{
    let amount = document.querySelector(".amount input")
    let amount_value = amount.value
    if(amount_value === "" || amount_value < 1 )
    {
        amount_value = 1 ;
        amount.value = "1"
    }
    const URl =`${BASE_URL}/${from.value.toLowerCase()}/${to.value.toLowerCase()}.json`

    let response = await fetch(URl)
    let data = await response.json() ;
    let rate = data[to.value.toLowerCase()]

    let finalAmount = parseFloat((amount_value * rate).toFixed(3))
    let message = document.querySelector(".label-box")
    message.innerText = `${amount_value}   ${from.value}   =   ${finalAmount}  ${to.value}`


}

for(let select of dropdown)
{
    for(country_code in countryList)
    {
        let new_option = document.createElement("option")
        new_option.innerText = country_code
        new_option.value = country_code
        
        if(select.name==="from" && country_code === "USD"){
            new_option.selected = true;
        }
        else if(select.name === "to" && country_code === "INR"){
            new_option.selected = true;

        }

        select.append(new_option)
    }  


    select.addEventListener("change" , (evt) =>{
       updateFlag(evt.target)
    })
}

generate.addEventListener("click" , ()=>{
    Exchange()
})
window.addEventListener("load", () => {
    Exchange()
  });

