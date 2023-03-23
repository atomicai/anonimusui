export interface FileUploadResponse {
  filename: string;
  is_suffix_ok: boolean;
  is_file_corrupted: boolean;
  is_prompt_required: boolean;
  text_columns?: string[];
}

export interface SuccessSendParamsResponse {
  success: string;
}
export interface ErrorSendParamsResponse {
  error: string;
}
export type SendParamsResponse = SuccessSendParamsResponse | ErrorSendParamsResponse;

export interface DepersonalizationResult {
  num_words_deleted: number;
  result_file_size: number;
  maximum_file_size: number;
  filename: string;
}
