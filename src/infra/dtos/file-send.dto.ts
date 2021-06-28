export interface FileSendDto {
  originalname: string;
  encoding: string;
  mimetype: string;
  buffer: Buffer;
  size: number;
  noRandomName?: boolean;
}
