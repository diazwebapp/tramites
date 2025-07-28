import fs from 'fs/promises';
import path from 'path';
import type { ContratoData, PersonData, VehicleData } from '../types';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.SUPABASE_URL; 
const supabaseKey = import.meta.env.SUPABASE_SECRECT_KEY; 
const cedula_app_id = import.meta.env.API_CEDULA_ID
const cedula_app_url = import.meta.env.API_CEDULA_TOKEN
export const get_person_api = async(cedula:number)=>{
  const url = `https://api.cedula.com.ve/api/v1?app_id=${cedula_app_id}&token=${cedula_app_url}&nacionalidad=va&cedula=${cedula}`
  const request = await fetch(url)
  return await request.json()
}
export const supabase = createClient(supabaseUrl, supabaseKey);

interface DataStore {
  personas: PersonData[]
  contratos: ContratoData[]
  vehiculos:VehicleData[]
  ncontratoBase:number
  nreciboBase:number
}

const DATA_STORE_PATH = path.join(process.cwd(), 'database.json');

export async function readDataStore(): Promise<DataStore> {
  try {
   
    const data = await fs.readFile(DATA_STORE_PATH, 'utf-8');
    return JSON.parse(data) as DataStore;
  } catch (error: any) {
    // If the file doesn't exist, create it with an empty array
    if (error.code === 'ENOENT') {
      const initialData: DataStore = { personas: [],contratos:[],ncontratoBase:700000002314, vehiculos:[], nreciboBase:700000007314 };
      await writeDataStore(initialData);
      return initialData;
    }
    throw error; // Re-throw other errors
  }
}

export async function writeDataStore(data: DataStore): Promise<void> {
  await fs.writeFile(DATA_STORE_PATH, JSON.stringify(data, null, 2));
}

export async function initDataStore(): Promise<void> {
    try {
      await fs.access(DATA_STORE_PATH);
    } catch {
      const initialData: DataStore = { personas: [], contratos:[],ncontratoBase:700000002314, vehiculos:[], nreciboBase:700000007314 };
      await fs.writeFile(DATA_STORE_PATH, JSON.stringify(initialData, null, 2));
    }
  }