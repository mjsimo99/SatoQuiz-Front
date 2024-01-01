import { Component, OnInit } from '@angular/core';
import { Salon } from 'src/app/models/salon/salon';
import { SalonService } from 'src/app/services/salon/salon.service';
import { ChatMessage } from 'src/app/models/chatmessage/chat-message';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-salon',
  templateUrl: './salon.component.html',
  styleUrls: ['./salon.component.css']
})
export class SalonComponent implements OnInit {
  salons: Salon[] = [];
  salonId!: number;
  chatMessages : ChatMessage[] = [];
  selectedSalon?: Salon;
  

  constructor(
    private salonService: SalonService,
    private chatService: ChatService,
    private router: Router



    
    ) { }

  
  ngOnInit(): void {
    this.fetchSalons();
    
  }

  fetchSalons() {
    this.salonService.getSalons().subscribe(
      (data) => {
        this.salons = data;
      },
      (err) => console.error(err),
      () => console.log('Salons loaded')
    );
  }

 
  fetchChatMessagesForSalon(salon: Salon) {
    this.chatService.getChatMessages(salon.id).subscribe(
      (data) => {
        this.chatMessages = data;
      },
      (err) => console.error(err),
      () => console.log('Chat messages loaded')
    );
  }

  showSalonDetails(salon: Salon) {
    this.selectedSalon = salon;
    this.fetchChatMessagesForSalon(salon);
  
    this.router.navigate(['/salon', salon.id]);
  }
  

  
}