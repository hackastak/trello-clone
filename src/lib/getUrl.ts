import { storage } from "@/appwrite";
import { Image } from "@/types";

export const getUrl = async (image: Image) => {
  const imageBucketId = process.env.NEXT_PUBLIC_STORAGE_BUCKET!;
  const url = storage.getFilePreview(imageBucketId, image.fileId);
  return url;
}
