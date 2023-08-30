import fsPromises from 'fs/promises';
import path from 'path';

import { callApi } from '@/services/Axios';

const configHandler = async () => {
  const { data, success, message } = await callApi(
    '/app/configurations',
    'get',
  );

  if (success) {
    // console.log('data', data);
    const dataFilePath = path.join(process.cwd(), 'src/config/settings.json');
    let settings = JSON.stringify(data, null, 4);
    await fsPromises.writeFile(dataFilePath, settings);
  } else {
    console.error('Error', message);
  }
};

export const checkConfig = async () => {
  const dataFilePath = path.join(process.cwd(), 'src/config/settings.json');
  try {
    await fsPromises.access(dataFilePath);
    //console.log('Config file exists');
  } catch (error) {
    //console.log('Config file does not exist');
    await configHandler();
  }
};

export default configHandler;
