import type { PersonData } from "../types";

export const createPerson = async (person:PersonData) => {
  
  const response = await fetch('/api/personas', {
    method: 'POST',
    body: JSON.stringify(person),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if(response.status === 409) return {message:"duplicate",status:409}
  if(response.status === 500) return {message:"duplicate",status:500}
  return response.json()
}

export const checkPerson = async (dni:string) => {
  
    const response = await fetch('/api/personas?dni='+dni);
    if(response.status === 404) return {message:"not found",status:404}
    return response.json()
  }