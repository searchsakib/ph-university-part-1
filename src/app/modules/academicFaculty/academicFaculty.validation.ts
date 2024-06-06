import { z } from 'zod';

const createAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Faculty Must be a string',
  }),
});
const UpdateAcademicFacultyValidationSchema = z.object({
  name: z.string({
    invalid_type_error: 'Academic Faculty Must be a string',
  }),
});

export const AcademicFacultyValidation = {
  createAcademicFacultyValidationSchema,
  UpdateAcademicFacultyValidationSchema,
};
