import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    const { method, url, body, headers, query } = request;
    const now = Date.now();

    console.log('-Request---------------------------------------');
    console.log(`Incoming Request: ${method} ${url}`);
    console.log('Headers:', JSON.stringify(headers, null, 2));
    console.log('Query Params:', JSON.stringify(query, null, 2));
    console.log('Body:', JSON.stringify(body, null, 2));
    console.log('-----------------------------------------------');

    return next.handle().pipe(
      tap({
        next: (value) => {
          console.log('-Response--------------------------------------');
          const duration = Date.now() - now;
          console.log(`Response: ${method} ${url} - ${duration}ms`);
          console.log('Response Body:', JSON.stringify(value, null, 2));
          console.log('-----------------------------------------------');
        },
        error: (error) => {
          console.log('-Error-----------------------------------------');
          const duration = Date.now() - now;
          console.error(
            `Request Failed: ${method} ${url} - ${duration}ms - Error: ${error.message}`,
          );
          console.error('Error Stack:', error.stack);
          console.log('-----------------------------------------------');
        },
      }),
    );
  }
}
