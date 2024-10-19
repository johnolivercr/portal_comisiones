import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from './loading.component';
import { AnimationLoader, LottieComponent, provideLottieOptions } from 'ngx-lottie';



@NgModule({
  declarations: [
    LoadingComponent
  ],
  imports: [
    CommonModule,
    LottieComponent
  ],
  exports:[
    LoadingComponent
  ],
  providers: [
    provideLottieOptions({
      player: () => import(/* webpackChunkName: 'lottie-web' */ 'lottie-web'),
    }),
    AnimationLoader,
  ],
})
export class LoadingModule { }
