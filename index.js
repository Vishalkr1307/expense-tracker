const form = document.querySelector("form");
form.addEventListener("submit", handleSubmit);
const itemShow = document.getElementById("item-show");
let data = JSON.parse(localStorage.getItem("User")) || [];
function handleSubmit(e) {
  e.preventDefault();
  let price = form.elements[0].value;
  let description = form.elements[1].value;
  let category = form.elements[2].value;
  let obj = {
    price,
    description,
    category,
  };
  data.push(obj);
  localStorage.setItem("User", JSON.stringify(data));
  isDisplay();
}
function isDisplay() {
  itemShow.innerHTML = "";
  if (data.length > 0) {
    data.map((item, ind) => {
      let div = document.createElement("div");

      let price = document.createElement("span");
      price.innerText = item?.price;
      let description = document.createElement("span");
      description.innerText = item?.description;
      let category = document.createElement("span");
      category.innerText = item?.category;
      let deleteButton = document.createElement("button");
      deleteButton.innerText = "Delete -item";
      deleteButton.addEventListener("click", function () {
        console.log("here");
        data.splice(ind, 1);
        localStorage.setItem("User", JSON.stringify(data));
        window.location.reload();
      });
      let editButton = document.createElement("button");
      editButton.innerText = "Edit -item";
      editButton.className = "btn btn-primary";
      editButton.addEventListener("click", function () {
        form.elements[0].value = item.price;
        form.elements[1].value = item.description;
        form.elements[2].value = item.category;
        form.removeEventListener("submit", handleSubmit);
        form.addEventListener("submit", function (e) {
          e.preventDefault();
          let obj={
            price : form.elements[0].value,
            description :form.elements[1].value,
            category :form.elements[2].value,
  

          }
          

          data.splice(ind,1,obj)
          
          localStorage.setItem("User", JSON.stringify(data));
          
          isDisplay();
        });
      });
      deleteButton.className = "btn btn-danger";
      div.style.display = "flex";
      div.style.justifyContent = "space-around";
      div.style.marginBottom = "10px";

      div.append(price, description, category, deleteButton, editButton);
      itemShow.appendChild(div);
    });
  }
}
isDisplay();
console.log(data)
