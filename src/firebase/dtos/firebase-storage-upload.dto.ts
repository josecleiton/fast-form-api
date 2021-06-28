export interface FirebaseStorageUploadDto {
  data: Buffer;
  contentType: string;
  publicFile: boolean;
  bucket?: string;
}
