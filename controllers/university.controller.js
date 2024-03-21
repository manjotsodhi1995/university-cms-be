const httpStatus = require('http-status');
const { respondWithJson } = require("../utils/helper");
const { create, getall, updateUniversity, deleteUniversity, getAuditLogs } = require('../services/university.service');


module.exports = {


    createUniversity: async (req, res) => {
        try {


            // Check if the user exists
            const data = await create(req.body);

            if (!data) {
                return respondWithJson(res, httpStatus.NOT_FOUND, { error: 'university not created' });
            }
            // Send the response
            return respondWithJson(res, httpStatus.OK, { data });

        } catch (error) {
            console.log('error', error?.message);
            respondWithJson(res, httpStatus.BAD_REQUEST, { message: "Internal Server Error", error: error?.message })
        }
    }
    ,
    getallUniversity: async (req, res) => {
        try {
            const data = await getall();

            if (!data) {
                return respondWithJson(res, httpStatus.NOT_FOUND, { error: 'university not found' });
            }
            // Send the response
            return respondWithJson(res, httpStatus.OK, { data });

        } catch (error) {
            console.log('error', error?.message);
            respondWithJson(res, httpStatus.BAD_REQUEST, { message: "Internal Server Error", error: error?.message })
        }
    },
    updateUniversity: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await updateUniversity(id, req.body);

            if (!data) {
                return respondWithJson(res, httpStatus.NOT_FOUND, { error: 'university not created' });
            }
            // Send the response
            return respondWithJson(res, httpStatus.OK, { data });

        } catch (error) {
            console.log('error', error?.message);
            respondWithJson(res, httpStatus.BAD_REQUEST, { message: "Internal Server Error", error: error?.message })
        }
    },
    deleteUniversity: async (req, res) => {
        try {
            const id = req.params.id;
            const data = await deleteUniversity(id);

            if (!data) {
                return respondWithJson(res, httpStatus.NOT_FOUND, { error: 'university not created' });
            }
            // Send the response
            return respondWithJson(res, httpStatus.OK, { data });
        } catch (error) {
            console.log('error', error?.message);
            respondWithJson(res, httpStatus.BAD_REQUEST, { message: "Internal Server Error", error: error?.message })
        }
    },

    getauditLogs: async (req, res) => {
        try {
            const data = await getAuditLogs();

            if (!data) {
                return respondWithJson(res, httpStatus.NOT_FOUND, { error: 'audit log not found' });
            }
            // Send the response
            return respondWithJson(res, httpStatus.OK, { data });

        } catch (error) {
            console.log('error', error?.message);
            respondWithJson(res, httpStatus.BAD_REQUEST, { message: "Internal Server Error", error: error?.message })
        }
    },
};

