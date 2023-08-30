import { mixed, object } from 'yup';

const MAX_FILE_SIZE = 2000000;

const validFileExtensions: any = { image: ['jpg', 'png', 'jpeg'], doc: ['doc', 'docx', 'pdf'] };

function isValidFileType(fileName: any, fileType: any) {
  return fileName && validFileExtensions[fileType].indexOf(fileName.split('.').pop()) > -1;
}

let submitLogic = {
  photo: mixed<FileList>()
    .test("is-valid-type", "Photo Allowed: jpg, jpeg, png",
      (value: any) => isValidFileType(value && value.name.toLowerCase(), "image")
    )
    .test("is-valid-size", "Photo allowed file size max: 2048KB",
      (value: any) => value && value.size <= MAX_FILE_SIZE)

};



export const photoSchema = object().shape(submitLogic);

