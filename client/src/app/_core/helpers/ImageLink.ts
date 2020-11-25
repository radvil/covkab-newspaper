import { environment as env } from '../../../environments/environment';

export class ImageLink {

  constructor() { }

  private imageUrl = env.imageUrl;

  public setAll(dataArray: Array<any>, endpoint: string): void {
    return dataArray.forEach((data: any) => this.setOne(data, endpoint))
  }

  public setOne(item: any, endpoint: string): void {
    const defaultImageLink = this.imageUrl + `${endpoint}/` + item.image;

    item.image = this.isAvailable(defaultImageLink)
      ? defaultImageLink
      : item.imageAlt

    return item;
  }

  public isAvailable(imageLink: string): boolean {
    const http = new XMLHttpRequest();

    http.open('HEAD', imageLink, false);
    http.send();

    return http.status != 404;
  }

}
