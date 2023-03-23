export interface FileUploadResponse {
  filename: string;
  is_suffix_ok: boolean;
  is_file_corrupted: boolean;
  is_prompt_required: boolean;
  text_columns?: string[];
}
