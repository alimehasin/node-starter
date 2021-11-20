export default class SimpleError {
  status: number;
  detail: string;

  constructor(status: number, detail: string) {
    this.status = status;
    this.detail = detail;
  }
}
