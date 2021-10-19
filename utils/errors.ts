export default class SimpleError {
  status: number;

  detail: string;

  constructor(status = 400, detail: string) {
    this.status = status;
    this.detail = detail;
  }
}
