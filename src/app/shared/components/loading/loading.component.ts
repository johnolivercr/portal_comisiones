import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { CommonService } from '../../../../app/shared/services/common/common.service';
import { AnimationOptions } from 'ngx-lottie';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();
  public loading = false;
  useHeartLoading: boolean = false;


  constructor(private _commonService: CommonService) { }

  ngOnInit(): void {
    this._commonService.useHeartLoadingService
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(data => {
        this.useHeartLoading = data;
      });
  }
  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  options: AnimationOptions = {
    path: '/assets/json/loader.json',
  };

  onLoopComplete(): void {
    NgZone.assertNotInAngularZone();
  }
}
