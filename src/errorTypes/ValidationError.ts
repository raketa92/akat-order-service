class ValidationError extends Error {
    public name: string;
    public status: number;
  
    constructor(message: string, status = 400) {
      super(message);
      this.name = "ValidationError";
      this.status = status;
    }
  }
  
  export default ValidationError;
  