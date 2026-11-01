import { supabase } from './supabase';

export async function login(
  correo: string,
  password: string,
) {
  return supabase
    .from('usuario')
    .select('*')
    .eq('correo', correo)
    .eq('password', password)
    .eq('activo', true)
    .single();
}