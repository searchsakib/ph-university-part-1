import { string, z } from 'zod';
import {
  AcademicSemesterCode,
  AcademicSemesterName,
  Months,
} from './academicSemester.constant';

const createAcademicSemesterValidationSchema = z.object({
  name: z.enum([...AcademicSemesterName] as [string, ...string[]]),
  code: z.enum([...AcademicSemesterCode] as [string, ...string[]]),
  year: z.date(),
  startMonth: z.enum([...Months] as [string, ...string[]]),
  endMonth: z.enum([...Months] as [string, ...string[]]),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterValidationSchema,
};
