const { generateToken, getHashedPassword, comparePassword } = require("../utils/helper");
const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = {

    getUserByEmail: async (email) => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('id')
                .eq('email', email)

            if (error) {
                throw new Error(error.message);
            }

            if (data.length === 0) {
                return false;
            }

            return data[0];

        } catch (error) {
            console.error('Error getting user:', error);
            throw error;
        }
    },
    createUser: async (inputData) => {
        try {
            const { email, password, name, permission_level } = inputData;

            // Hash the password
            const hashedPassword = await getHashedPassword(password);

            // Create the user
            const { data: newUser, error: errorValue } = await supabase
                .from('users')
                .upsert([{ email, password: hashedPassword, name, permission_level }])
                .then(({ data, error }) => {
                    if (error) {
                        throw error;
                    }
                    return { data: data?.[0], error: null };
                });

            if (errorValue) {
                throw errorValue;
            }

            return { message: "User created successfully" }





        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    loginUser: async (inputData) => {
        try {
            const { email, password } = inputData;

            // Check if the user exists
            const { data: user, error } = await supabase
                .from('users')
                .select('*')
                .eq('email', email)

            if (error) {
                throw new Error(error.message);
            }

            if (user.length === 0) {
                return false;
            }

            if (!user) {
                throw new Error('User not found');
            }
            console.log("user", user)
            // Check if the password is correct
            const isPasswordCorrect = await comparePassword(password, user[0].password);

            if (!isPasswordCorrect) {
                throw new Error('Invalid credentials');
            }

            // Generate a token
            const token = generateToken({ id: user[0].id, userType: user[0].permission_level });

            // Omit password from response
            delete user[0].password;

            return { token, data: user[0] };

        } catch (error) {
            console.error('Error logging in user:', error);
            throw error;
        }
    },




};


