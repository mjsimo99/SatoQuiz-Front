import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ChatMessage } from 'src/app/models/chatmessage/chat-message';
import { ChatMessageDto } from 'src/app/models/chatmessage/chat-messageDto';
import { Salon } from 'src/app/models/salon/salon';
import { ChatService } from 'src/app/services/chat/chat.service';

@Component({
  selector: 'app-salon-details',
  templateUrl: './salon-details.component.html',
  styleUrls: ['./salon-details.component.css'],
})
export class SalonDetailsComponent implements OnInit, OnDestroy {
  studentColors: string[] = ["#FF5733", "green", "#5733FF", "#FFFF33", "#33FFFF"];
  salonId!: number;
  @Input() chatMessages: ChatMessage[] = [];
  @Input() chatMessagesDto: ChatMessageDto[] = [];
  
  @Input() selectedSalon?: Salon;
  newMessage: string = '';

  private routeSubscription: Subscription = new Subscription;

  constructor(
    private route: ActivatedRoute,
    private chatService: ChatService,
  ) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe((params) => {
      this.salonId = +params['id'];
      this.chatService.disconnectWebSocket(); // Disconnect existing WebSocket
      this.chatMessages = []; // Clear chat messages when changing salon
      this.chatService.connectWebSocket(this.salonId); // Connect to the new WebSocket
    });
    

    this.chatService.message$.subscribe((newMessage) => {
      if (newMessage) {
        this.chatMessages.push(newMessage);
      }
    });
  }

  ngOnDestroy(): void {
    this.routeSubscription.unsubscribe();
    this.chatService.disconnectWebSocket();
  }


  sendMessage() {
    this.chatService.sendWebSocketMessage(this.salonId, this.newMessage);

    const newChatMessage: ChatMessageDto = {
      content: this.newMessage,
      studentId: 15,
      salonId: this.salonId,
      timestamp: new Date(),
    };
    this.chatMessagesDto.push(newChatMessage);
    this.newMessage = '';
  }

  getStudentColor(index: number): string {
    return this.studentColors[index % this.studentColors.length];
  }

  getContrastColor(backgroundColor: string): string {
    const luminance =
      (0.299 * parseInt(backgroundColor.slice(1, 3), 16) +
        0.587 * parseInt(backgroundColor.slice(3, 5), 16) +
        0.114 * parseInt(backgroundColor.slice(5, 7), 16)) / 255;

    return luminance > 0.5 ? '#000000' : '#FFFFFF';
  }
}
