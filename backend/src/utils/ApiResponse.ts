const STATUS_CODE_MESSAGE: { [key: number]: string } = {
  [1]: "Success",
};

class ApiResponse {
  public status: number;
  public message: string;
  public data: any;
  public success: boolean;

  constructor(status: number, data: any, success: boolean = true) {
    this.status = status;
    this.message = STATUS_CODE_MESSAGE[status] || "Unknown Status";
    this.data = data;
    this.success = success;
  }
}

export { ApiResponse };
