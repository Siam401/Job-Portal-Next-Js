export const makeOptionArray = (
  objectArray: object[],
  value: string,
  title: string,
) => {
  let options = [];

  if (objectArray.length > 0) {
    for (let index = 0; index < objectArray.length; index++) {
      const element: any = objectArray[index];
      options.push({
        value: element[value],
        title: element[title],
      });
    }
  }
  return options;
};

export const parseDateObject = (value: string) => {
  const date = new Date(value);

  let year = date.getFullYear().toString();
  let month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;

  let day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;

  return {
    day: day,
    year: year,
    month: month,
  };
};

/**
 * Image converter
 *
 * @param dataurl
 * @param filename
 * @returns
 */
export function dataURLtoFile(dataurl: string, filename: string) {
  let arr: any = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  const file = new File([u8arr], filename, { type: mime });
  return file;
}

/**
 * Convert time difference to human readable format
 * @param timestamp
 * @returns
 */
export const humanizeTimestamp = (timestamp: number | string): string => {
  const now = new Date().getTime();
  const localOffset = new Date().getTimezoneOffset() * -1;
  const localHours = localOffset / 60;

  timestamp = typeof timestamp === 'string' ? Date.parse(timestamp) : timestamp;

  const diff =
    now + localOffset * 60 * 1000 - (timestamp + localHours * 60 * 60 * 1000);

  const minute = 60 * 1000;
  const hour = 60 * minute;
  const day = 24 * hour;
  const week = 7 * day;
  const month = 30 * day;
  const year = 365 * day;

  if (diff < minute) {
    return 'a few moments ago';
  } else if (diff < hour) {
    const minutes = Math.floor(diff / minute);
    return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  } else if (diff < day) {
    const hours = Math.floor(diff / hour);
    return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  } else if (diff < week) {
    const days = Math.floor(diff / day);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  } else if (diff < month) {
    const weeks = Math.floor(diff / week);
    return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  } else if (diff < year) {
    const months = Math.floor(diff / month);
    return `${months} month${months > 1 ? 's' : ''} ago`;
  } else {
    const years = Math.floor(diff / year);
    return `${years} year${years > 1 ? 's' : ''} ago`;
  }
};

/**
 * replace null with empty string from object
 *
 * @param object 
 * @returns object
 */
export function objectNullToString(object: any) {
  for (const key in object) {
    object[key] = object[key] ?? '';
  }
  return object;
}

/**
 * empty checking for veriables
 *
 * @param object 
 * @returns object
 */
export function checkEmpty(value: any) {
  if (value === null || value === undefined) {
    return true;
  }
  if (Array.isArray(value)) {
    if (value.length == 0) {
      return true;
    }
  }
  if (typeof value === 'object') {
    if (Object.keys(value).length === 0) {
      return true;
    }
  }
  return false;
}
