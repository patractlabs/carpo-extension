import type { RedspotConfig } from 'redspot/types/config';

export interface RequestSignatures {
  'redspot.getConfig': [null, RedspotConfig];
  'redspot.subConfig': [null, RedspotConfig, RedspotConfig];
  'redspot.setConfig': [RedspotConfig, RedspotConfig];
  'redspot.compile': [null, null];
}

export type MessageTypes = keyof RequestSignatures;

export type RequestTypes = {
  [MessageType in keyof RequestSignatures]: RequestSignatures[MessageType][0];
};

export type ResponseTypes = {
  [MessageType in keyof RequestSignatures]: RequestSignatures[MessageType][1];
};

export type SubscriptionTypes = {
  [MessageType in keyof RequestSignatures]: RequestSignatures[MessageType][2];
};

export interface TransportRequestMessage<TMessageType extends MessageTypes> {
  id: string;
  message: TMessageType;
  request: RequestTypes[TMessageType];
}

export interface TransportResponseMessage<TMessageType extends MessageTypes> {
  id: string;
  response?: ResponseTypes[TMessageType];
  error?: string;
}

export interface SendRequest {
  <TMessageType extends MessageTypes>(message: TMessageType, request: RequestTypes[TMessageType]): Promise<
    ResponseTypes[TMessageType]
  >;
  <TMessageType extends MessageTypes>(
    message: TMessageType,
    request: RequestTypes[TMessageType],
    subscriber: (data: SubscriptionTypes[TMessageType]) => void
  ): Promise<ResponseTypes[TMessageType]>;
}

export interface Handler {
  resolve: (data?: any) => void;
  reject: (error: Error) => void;
  subscriber?: (data: any) => void;
}
export type Handlers = Record<string, Handler>;
