import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoadingModule } from "./shared/components/loading/loading.module";
import { CommonService } from '@app/service/common/*';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [RouterOutlet, LoadingModule]
})
export class AppComponent {
  constructor(private _commonService: CommonService) { this._commonService.setUseHearLoading(false); }
  ngAfterViewInit() {
  }
}
