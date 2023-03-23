import axios from 'axios';

import { FileUploadResponse } from '../types';

export class ApiService {
  protected readonly axios = axios.create({
    baseURL: import.meta.env.DEV ? '/api' : '', // redirect to proxy in development mode
  });

  uploadFile(file: File) {
    const data = new FormData();
    data.append('file', file);

    console.log(import.meta.env.DEV);

    return this.axios
      .post<FileUploadResponse>('/uploading', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((res) => res.data);
  }
}
