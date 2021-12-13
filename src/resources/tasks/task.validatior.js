const errorHandlers = require("../../common/errorHandler");
const { getBodyData, extractFirstId } = require("../../utils/Utils");

const getValidatedData = async (req, res) => {
    const body = await getBodyData(req, res);
    const boardIdFromUrl = extractFirstId(req);

    const {
        title,
        order,
        description,
        userId,
        boardId: boardIdFromBody,
        columnId = null,
    } = body;

    if ([title, order, description, userId, boardIdFromBody, columnId].includes(undefined)) {
        errorHandlers.badRequest(res, { message: 'Please, specify required fields: title, order, description, userId, boardId, columnId,' });
        return null;
    }

    return {
        title,
        order,
        description,
        userId,
        boardId: boardIdFromBody || boardIdFromUrl,
        columnId,
    };
}

module.exports = {
    getValidatedData,
};