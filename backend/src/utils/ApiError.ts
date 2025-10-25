const STATUS_CODE_MESSAGE: { [key: number]: string } = {
  [0]: "Not Found",
  [2]: "Invalid Password",
  [3]: "Crossed the 5 attempts limit",
  [-1]: "Data not valid, check your credentials",
  [-2]: "Captcha Expired, please refresh and try again",
};

class ApiError extends Error {
   public status: number;
   public message: string;
   public data: any;

   constructor(status: number, message?: string, data: any = null) {
       super(message);
       this.status = status;
       this.message = message || STATUS_CODE_MESSAGE[status];
       this.data = data;
   }
}

export { ApiError };