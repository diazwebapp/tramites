// Función auxiliar para formatear fechas en dd/mm/yyyy
export const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };
export const formatDateUTC = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = date.getFullYear();
    return `${year}/${month}/${day}`;
  };

  // Función para formatear fecha a UTC (para evitar problemas de zona horaria)
function toUTC(date: Date) {
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
}

export function calcularDiasRestantes(fechaInicioStr:string, fechaCaducidadStr:string) {
  // Convertir fechas en formato "dd/mm/yyyy" a objetos Date
  const [anioInicio, mesInicio, diaInicio] = fechaInicioStr.split('-').map(Number);
  const [anioCad, mesCad, diaCad] = fechaCaducidadStr.split('-').map(Number);
  const inicio = new Date(anioInicio, mesInicio - 1 , diaInicio);
  const caducidad = new Date(anioCad, mesCad - 1, diaCad);
  const hoy = new Date();
 
  // Normalizar a UTC
  const inicioUTC:any = toUTC(inicio);
  const caducidadUTC:any = toUTC(caducidad);
  const hoyUTC:any = toUTC(hoy);
  
  // Calcular diferencia
  const diffMs = caducidadUTC - hoyUTC;
  return Math.floor(diffMs / 86400000);
}
