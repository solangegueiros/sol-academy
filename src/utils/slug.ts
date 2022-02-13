import { glob } from 'glob';
import path from 'path';

export const POSTS_PATH = path.join(process.cwd(), 'content/classes');

// postFilePaths is the list of all mdx files inside the POSTS_PATH directory
export const postFilePaths = () =>
  glob.sync('**/*en.{md,mdx}', { cwd: POSTS_PATH });

export const normalizeUrl = (url: any) => {
  // Remove duplicate slashes
  url = url.replace(/\/{2,}/g, '/');

  if (!url.match(/^https?:\/\//)) {
    url = url.replace(/^(https?:\/)(.+)/, '$1/$2');
  }
  return url;
};
