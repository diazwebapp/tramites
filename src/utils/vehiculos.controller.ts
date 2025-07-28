import type { VehicleData } from "../types";

export const createVehicle = async (vehicle:VehicleData) => {
  
  const response = await fetch('/api/vehiculos', {
    method: 'POST',
    body: JSON.stringify(vehicle),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if(response.status === 409){
    const {vehiculo} = await response.json()
    return {message:"duplicate",status:409, vehiculo}
  }
  if(response.status === 500) return {message:"duplicate",status:500}
  return response.json()
}
