import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SpeechError } from '../../../../shared/model/speech-error';
import { Observable, Subject, firstValueFrom, map, merge, of, tap } from 'rxjs';
import { SpeechRecognizerService } from '../../../../shared/services/web-apis/speech-recognizer.service';
import { ActionContext } from '../../../../shared/services/actions/action-context';
import { SpeechEvent } from '../../../../shared/model/speech-event';
import { SpeechNotification } from '../../../../shared/model/speech-notification';
import { EpicrisisEditHeaderComponent } from './components/epicrisis-edit-header/epicrisis-edit-header.component';
import { AppointmentInformationComponent } from './components/appointment-information/appointment-information.component';
import IPatient from '../../../../shared/interfaces/patient/patient.interface';
import { environment } from '@env/environment';
import Operation from 'enums/operation.enum';
import { IRequest } from '@app/shared/interfaces/common/request.interface';
import { IResponse } from '@app/shared/interfaces/common/response.interface';
import { CommonService } from '../../../../shared/services/common/common.service';
import { ChangeDetectorRef } from '@angular/core';
import { ModalComponent } from '@app/shared/components/modal/modal.component';
import { MatDialog } from '@angular/material/dialog';
import ILang from '@app/shared/interfaces/lang/lang.interface';
import { LangService } from '@app/shared/components/dropdown/lang/lang.service';
import { EpicrisisHistoryComponent } from "./components/epicrisis-history/epicrisis-history.component";
import { BedrockHaiku } from '@app/shared/model/bedrock-haiku';
import { Epicrisis } from '@app/shared/model/epicrisis';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-epicrisis-edit',
  standalone: true,
  templateUrl: './epicrisis-edit.component.html',
  styleUrl: './epicrisis-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    EpicrisisEditHeaderComponent,
    AppointmentInformationComponent,
    EpicrisisHistoryComponent,
    FormsModule
  ]
})
export class EpicrisisEditComponent {
  @Input()
  patient!: IPatient;

  currentLanguage: string = '';
  totalTranscript?: string;
  transcriptParts: string[] = [];

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();
  correctedTranscript!: Epicrisis;
  microActive?: boolean;
  arthurReady?: boolean;
  threeDots?: boolean;
  showMainContent: boolean = true;
  editedManualy: boolean = false;
  constructor(
    private _commonService: CommonService,
    private speechRecognizer: SpeechRecognizerService,
    private actionContext: ActionContext,
    private cdr: ChangeDetectorRef,
    public dialog: MatDialog,
    private langService: LangService
  ) { }

  ngOnInit(): void {


  }
  ngAfterViewInit() {
    debugger
    this.setRecorder();
  }

  async setRecorder() {
    const langSubscribe = this.langService.getChangedLangSubject();
    langSubscribe.subscribe(async (lang: ILang) => {
      if (lang.iso_code !== '' && lang.id > 0) {
        const webSpeechReady = this.speechRecognizer.initialize(lang.iso_code);
        //const webSpeechReady = this.speechRecognizer.initialize("es_CR");


        if (webSpeechReady) {
          this.initRecognition();
        } else {
          this.errorMessage$ = of('Your Browser is not supported. Please try Google Chrome.');
        }
      }

    })
  }

  start(): void {
    this.arthurReady = false;
    this.threeDots = true;
    this.cdr.detectChanges();
    if (this.speechRecognizer.isListening) {
      this.stop();
      return;
    }

    this.defaultError$.next(undefined);
    this.speechRecognizer.start();
  }

  stop(): void {
    this.threeDots = false;
    this.cdr.detectChanges();
    this.speechRecognizer.stop();
  }

