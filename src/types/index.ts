export interface ContratoData {
  numero_contrato: number
  Desde: string
  Hasta: string
  numero_recibo:number
  placaVehiculo: string
  personDNI:string
}

export interface PersonData{
  contractorDNI : string
  contractorDreccion:string
  contractorNombre: string
  contractorTelefono:string
}
export interface VehicleData{
    marca: string
    modelo: string
    version:string
    transmision:string
    anio:string
    color:string
    tipo:string
    uso:string
    placa: string;
    carroceria:string
    motor:string
    puestos_tonelaje:string
}