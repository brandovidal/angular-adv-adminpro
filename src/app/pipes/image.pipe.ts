import { Pipe, PipeTransform } from '@angular/core';
import { environment } from 'env/environment';
import { TypeFilesName } from 'interfaces';

const baseUrl = environment.baseUrl

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform(img: string, type: TypeFilesName): unknown {
    if (!img) {
      return `${baseUrl}/api/upload/${type}/no-image`
    } else if (img.includes('https')) {
      return img
    }
    return img ? `${baseUrl}/api/upload/${type}/${img}` : `${baseUrl}/api/upload/${type}/no-image`
  }

}