  selectLanguage(language: string): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
    }
    this.currentLanguage = language;
    this.speechRecognizer.setLanguage(this.currentLanguage);
  }

  private initRecognition(): void {
    this.transcript$ = this.speechRecognizer.onResult().pipe(
      tap((notification) => {
        this.processNotification(notification);
      }),
      map((notification) => notification.content || '')
    );

    this.listening$ = merge(
      this.speechRecognizer.onStart(),
      this.speechRecognizer.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    this.errorMessage$ = merge(
      this.speechRecognizer.onError(),
      this.defaultError$
    ).pipe(
      map((data) => {
        if (data === undefined) {
          return '';
        }
        if (typeof data === 'string') {
          return data;
        }
        let message;
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `Cannot run the demo.
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`;
            break;
          case SpeechError.NoSpeech:
            message = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.AudioCapture:
            message = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            message = '';
            break;
        }
        return message;
      })
    );
  }

  private processNotification(notification: SpeechNotification<string>): void {
    if (notification.event === SpeechEvent.FinalContent) {
      const message = notification.content?.trim() || '';
      this.actionContext.processMessage(message, this.currentLanguage);
      // this.actionContext.runAction(message, this.currentLanguage);
      //this.totalTranscript = this.totalTranscript? `${this.totalTranscript} ${message}`: notification.content;
      if (this.editedManualy && this.totalTranscript) {
        const transcriptionSplit = this.totalTranscript.split(' ');
        transcriptionSplit.forEach((word, index) => {
          if (word !== this.transcriptParts[index]) {
            this.transcriptParts[index] = word;
          }
        });
      }
      this.transcriptParts.push(message); // Añade cada parte de la transcripción al historial
      this.totalTranscript = this.transcriptParts.join(' ');
    }
  }

  async saveEpi(): Promise<void> {
    try {
      this._commonService.setUseHearLoading(true)
      const request = this.createRequest();
      const response = await this.executeLangRequest(request);
      let data: BedrockHaiku = response.data;//.content[0].text;
      const { content } = data;
      this.correctedTranscript = JSON.parse(content[0].text)
      console.log(this.correctedTranscript)
      this._commonService.setUseHearLoading(false)
      this.cdr.detectChanges();
    } catch (error) {
      console.error('Error al guardar la Epicrisis:', error);
    }
  }

  private createRequest(): IRequest {
    debugger;
    return {
      operation: Operation.POST,
      data: {
        anthropic_version: "bedrock-2023-05-31",
        max_tokens: 1000,
        messages: [
          {
            role: "user",
            content: [
              {
                type: "text",
                text: environment.haiku.prompt.replace("@texto@", this.totalTranscript ?? '')
              }
            ]
          }
        ]
      },
      microservice: environment.microservice.engine.code,
      method: environment.microservice.engine.methods.editEpicrisis,
    };
  }

  private async executeLangRequest(request: IRequest): Promise<IResponse> {
    try {
      return await firstValueFrom(this._commonService.executeMethod(request));
    } catch (error: any) {
      console.error('Error executing Lang request:', error.message ?? error);
      throw error; // Re-throw the error to be caught by the outer catch block
    }

  }
  openEnableMicro(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'Dispositivo de entrada de audio',
        description: 'El dispositivo funciona de manera correcta, ahora podrás empezar a transcribir la epicrisis con Arthur',
        img: 'assets/images/modals/microenable.svg',
        lblBtn: 'Empezar a utilizar Arthur'
      }
    });
    const instance = dialogRef.componentInstance;
    instance.install.subscribe(() => {
      this.enableMicro();
      dialogRef.close();
    });
  }

  enableMicro(): void {
    this.microActive = true;
    this.arthurReady = true;
    this.cdr.detectChanges();
  }

  clearTranscription(): void {
    this.totalTranscript = '';
    //this.correctedTranscript = undefined;
    this.transcriptParts = [];
    this.cdr.detectChanges();
  }

  clearLastPart(): void {
    this.transcriptParts.pop();
    this.totalTranscript = this.transcriptParts.join(' ');
    this.cdr.detectChanges();
  }

  approveEpicrisis(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: '¿Está seguro de que desea aprobar la epicrisis?',
        description: 'De lo contrario podrá regresar y continuar editando la información',
        img: 'assets/images/modals/approveEpicrisis.svg',
        lblBtn: 'Aprobar'
      }
    });
    const instance = dialogRef.componentInstance;
    instance.install.subscribe(() => {
      this.approveSuccessful()
      dialogRef.close();
    });
  }

  approveSuccessful(): void {
    const dialogRef = this.dialog.open(ModalComponent, {
      data: {
        title: 'La epicrisis fue aprobada con éxito',
        description: 'La trascripción se generó de manera exitosa ',
        img: 'assets/images/modals/successfulEpicrisis.svg',
        lblBtn: 'Ok'
      }
    });
    const instance = dialogRef.componentInstance;
    instance.install.subscribe(() => {
      dialogRef.close();
    });
  }

  toggleVisibility() {
    this.showMainContent = !this.showMainContent;
  }
  onManuallyChange() {
    this.editedManualy = true;
  }
}
