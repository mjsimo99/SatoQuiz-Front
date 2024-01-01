import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Client, IStompSocket, IStompSocketMessageEvent } from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private baseUrl = 'http://localhost:8080'; 

  private stompClient: Client = new Client(); // Initialize the property
  private messageSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  public message$: Observable<any> = this.messageSubject.asObservable();

  constructor(private http: HttpClient) {}

  connectWebSocket(salonId: number): void {
    const socket = new SockJS(`${this.baseUrl}/ws`);
    this.stompClient.webSocketFactory = () => socket as unknown as IStompSocket; // Explicitly cast WebSocket to IStompSocket
    this.stompClient.onConnect = (frame) => {
      console.log('WebSocket Connected: ' + frame);
      this.stompClient.subscribe(`/topic/salon/${salonId}`, (message) => {
        console.log('Received message:', message);
        this.messageSubject.next(JSON.parse(message.body));
      });
    };
    this.stompClient.activate();
  }

  disconnectWebSocket(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      console.log('WebSocket Disconnected');
    }
  }

  sendWebSocketMessage(salonId: number, content: string): void {
    if (this.stompClient && this.stompClient.active) {
      this.stompClient.publish({
        destination: `/app/chat.sendMessage/${salonId}`,
        body: JSON.stringify({
          content,
          studentId: 6, // Replace with the actual studentId
          salonId,
          timestamp: new Date(),
        }),
      });
    } else {
      console.error('WebSocket not connected.');
    }
  }

  getChatMessages(salonId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/chat/messages/${salonId}`);
  }
}
