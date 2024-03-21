const express = require('express');
const { createUniversity, getallUniversity, updateUniversity, deleteUniversity, getauditLogs } = require('../../controllers/university.controller');
const { authorize } = require('../../middlewares/authorization');
const { authenticate } = require('../../middlewares/authentication');
const { auditMiddleware } = require('../../middlewares/audit')

const universityRouter = express.Router();

universityRouter.post("/", authenticate, authorize(['NORMAL', 'ADMIN']), auditMiddleware, createUniversity);
universityRouter.get("/", authenticate, authorize(['NORMAL', 'ADMIN']), auditMiddleware, getallUniversity);
universityRouter.put("/:id", authenticate, authorize(['NORMAL', 'ADMIN']), auditMiddleware, updateUniversity);
universityRouter.delete("/:id", authenticate, authorize(['NORMAL', 'ADMIN']), auditMiddleware, deleteUniversity);
universityRouter.get("/audit", authenticate, authorize(['ADMIN']), getauditLogs);
module.exports = universityRouter;


