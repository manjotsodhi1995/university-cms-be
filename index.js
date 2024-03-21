const express = require('express');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
const cors = require('cors');
const v1Routes = require('./routes/v1/index.js')


const app = express();
app.use(express.json());
app.use(cors());
app.options('*', cors());




// routes
app.use('/v1', v1Routes);







const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
