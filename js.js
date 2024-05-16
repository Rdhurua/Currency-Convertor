
const dropDowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const from = document.querySelector(".from select ");
const to = document.querySelector(".To select");
//  const msg=document.querySelector(".msg");



for (let select of dropDowns) {
  for (code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    select.append(newOption);
    if (code == "USD" && select.name == "From") {
      newOption.selected = "selected";
    }
    if (code == "INR" && select.name == "To") {
      newOption.selected = "selected";
    }

  }

  select.addEventListener("change", (evt) => {
    newFlag(evt.target);
  });
}

const newFlag = (element) => {
  let code = element.value;
  let country = countryList[code];
  let src = `https://flagsapi.com/${country}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = src;
}
  
  const updateExchange=async()=>{
    let amount = document.querySelector(".Amount  input");
    let amountVal = amount.value;
    if (amountVal == "" || amountVal < 1) {
      amountVal = 1;
      amount.value = "1";
    }
    // console.log(from.value, to.value);
  
    let Base_URL = `https://2024-03-06.currency-api.pages.dev/v1/currencies/${from.value.toLowerCase()}.json`;
    let response = await fetch(Base_URL); //fetching the url;
    let data = await response.json();
  
  
    // console.log(data[from.value.toLowerCase()]);
    // console.log(objfrom[to.value.toLowerCase()]);
    
    const objfrom = data[from.value.toLowerCase()];
    //showing the exchange
       let exchange=amountVal*objfrom[to.value.toLowerCase()];
       let para=document.querySelector(".msg p");
      para.innerText=`${amountVal} ${from.value} = ${exchange.toFixed()} ${to.value}`;
  
  }
  





btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
     updateExchange();

});
 window.addEventListener("hover",()=>{
   updateExchange();
 })