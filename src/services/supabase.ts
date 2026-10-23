import { createClient } from '@supabase/supabase-js';

const supabaseUrl =
  'https://sxotcqgtomxlitjcuwff.supabase.co';

const supabaseKey =
  'sb_publishable_W4j31P4JY9mwkXhkzik_NA_4NfSvkHQ';

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

console.log('SUPABASE CLIENT:', supabase);