document.addEventListener("DOMContentLoaded", function (){
    console.log("he cargado el script")
   
    //Exportar pdf
    const btnExport = document.getElementById("exportarPDF")
    const element =document.getElementById("plantilla")
    if(btnExport && element){
        const placa = document.querySelector(".placa")
        const vence = document.querySelector(".fechaVencimiento")
        const ncontrato = document.querySelector(".contratoN")
        const cedulaCliente = document.querySelector(".tomadorDNI")
        const company = "Lider Proteccion - J295457000-6"
        let text = "Cedula:"+cedulaCliente.textContent+"/"+"RCV:"+ncontrato.textContent+"/"+"Vence: "+vence.textContent+"/"+"Placa: "+placa.textContent
       console.log(text)
        const qrOpt={
            text,
            width: 100,
            height: 100,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        }
        btnExport.addEventListener("click", async function(){
             await new QRCode("qr-1",qrOpt);
             await  new QRCode("qr-2",qrOpt);
             setTimeout(()=>window.print(),1000)
        })
    }
})
