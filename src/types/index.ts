
export interface UpscaleSettings {
  scale: 2 | 4 | 8;
  denoise: number;
  preserveAspectRatio: boolean;
}

export interface UpscaleRequest {
  file: File;
  scale: 2 | 4 | 8;
  denoise: number;
  aspect_ratio: boolean;
}

export interface UpscaleResponse {
  job_id: string;
  status: string;
}

export interface JobStatus {
  status: 'pending' | 'processing' | 'completed' | 'failed';
  progress: number;
  message?: string;
  result_url?: string;
}

export interface Section {
  id: string;
  title: string;
}
