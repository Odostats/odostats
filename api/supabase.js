import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';

const SUPABASE_URL = 'https://zfoovkkujobyrtyhjnxd.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_thBaDy-exT4VjYEaRooIvA_If-AJvLv';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);