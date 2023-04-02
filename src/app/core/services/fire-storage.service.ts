import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { combineLatest, map, Observable } from 'rxjs';
export interface IFile {
  name: string;
  fileUrl: string;
  filePath: string;
  fileType: string;
  type: string;
  fileSize: number;
}
@Injectable({
  providedIn: 'root'
})
export class FireStorageService {
  uploadPercent: Observable<any>;
  startUpload: boolean = false;
  constructor(
    private storage: AngularFireStorage,
  ) { }


  uploadSelectedFile(file, filePath) {
    const ref = this.storage.ref(filePath);
    const task = ref.put(file);
    return task
  }

  async upload(file: any, uploadPath: string) {
    this.startUpload = true;
    const percentage: Observable<number>[] = [];
    const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
    const path = `${uploadPath}/${filename}`;
    const task = this.uploadSelectedFile(file, path);
    const _percentage$ = task.percentageChanges()
    this.uploadPercent = _percentage$;
    const downloadURL: any = (await task.then(async (f) => {
      return await f.ref.getDownloadURL()
    }));
    let fileType = file.type.split('/').slice(0, -1).join('/');
    const files: IFile = {
      name: file.name,
      filePath: path,
      fileUrl: downloadURL,
      fileType: file.type,
      type: fileType,
      fileSize: file.size,
    }
    this.startUpload = false;
    return files
  }


  async multiUpload(fileItems: any[], uploadPath: string) {
    const selectedFiles: any[] = [];
    const percentage: Observable<number>[] = [];
    for await (const file of fileItems) {
      this.startUpload = true;
      const filename = Math.random().toString(36).substring(7) + new Date().getTime() + file.name;
      const path = `${uploadPath}/${filename}`;
      const task = this.uploadSelectedFile(file, path);
      const _percentage$ = task.percentageChanges();
      percentage.push(_percentage$);
      const downloadURL: any = (await task.then(async (f) => {
        return await f.ref.getDownloadURL()
      }));
      let fileType = file.type.split('/').slice(0, -1).join('/');
      const files: IFile = {
        name: file.name,
        filePath: path,
        fileUrl: downloadURL,
        fileType: file.type,
        type: fileType,
        fileSize: file.size,
      }
      selectedFiles.push(files)
      this.startUpload = false;
    }

    this.uploadPercent = combineLatest(percentage)
      .pipe(
        map((percentages) => {
          let result = 0;
          for (const percentage of percentages) {
            result = result + percentage;
          }
          return result / percentages.length;
        }),
      );

    return selectedFiles
  }

  async deleteFiles(files: any[]) {
    for await (const file of files) {
      this.storage.ref(file.filePath).delete()
    }
  }
  async deleteFile(file: any) {
    this.storage.ref(file.filePath).delete()
  }


}

