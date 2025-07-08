"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserInfo = void 0;
const prisma_1 = require("../config/prisma");
const getUserInfo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req === null || req === void 0 ? void 0 : req.userId;
        if (!userId) {
            res.status(401).json({ message: "Unauthorized", success: false });
        }
        const user = yield prisma_1.prisma.user.findUnique({
            where: { id: userId },
            select: { id: true, username: true },
        });
        if (!user) {
            res.status(401).json({ message: "User not found", success: false });
        }
        res
            .status(200)
            .json({
            message: "Authenticated",
            isAuthenticated: true,
            user,
            success: true,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching user", success: false });
    }
});
exports.getUserInfo = getUserInfo;
