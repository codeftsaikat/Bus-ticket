fetch("./seat.json")
  .then((response) => response.json())
  .then((data) => {
    const seatGroups = data.seatGroups;
    const ticketGrid = document.getElementById("ticketGrid");

    seatGroups.forEach((group) => {
      const groupTitle = document.createElement("button");
      groupTitle.classList.add(
        "rounded-lg",
        "py-2",
        "text-center",
        "brightness-75"
      );
      groupTitle.textContent = group.group;
      ticketGrid.appendChild(groupTitle);

      const seats = group.seats;
      seats.forEach((seat) => {
        const button = document.createElement("button");
        button.classList.add(
          "bg-[#F7F8F880]",
          "rounded-lg",
          "py-2",
          "text-center",
          "brightness-75"
        );
        button.textContent = `${seat.title}`;
        button.onclick = function () {
          toggleTicket(this);
          selectedTicket(seat);
        };
        ticketGrid.appendChild(button);
      });
    });
  })
  .catch((error) => console.error("Error fetching JSON:", error));

document
  .getElementById("buy-ticket-Button")
  .addEventListener("click", function () {
    document
      .getElementById("ticket-Section")
      .scrollIntoView({ behavior: "smooth" });
  });

// let totalTicketsLeft = 40;
// let ticketSelected = [];

// function toggleButton() {
//   const submitButton = document.getElementById("submitButton");
//   const phoneNumberInput = document.getElementById("phoneNumberInput");

//   phoneNumberInput.addEventListener("input", toggleButton);
//   if (ticketSelected.length >= 1 && phoneNumberInput.value !== "") {
//     // Enable the button
//     submitButton.removeAttribute("disabled");
//   } else {
//     // Disable the button
//     submitButton.setAttribute("disabled", "true");
//   }
// }

// function selectedTicket(seat) {
//   const seatIndex = ticketSelected.findIndex(
//     (selectedSeat) => selectedSeat.title === seat.title
//   );
//   toggleButton();

//   if (seatIndex !== -1) {
//     console.log(seatIndex);
//     ticketSelected.splice(seatIndex, 1);
//   } else {
//     ticketSelected.push(seat);
//   }

//   const mainSeat = document.getElementById("mainSeat");
//   mainSeat.innerHTML = "";

//   let seatName = document.createElement("div");
//   let totalPrice = 0;

//   ticketSelected.forEach((ticket) => {
//     totalPrice += ticket.price;
//     let seatInfo = document.createElement("div");
//     seatInfo.classList.add("flex", "justify-between");

//     const text1 = document.createElement("p");
//     text1.classList.add("px-4", "py-2", "text-black");
//     text1.textContent = `${ticket.title}`;

//     const text2 = document.createElement("p");
//     text2.classList.add("px-4", "py-2", "text-black");
//     text2.textContent = "Economy";

//     const text3 = document.createElement("p");
//     text3.classList.add("px-4", "py-2", "text-black");
//     text3.textContent = `${ticket.price}`;

//     seatInfo.appendChild(text1);
//     seatInfo.appendChild(text2);
//     seatInfo.appendChild(text3);

//     seatName.appendChild(seatInfo);
//   });

//   const totalCountedPrice = document.getElementById("totalPriceCounted");
//   const grandPriceCounted = document.getElementById("grandPriceCounted");
//   totalCountedPrice.innerText = `BDT ${totalPrice}`;
//   grandPriceCounted.innerText = `BDT ${totalPrice}`;
//   // Append seatName to mainSeat
//   mainSeat.appendChild(seatName);

//   const selectedSeat = document.getElementById("selectedSeat");
//   selectedSeat.innerText = ticketSelected.length;
// }

let totalTicketsLeft = 40;
let ticketSelected = [];

// Get references to the input fields and submit button
const submitButton = document.getElementById("submitButton");
const phoneNumberInput = document.getElementById("phoneNumberInput");

// Add event listener to the phone number input
phoneNumberInput.addEventListener("input", toggleButton);

function toggleButton() {
  if (ticketSelected.length >= 1 && phoneNumberInput.value.trim() !== "") {
    // Enable the button
    submitButton.removeAttribute("disabled");
  } else {
    // Disable the button
    submitButton.setAttribute("disabled", "true");
  }
}

function selectedTicket(seat) {
  const seatIndex = ticketSelected.findIndex(
    (selectedSeat) => selectedSeat.title === seat.title
  );

  if (seatIndex !== -1) {
    console.log(seatIndex);
    ticketSelected.splice(seatIndex, 1);
  } else {
    ticketSelected.push(seat);
  }

  // Call toggleButton to update the button state
  toggleButton();

  const mainSeat = document.getElementById("mainSeat");
  mainSeat.innerHTML = "";

  let seatName = document.createElement("div");
  let totalPrice = 0;

  ticketSelected.forEach((ticket) => {
    totalPrice += ticket.price;
    let seatInfo = document.createElement("div");
    seatInfo.classList.add("flex", "justify-between");

    const text1 = document.createElement("p");
    text1.classList.add("px-4", "py-2", "text-black");
    text1.textContent = `${ticket.title}`;

    const text2 = document.createElement("p");
    text2.classList.add("px-4", "py-2", "text-black");
    text2.textContent = "Economy";

    const text3 = document.createElement("p");
    text3.classList.add("px-4", "py-2", "text-black");
    text3.textContent = `${ticket.price}`;

    seatInfo.appendChild(text1);
    seatInfo.appendChild(text2);
    seatInfo.appendChild(text3);

    seatName.appendChild(seatInfo);
  });

  const totalCountedPrice = document.getElementById("totalPriceCounted");
  const grandPriceCounted = document.getElementById("grandPriceCounted");
  totalCountedPrice.innerText = `BDT ${totalPrice}`;
  grandPriceCounted.innerText = `BDT ${totalPrice}`;
  // Append seatName to mainSeat
  mainSeat.appendChild(seatName);

  const selectedSeat = document.getElementById("selectedSeat");
  selectedSeat.innerText = ticketSelected.length;
}

function toggleTicket(button) {
  if (button.classList.contains("bg-green-300")) {
    button.classList.remove("bg-green-300");
    totalTicketsLeft++;
  } else {
    button.classList.add("bg-green-300");
    totalTicketsLeft--;
  }
  document.getElementById("totalTickets").textContent = totalTicketsLeft;
}
