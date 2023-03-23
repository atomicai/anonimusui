import axios from 'axios';

import { DepersonalizationResult, FileUploadResponse, SendParamsResponse } from '../types';

export class ApiService {
  protected readonly axios = axios.create({
    baseURL: import.meta.env.DEV ? '/api' : '', // redirect to proxy in development mode
  });

  uploadFile(file: File) {
    const data = new FormData();
    data.append('file', file);
    return this.axios
      .post<FileUploadResponse>('/uploading', data, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .then((res) => res.data);
  }

  sendParams(text: string, email: string | null) {
    return this.axios.post<SendParamsResponse>('/iloading', { text, email }).then((res) => res.data);
  }

  getResult() {
    return this.axios.get<DepersonalizationResult>('/viewing').then((res) => res.data);
  }
}
