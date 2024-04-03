import { Resource } from '../interfaces/resource';
export class ResourceModel implements Resource{
   idResource: string;
   description: string;
   fileMime: string;
   fileData: string;
   fileName: string;
   filePath: string;

   constructor() {
      this.idResource = '';
      this.description = '';
      this.fileMime = '';
      this.fileData = '';
      this.fileName = '';
      this.filePath = '';
    }
}
