// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://vlyjkklvsgxpbeobeecs.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZseWpra2x2c2d4cGJlb2JlZWNzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY2NDU1NDAsImV4cCI6MjA2MjIyMTU0MH0.D8n3gnFUc7YYJ__BEf33qiybAA0krNmMYnxBRs8La3I";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);