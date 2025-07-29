// backend/supabaseClient.js
const {
  createClient,
} = require("@supabase/supabase-js");

const supabaseUrl = "https://ljgvkuyfkugbjkb"; //REEMPLAZARRRR
const supabaseKey = "hcchchgvcjhcgcjhv"; //REEMPLAZARRR

const supabase = createClient(
  supabaseUrl,
  supabaseKey
);

module.exports = supabase;
