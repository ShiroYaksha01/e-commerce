import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CoreModule } from 'src/core/core.module';

@Module({
  imports: [CoreModule], //No more circular dependency!
  providers: [NotificationsService],
  exports: [NotificationsService],
})
export class NotificationsModule {}