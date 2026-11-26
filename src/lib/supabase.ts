/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 
  (import.meta.env as any).VITE_SUPABASE_URL || 
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_URL) || 
  'https://wvswfxiipcresycdhvtl.supabase.co';

const supabaseAnonKey = 
  (import.meta.env as any).VITE_SUPABASE_PUBLISHABLE_KEY || 
  (import.meta.env as any).VITE_SUPABASE_ANON_KEY ||
  (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY) || 
  'sb_publishable_JA1H9iqe31mvcumBJxWE-g_RJMkHW-g';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
