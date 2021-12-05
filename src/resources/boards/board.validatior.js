const errorHandlers = require("../../common/errorHandler");
const { getBodyData } = require("../../utils/Utils");
const Column = require("../columns/column.model");

const getValidatedData = async (req, res) => {
    const body = await getBodyData(req, res);
    const { title, columns } = body;

    if (!title || !columns || (columns && !columns.length)) {
        errorHandlers.badRequest(res, { message: 'Please, specify required fields: title, columns' });
        return null;
    }

    const validatedColumns = [];

    for (let i = 0; i < columns.length; i += 1) {
        const column = columns[i];

        const { title: columnTitle, order } = column;

        if ([columnTitle, order].includes(undefined)) {
            errorHandlers.badRequest(res, { message: 'Each column must contain title and order' });
            return null;
        }

        const validatedColumn = new Column({ title: columnTitle, order })
        validatedColumns.push(validatedColumn);
    }

    return {
        title,
        columns: validatedColumns,
    };
}

module.exports = {
    getValidatedData,
};