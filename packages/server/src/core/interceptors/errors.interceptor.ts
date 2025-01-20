import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();
    const { method, url, body, headers } = request;
    const now = Date.now();

    return next.handle().pipe(
      catchError((error) => {
        const duration = Date.now() - now;

        if (error instanceof HttpException) {
          return throwError(() => error);
        }

        console.error(`Unhandled Error: ${method} ${url} - ${duration}ms`);
        console.error('Headers:', JSON.stringify(headers));
        console.error('Body:', JSON.stringify(body));
        console.error('Error:', error);

        return throwError(() => new InternalServerErrorException());
      }),
    );
  }
}
