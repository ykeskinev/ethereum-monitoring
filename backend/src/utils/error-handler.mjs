export class ServiceError {

    status
    code
    payload
  
    constructor(status, code, payload) {
        this.status = status
        this.code = code

        if (payload) {
            this.payload = payload    
        } 
    }

    json() {
      return this.payload ?
      { status: this.status, code: this.code, payload: JSON.stringify(this.payload) } :
      { status: this.status, code: this.code }
    }
}
  
export class RequestError extends ServiceError {
    constructor(code, message) {
      super(400, code, message)
    }
  }
  
  export class ConfigurationError extends ServiceError {
    constructor(code, message) {
      super(500, code, message)
    }
  }
  
  export class InternalError extends ServiceError {
    constructor(code, message) {
      super(500, code, message)
    }
  }
  
  export class BadRequestError extends ServiceError {
    constructor(code, message) {
      super(400, code, message)
    }
  }
  
  export class NotFoundError extends ServiceError {
    constructor(code, message) {
      super(404, code, message)
    }
  }
  
  export class ForbiddenError extends ServiceError {
    constructor(code, message) {
      super(403, code, message)
    }
  }

export function handledErrorHandler(err, req, res, next) {
    if (err instanceof ServiceError) {
        res.status(err.status).send({ code: err.code, payload: err.payload })
    }
    next(err)
}

export function unhandledErrorHandler(error) {
    res.status(500)
    res.send({ code: 'unknown/error', payload: 'Please contact support!'})
}
  