import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://yevuuqanacsldfqenfsz.supabase.co";
const supabaseKey = "sb_secret_7bgrTZbVPLCvnvjrta6iaw_Lr9ptrx_";
const cedula_app_id = "1192";
const cedula_app_url = "484aa56d4b8478445b1f8fdda1f67e02";
const get_person_api = async (cedula) => {
  const url = `https://api.cedula.com.ve/api/v1?app_id=${cedula_app_id}&token=${cedula_app_url}&nacionalidad=va&cedula=${cedula}`;
  const request = await fetch(url);
  return await request.json();
};
const supabase = createClient(supabaseUrl, supabaseKey);
path.join(process.cwd(), "database.json");

export { get_person_api as g, supabase as s };
