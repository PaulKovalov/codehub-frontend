import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreateTutorialFlowService {
  public tutorialTitle: string;
  public tutorialPreview: string | null;
  public tutorialId: number;

  constructor() {
  }
}
