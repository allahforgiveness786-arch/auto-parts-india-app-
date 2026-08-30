/**
 * Cloudinary Image Management Service for React Native Android
 * Provides fast unsigned upload, parallel batching, timeout fallback, and optimization.
 */

const CLOUDINARY_CLOUD_NAME = 'rqf1hlrx'; // Default Cloudinary cloud name
const CLOUDINARY_UPLOAD_PRESET = 'autoparts_upload'; // Unsigned upload preset
const UPLOAD_TIMEOUT_MS = 20000; // 20s timeout per image for mobile networks

export interface CloudinaryUploadResponse {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
}

/**
 * Uploads a single local image file URI or base64 data URI to Cloudinary with timeout guard.
 */
export async function uploadImageToCloudinary(
  fileUri: string,
  folder: string = 'spare_parts'
): Promise<string> {
  if (!fileUri) {
    return fileUri;
  }

  // If already a remote URL, return immediately
  if (fileUri.startsWith('http://') || fileUri.startsWith('https://')) {
    return fileUri;
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), UPLOAD_TIMEOUT_MS);

  try {
    const formData = new FormData();

    if (fileUri.startsWith('data:image/')) {
      // Direct base64 upload supported natively by Cloudinary
      formData.append('file', fileUri);
    } else {
      const filename = fileUri.split('/').pop() || `upload_${Date.now()}.jpg`;
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image/jpeg';

      formData.append('file', {
        uri: fileUri,
        name: filename,
        type: type,
      } as any);
    }

    formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
    formData.append('folder', folder);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

    const response = await fetch(uploadUrl, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      // Fallback: return original URI safely
      return fileUri;
    }

    const data = (await response.json()) as CloudinaryUploadResponse;
    return data.secure_url || fileUri;
  } catch (err) {
    clearTimeout(timeoutId);
    console.warn('Cloudinary upload fallback to URI:', err);
    return fileUri;
  }
}

/**
 * Fast parallel batch upload for multiple photos at once.
 */
export async function uploadMultipleImagesToCloudinary(
  uris: string[],
  folder: string = 'spare_parts',
  onProgress?: (completed: number, total: number) => void
): Promise<string[]> {
  if (!uris || uris.length === 0) return [];

  let completedCount = 0;
  const total = uris.length;

  const uploadPromises = uris.map(async (uri) => {
    try {
      const result = await uploadImageToCloudinary(uri, folder);
      completedCount++;
      if (onProgress) onProgress(completedCount, total);
      return result;
    } catch (_) {
      completedCount++;
      if (onProgress) onProgress(completedCount, total);
      return uri;
    }
  });

  return Promise.all(uploadPromises);
}

/**
 * Generates an optimized Cloudinary image transformation URL
 */
export function getOptimizedImageUrl(
  urlOrPublicId: string,
  width: number = 400,
  height: number = 300
): string {
  if (!urlOrPublicId) {
    return 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&q=80&w=400';
  }

  if (urlOrPublicId.includes('res.cloudinary.com')) {
    return urlOrPublicId.replace(
      '/upload/',
      `/upload/c_fill,w_${width},h_${height},f_auto,q_auto/`
    );
  }

  return urlOrPublicId;
}

/**
 * Simulates Cloudinary image deletion flow (Client side confirmation)
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  try {
    return true;
  } catch (err) {
    return false;
  }
}
