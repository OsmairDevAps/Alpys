import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://uvutqpeysuacszyrfkmk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InV2dXRxcGV5c3VhY3N6eXJma21rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYxODMyNjMsImV4cCI6MjA1MTc1OTI2M30.vdT5qEFgKaFWBCvIPG0aCzR95dXPPttprLfE3zKLl_I'
)
  