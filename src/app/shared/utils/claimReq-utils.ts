import { USER_GENDERS, USER_ROLES } from '../constants/constants';

export const claimReqUtils = {
  adminOnly: (claim: any) => claim.Role === USER_ROLES.ADMIN,

  adminAndTeacher: (claim: any) =>
    claim.Role === USER_ROLES.ADMIN || claim.Role === USER_ROLES.TEACHER,

  genderFemaleAgeUnderTen: (claim: any) =>
    parseInt(claim.Age) < 10 && claim.Gender === USER_GENDERS.FEMALE,

  maternityLeaveApplicable: (claim: any) =>
    claim.Role === USER_ROLES.TEACHER && claim.Gender === USER_GENDERS.FEMALE,

  libraryMembersOnly: (claim: any) =>
    claim.LibraryId !== null ||
    claim.LibraryId !== undefined ||
    claim.LibraryId !== '',

  studentOnly: (claim: any) => claim.Role === USER_ROLES.STUDENT,

  teacherOnly: (claim: any) => claim.Role === USER_ROLES.TEACHER,
};
