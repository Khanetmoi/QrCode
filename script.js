const form = document.getElementById("generate-form");
const qr = document.getElementById("qrcode");
const logo = document.getElementById("logo")
const downloadB = document.getElementById("download")
const table = document.getElementById("table");



let fetchedData = [];


const getData = async ()=>{
  const response = await fetch("https://app.sipconsult.net/api/api/tables");
   const data = await response.json();
   const  value = data.data;
   console.log(value)
   value.forEach((item)=>{
    let option = document.createElement("option");
       option.innerHTML = item.name;
       option.id = item.externalId;
       table.appendChild(option);
  })
}

getData();
  
  // .then(response => {
  //   if (!response.ok) {
  //     throw new Error("Network response was not OK");
  //   }
  //   return response.json();
  // })
  // .then(Data => {
  //  // console.log(data.data)
  //  Data.data.forEach((item)=>{
  //   console.log(item.tableCode)
  //    let option = document.createElement("option");
  //    option.innerHTML = item.name;
  //    option.id = item.tableCode;
  //    table.appendChild(option);

  //    console.log(option.value)
  //  })
   
  // })
  // .catch(error => {
  //   // Handle any errors that occurred during the request
  //   console.error(error);
  // });
 

 

// Button submit
const onGenerateSubmit = (e) => {
  e.preventDefault();

  clearUI();
  
  const size = document.getElementById("size").value;
  
  let op = table.options[table.selectedIndex].id;
  let url = 'https://app.sipconsult.net/frankies/?param1='+op;
  // Validate url
  if (url === "") {
    alert("Please enter a URL");
  } else {
    showSpinner();
    // Show spinner for 1 sec
    setTimeout(() => {
      hideSpinner();
      generateQRCode(url, size);
      showScanner();
      // Generate the save button after the qr code image src is ready
      setTimeout(() => {
        // Get save url
        const saveUrl = qr.querySelector("canvas").toDataURL();
        // Create save button
        createSaveBtn(saveUrl);
      }, 50);
    }, 10);
    logo.style.display = "block";
    downloadB.style.display = "block";
  }
};

// Generate QR code
const generateQRCode = (url, size) => {
  const qrcode = new QRCode("qrcode", {
    text: url,
    width: size,
    height: size,
    colorDark : "#0C5FA8",
	  colorLight : "#f1f1f1",
    correctLevel : QRCode.CorrectLevel.H
  });
};

// Clear QR code and save button
const clearUI = () => {
  qr.innerHTML = "";
  const saveBtn = document.getElementById("save-link");
  if (saveBtn) {
    saveBtn.remove();
  }
};

// hide  scanner
const showScanner = () => {
  const scanner = document.getElementById("qrCodeContainer");
  scanner.style.display = "block";
};

// Show spinner
const showSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "block";
};

// Hide spinner
const hideSpinner = () => {
  const spinner = document.getElementById("spinner");
  spinner.style.display = "none";
};

// Create save button to download QR code as image
const createSaveBtn = (saveUrl) => {
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.innerHTML = "Save Image";

  link.href = saveUrl;
  link.download = "qrcode.png";

  document.getElementById("generated").appendChild(link);
};

hideSpinner();

form.addEventListener("submit", onGenerateSubmit);
downloadB.addEventListener("click", ()=>{
  const link = document.createElement("a");
  link.id = "save-link";
  link.classList =
    'bg-red-500 hover:bg-red-700 text-white font-bold py-2 rounded w-1/3 m-auto my-5';
  link.innerHTML = "Save Image";

  link.href = qr.querySelector("canvas").toDataURL();
  link.download = "qrcode.png";

  document.getElementById("generated").appendChild(link);
});
