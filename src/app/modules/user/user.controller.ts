import httpStatus from 'http-status';

import { RequestHandler } from 'express';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

// type CreateStudent = (
//   param1: Request,
//   param2: Response,
//   param3: NextFunction,
// ) => void;

const createStudent: RequestHandler = async (req, res, next) => {
  try {
    const { password, student: studentData } = req.body;

    // const zodParsedData = studentValidationSchema.parse(studentData);

    const result = await UserServices.createStudentIntoDB(
      password,
      studentData,
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Student is created succesfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const UserControllers = {
  createStudent,
};
