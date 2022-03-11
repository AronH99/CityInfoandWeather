const template = document.querySelector("[showinginfo]").innerHTML;
const template2 = document.querySelector("[showingtemperatures]").innerHTML;
const form = document.querySelector("form");
const input = document.querySelector(".input");
const input2 = document.querySelector(".input2");
const input3 = document.querySelector(".input3");
const info = document.querySelector(".columns-info");
const button1 = document.querySelector(".button");
const button2 = document.querySelector(".button2");

const main1 = async () => {
  form.onsubmit = async (event) => {
    event.preventDefault();
    const x = await axios(
      `http://api.zippopotam.us/${input2.value}/${input.value}`
    );
    const result = await x.data;
    //console.log(result);
    console.log(result.places);
    info.innerHTML = result.places
      .map((el) =>
        template
          .replaceAll("%test%", `${el?.longitude} lon`)
          .replaceAll("%test2%", `${el?.latitude} lat`)
          .replaceAll("%test3%", `${el?.["place name"]} (city)`)
          .replaceAll("%test4%", `${el?.state} (region)`)
      )
      .join("");
    input3.setAttribute("value", result.places[0]["place name"]);
    form.classList.add("loading");
    /*  input.value = "";
    input2.value2 = ""; */
  };
};

const main2 = async () => {
  form.onsubmit = async (event) => {
    event.preventDefault();
    const x = await axios(
      `https://weatherdbi.herokuapp.com/data/weather/${input3.value}`
    );
    //console.log(x);
    const result = await x?.data?.next_days;
    //console.log(result);
    info.insertAdjacentHTML(
      "afterend",
      result
        .filter((el, i) => i <= 4)
        .map((el) =>
          template2
            .replaceAll("%min%", `${el.day} ${el?.min_temp?.c} min`)
            .replaceAll("%max%", `${el?.max_temp?.c} max`)
        )
        .join("")
    );
  };
};

button1.addEventListener("click", main1);
button2.addEventListener("click", main2);
