import { supabase } from './supabase';

export async function obtenerAsistenciaHoy(
  usuarioId: number,
  fecha: string,
) {
  return supabase
    .from('asistencia')
    .select('*')
    .eq('usuario_id', usuarioId)
    .eq('fecha', fecha)
    .maybeSingle();
}

export async function registrarEntrada(
  usuarioId: number,
  fecha: string,
  hora: string,
) {
  return supabase
    .from('asistencia')
    .insert({
      usuario_id: usuarioId,
      dispositivo_id: 1,
      fecha,
      hora_entrada: hora,
    });
}

export async function registrarSalida(
  asistenciaId: number,
  hora: string,
) {
  return supabase
    .from('asistencia')
    .update({
      hora_salida: hora,
    })
    .eq('id', asistenciaId);
}