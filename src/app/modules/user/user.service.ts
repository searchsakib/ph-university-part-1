import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  // create a user object
  const userData: Partial<TUser> = {};

  //if password is not given , use deafult password
  userData.password = password || (config.default_password as string);

  //set student role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  // for admissionSemester type error, I had to write this
  if (!admissionSemester) {
    throw new AppError(httpStatus.NOT_FOUND, 'Admission Semester not found');
  }

  //! strating isolating rollback session
  const session = await mongoose.startSession();

  try {
    //! starting transaction
    session.startTransaction();
    //set auto generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user
    const newUser = await User.create([userData], { session }); //! adding data as array , adding session

    //create a student
    if (newUser.length) {
      // set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id

      const newStudent = await Student.create([payload], { session });

      //! if student is not created
      if (!newStudent.length) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
      }

      //! committing successfull transaction & ending session
      await session.commitTransaction();
      await session.endSession();

      return newStudent;
    }
  } catch (err: any) {
    //! if any error occurs, aborting transaction & ending session
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const UserServices = {
  createStudentIntoDB,
};
