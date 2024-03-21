
const { auditLog } = require("../services/university.service")
exports.auditMiddleware = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        let action = `${req.method} ${req.baseUrl}`;
        const timestamp = new Date();
        switch (req.method) {
            case 'GET':
                if (req.baseUrl === '/v1/university') {
                    action = 'Fetch data of all universities';
                }
                break;
            case 'PUT':
                if (req.baseUrl.startsWith('/v1/university/')) {
                    const universityName = req.body.university.name;
                    action = `Update data of university with name: ${universityName}`;
                }
                break;
            case 'DELETE':
                if (req.baseUrl.startsWith('/v1/university/')) {
                    const universityId = req.params.id;
                    action = `Delete university with ID: ${universityId}`;
                }
                break;
            default:
                break;
        }
        await auditLog(userId, action, timestamp);

    } catch (error) {
        console.error('Error in audit logging middleware:', error);
    }

    next();
}

