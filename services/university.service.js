const { createClient } = require('@supabase/supabase-js');
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
module.exports = {


    create: async (inputData) => {
        const { university, locations, contactInformation } = inputData;

        try {
            // Upsert university
            const { data: universityData, error: universityError } = await supabase
                .from('universities')
                .upsert([university]).select('id');

            if (universityError) throw universityError;

            if (!universityData || universityData.length === 0) {
                throw new Error("University data not found or empty");
            }

            // Get university ID
            const universityId = universityData[0].id;

            // Upsert locations
            const { data: locationsData, error: locationsError } = await supabase
                .from('locations')
                .upsert(locations.map(location => ({ ...location, university_id: universityId })));

            if (locationsError) throw locationsError;

            // Upsert contact information
            const { data: contactInfoData, error: contactInfoError } = await supabase
                .from('contact_information')
                .upsert(contactInformation.map(info => ({ ...info, university_id: universityId })));

            if (contactInfoError) throw contactInfoError;

            return ({ message: 'University inserted successfully' });
        } catch (error) {
            return ({ error: error.message });
        }
    },
    getall: async () => {

        try {
            // Upsert university
            const { data: universityData, error: universityError } = await supabase
                .from('universities').select(`
                *,
                locations (
                    *
                ),
                contact_information (
                    *
                )
            `);

            if (universityError) throw universityError;

            if (!universityData || universityData.length === 0) {
                throw new Error("University data not found or empty");
            }

            let university = universityData.map(university => {
                const { locations, contact_information, id, name } = university
                return {
                    university: {
                        id, name
                    },
                    locations,
                    contactInformation: contact_information
                }
            })
            return university;
        } catch (error) {
            return ({ error: error.message });
        }
    },


    updateUniversity: async (universityId, updatedData) => {
        try {
            // Update university
            const { university: updatedUniversityData, locations: updatedLocations, contactInformation: updatedContactInfo } = updatedData
            console.log("updatedData", updatedUniversityData, updatedLocations, updatedContactInfo)
            const { data: updatedUniversity, error: universityError } = await supabase
                .from('universities')
                .update(updatedUniversityData)
                .eq('id', universityId);

            if (universityError) throw universityError;

            // Update locations
            const { data: updatedLocationsData, error: locationsError } = await supabase
                .from('locations')
                .upsert(updatedLocations.map(location => ({ ...location, university_id: universityId })));

            if (locationsError) throw locationsError;

            // Update contact information
            const { data: updatedContactInfoData, error: contactInfoError } = await supabase
                .from('contact_information')
                .upsert(updatedContactInfo.map(info => ({ ...info, university_id: universityId })));

            if (contactInfoError) throw contactInfoError;

            return ({ message: 'University updated successfully' });
        } catch (error) {
            return ({ error: error.message });
        }
    },

    deleteUniversity: async (universityId) => {
        try {
            // Delete related locations
            const { error: locationsError } = await supabase
                .from('locations')
                .delete()
                .eq('university_id', universityId);

            if (locationsError) throw locationsError;

            // Delete related contact information
            const { error: contactInfoError } = await supabase
                .from('contact_information')
                .delete()
                .eq('university_id', universityId);

            if (contactInfoError) throw contactInfoError;

            // Delete university
            const { data: deletedUniversity, error: universityError } = await supabase
                .from('universities')
                .delete()
                .eq('id', universityId);

            if (universityError) throw universityError;

            return ({ message: 'University deleted successfully' });
        } catch (error) {
            return ({ error: error.message });
        }
    },

    auditLog: async (userId, action, timestamp) => {
        try {

            const { error } = await supabase
                .from('audit')
                .insert([
                    { user_id: userId, action: action, timestamp: timestamp }
                ]);
            return ({ message: 'audit log added successfully' });
        } catch (error) {
            return ({ error: error.message });
        }
    },

    getAuditLogs: async () => {

        try {
            // Upsert university
            const { data: universityData, error: universityError } = await supabase
                .from('audit').select(`
                *,
                users (
                    name
                )
            `);

            if (universityError) throw universityError;

            if (!universityData || universityData.length === 0) {
                throw new Error("University data not found or empty");
            }


            return universityData;
        } catch (error) {
            return ({ error: error.message });
        }
    },



};


