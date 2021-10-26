interface HttpExceptionParams {
  status?: number;
  message?: string;
}
export class HttpException extends Error {
  /**
   * http 状态码
   */
  status: number;
  /**
   * 返回的信息内容
   */
  message: string;
  /**
   * 构造函数
   * @param ex 可选参数，通过{}的形式传入
   */
  constructor(ex?: HttpExceptionParams) {
    super();
    this.status = ex?.status || 500;
    this.message = ex?.message || 'something wrong';
  }
}

export class BadRequest extends HttpException {
  constructor(ex?: HttpExceptionParams) {
    super();
    this.status = ex?.status || 400;
    this.message = ex?.message || 'Bad Request';
  }
}

export class Unauthorized extends HttpException {
  constructor(ex?: HttpExceptionParams) {
    super();
    this.status = ex?.status || 401;
    this.message = ex?.message || 'Unauthorized';
  }
}

export class Forbidden extends HttpException {
  constructor(ex?: HttpExceptionParams) {
    super();
    this.status = ex?.status || 403;
    this.message = ex?.message || 'Forbidden';
  }
}

export class NotFound extends HttpException {
  constructor(ex?: HttpExceptionParams) {
    super();
    this.status = ex?.status || 404;
    this.message = ex?.message || 'Not Found';
  }
}

