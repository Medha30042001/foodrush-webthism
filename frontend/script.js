document.getElementById("orderForm").addEventListener("submit", async function(e){
  e.preventDefault();

  const data = {
    name: document.getElementById("name").value,
    phone: document.getElementById("phone").value,
    foodItem: document.getElementById("foodItem").value,
    address: document.getElementById("address").value
  };

    const res = await fetch("https://foodrush-webthism-production.up.railway.app/api/order", {    method:"POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(data)
  });

  const result = await res.json();

  document.getElementById("message").innerText = result.message;
});