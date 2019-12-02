export interface User {
  firstName: string;
  middleName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  workStatus?: string;
  educationLevel: string;
  gender: string;
  birthDate: any;
  password: string;
  address?: object;
  cityId?: string;
  username?: string;
  facebook?: object;
  PO_Box?: string;
  previousCompetitions? : string,
  previousInnovations? : string,
  parentsOccupation? : string,
  supportNeeded? : string,
  financialKnowHow? : string,
  financialAccess? : string,
  languageOption? : string
}
