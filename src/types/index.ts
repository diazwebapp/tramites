export interface ContratoData {
  numero_contrato?: number
  desde: Date
  hasta: Date
  numero_recibo?:number
  placa_vehiculo: string
  contractor_dni:string
}

export interface PersonData{
  contractor_dni : string
  contractor_direccion:string
  contractor_nombre: string
  contractor_telefono:string
}
export interface VehicleData{
    marca: string
    modelo: string
    clase:string
    anio:string
    color:string
    tipo:string
    uso:string
    placa: string;
    carroceria:string
    motor:string
    puestos_tonelaje:string
}