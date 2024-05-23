interface GlobalError extends Error {
  statusCode?: number;
  status?: string;
}

class GlobalError extends Error {
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'failed' : 'error';
  }
}

export default GlobalError;
