import { FileSendDto } from '../dtos/file-send.dto';

export abstract class UploaderService {
  abstract upload(fileDto: FileSendDto, path?: string): Promise<string>;
}
