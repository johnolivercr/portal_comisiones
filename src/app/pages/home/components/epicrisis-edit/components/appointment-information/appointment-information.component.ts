import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BedrockHaiku } from '@app/shared/model/bedrock-haiku';
import { Epicrisis } from '@app/shared/model/epicrisis';

@Component({
  selector: 'app-appointment-information',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './appointment-information.component.html',
  styleUrl: './appointment-information.component.scss'
})
export class AppointmentInformationComponent implements OnChanges {
  private _transcription!: Epicrisis;

  @Input()
  transcriptions?: Epicrisis;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transcriptions']) {
      this._transcription = changes['transcriptions'].currentValue;
    }
  }

  get transcription(): Epicrisis | undefined {
    return this._transcription;
  }
}
