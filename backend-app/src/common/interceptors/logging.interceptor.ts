import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    let method, url;

    if (context.getType<string>() === 'graphql') {
      const gqlContext = GqlExecutionContext.create(context);
      const info = gqlContext.getInfo();
      method = 'GQL';
      url = info.fieldName;
    } else {
      const req = context.switchToHttp().getRequest();
      method = req.method;
      url = req.url;
    }

    const start = Date.now();
    return next.handle().pipe(
      tap(() => {
        const ms = Date.now() - start;
        console.log(`[${method}] ${url} - ${ms}ms`);
      }),
    );
  }
}
