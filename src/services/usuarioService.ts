import { supabase } from './supabase';

export async function obtenerUsuarioPorQr(
  codigoQr: string,
) {
  return supabase
    .from('usuario')
    .select('*')
    .eq('codigo_qr', codigoQr)
    .eq('activo', true)
    .single();
}