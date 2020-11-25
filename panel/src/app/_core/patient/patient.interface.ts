export interface IPatient {
  _id: string;
  nik: string;
  name: string;
  photo: string;
  patientPhoto: File;
  phone: string;
  residence: string;
  address: string;
  status: string;
  gender: string;
  hasMudik: boolean;
  author: string;
  caseNumber: string;
  detail: string;
  createdAt: string;
  updatedAt: string;
  total?: number;
}