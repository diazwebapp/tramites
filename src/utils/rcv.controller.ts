
type Params = {
  personDNI:string
  placaVehiculo:string
}
export const createRcv = async (params:Params) => {
  
  const response = await fetch('/api/rcv', {
    method: 'POST',
    body: JSON.stringify(params),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if(response.status === 409) return {message:"duplicate",status:409}
  return response.json()
}

export const checkRcv = async (numero:number) => {
  
    const response = await fetch('/api/rcv?contrato='+numero);
    return response.json()
  }