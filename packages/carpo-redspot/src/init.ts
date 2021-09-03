import type { OutputChannel, StatusBarItem } from 'vscode';
import type { Disposed } from './types';

import * as vscode from 'vscode';

export abstract class Init implements Disposed {
  public basePath: string;
  public outputChannel: OutputChannel;
  public statusBar: StatusBarItem;

  constructor(_basePath: string) {
    this.basePath = _basePath;
    this.outputChannel = vscode.window.createOutputChannel('Carpo Redspot');
    this.statusBar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);

    this.init();
  }

  private init(): void {
    this.outputChannel.show();
    this.statusBar.text = 'Carpo Redspot';
    this.statusBar.show();
  }

  public dispose(): void {
    this.outputChannel.dispose();
    this.statusBar.dispose();
  }

  protected print(value: string | Buffer | { toString: () => string }): void {
    this.outputChannel.append(value.toString());
  }

  protected println(value: string | Buffer | { toString: () => string }): void {
    this.outputChannel.appendLine(value.toString());
  }
}
