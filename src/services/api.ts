
import { UpscaleRequest, UpscaleResponse, JobStatus } from "../types";

const API_BASE_URL = "https://your-domain.com/api";

export const uploadAndUpscale = async (
  request: UpscaleRequest
): Promise<UpscaleResponse> => {
  try {
    // In a real implementation, this would use FormData to upload the file
    const formData = new FormData();
    formData.append("file", request.file);
    formData.append("scale", request.scale.toString());
    formData.append("denoise", request.denoise.toString());
    formData.append("aspect_ratio", request.aspect_ratio.toString());

    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful response
    return {
      job_id: "job_" + Math.random().toString(36).substr(2, 9),
      status: "pending"
    };
  } catch (error) {
    console.error("Upload failed", error);
    throw new Error("Upload failed");
  }
};

// Enhanced checkJobStatus function to properly simulate image processing
export const checkJobStatus = async (jobId: string): Promise<JobStatus> => {
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Generate a truly unique URL to avoid browser caching
    const timestamp = new Date().getTime();
    
    // Mock status response with a properly constructed URL
    return {
      status: "completed",
      progress: 100,
      // Create a data URL that will be returned as the processed image
      // In a real app, this would be a URL to the processed image
      result_url: `${window.location.origin}/processed-image-${timestamp}`
    };
  } catch (error) {
    console.error("Status check failed", error);
    throw new Error("Status check failed");
  }
};

// Function to simulate image upscaling by creating a canvas
export const simulateUpscaling = (
  originalImage: string, 
  scale: number, 
  denoise: number
): Promise<string> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Create canvas with increased dimensions
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      
      if (!ctx) {
        resolve(originalImage); // Fallback to original if canvas context is not available
        return;
      }
      
      // Set canvas dimensions to the scaled image size
      const scaleFactor = 1 + (scale / 2); // Convert scale 2, 4, 8 to a realistic multiplier
      canvas.width = img.width * scaleFactor;
      canvas.height = img.height * scaleFactor;
      
      // Apply higher quality image rendering
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      
      // Draw the original image scaled up
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Apply simulated denoise effect based on denoise level
      if (denoise > 0) {
        // Higher denoise values mean more sharpening/filtering
        const denoiseLevel = denoise / 100; // Convert to 0-1 range
        
        // Apply a mild blur for smoothing (simulating noise reduction)
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Simple sharpening filter for denoised image
        if (denoise > 30) {
          // Enhance edges and details
          ctx.filter = `contrast(${100 + denoiseLevel * 15}%) brightness(${100 + denoiseLevel * 5}%) saturate(${100 + denoiseLevel * 10}%)`;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          ctx.filter = 'none';
        }
        
        // For higher denoise levels, improve contrast and detail
        if (denoise > 60) {
          ctx.globalCompositeOperation = 'overlay';
          ctx.globalAlpha = 0.3;
          ctx.drawImage(canvas, 0, 0);
          ctx.globalCompositeOperation = 'source-over';
          ctx.globalAlpha = 1.0;
        }
      }
      
      // Convert canvas to data URL
      resolve(canvas.toDataURL("image/jpeg", 0.92));
    };
    
    img.onerror = () => {
      resolve(originalImage); // Fallback to original on error
    };
    
    img.src = originalImage;
  });
};

export const getDownloadUrl = (jobId: string): string => {
  return `${API_BASE_URL}/download/${jobId}`;
};
