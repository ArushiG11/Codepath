import {createClient} from '@supabase/supabase-js';

const supabaseUrl = 'https://acjformwnyjpyukvhynz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFjamZvcm13bnlqcHl1a3ZoeW56Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUwMzM2NjQsImV4cCI6MjA2MDYwOTY2NH0.I_kwy_jAIOtaii4kJoYAihmJV98630XqeEUyPlqwSPw';
export const supbase = createClient(supabaseUrl, supabaseAnonKey);
  