import { Component, OnInit } from '@angular/core';
import { Salon } from 'src/app/models/salon/salon';
import { SalonService } from 'src/app/services/salon/salon.service';
import { ChatMessage } from 'src/app/models/chatmessage/chat-message';
import { ChatService } from 'src/app/services/chat/chat.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/authService/auth-service.service';



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
    private router: Router,
    private authService: AuthService



    
    ) { }

  
    ngOnInit(): void {
      this.fetchSalons();
      this.handleLogin();
      
    }
    

  handleLogin(){
    const loginCredentials = { lastName: 'ramach', password: 'password123' };
      this.authService.login(loginCredentials, { responseType: 'text' }).subscribe(
        (response) => {
          if (response === 'Login successful') {
            console.log('Login successful:', response);
            this.authService.setLoggedInUser(response);
            this.initializeWebSocket();
          } else {
            console.log('Handling other success scenarios or errors');
          }
        },
        (response) => {
          if (response === 'Invalid credentials') {
            const errorMessage = response || '';
            if (errorMessage.includes('Invalid credentials')) {
              console.log('Invalid credentials. Redirecting to localhost:8080/levels');
              this.router.navigate(['/levels']);
            } else {
              console.error('Login failed:', response);
            }
          } else {
            console.error('Login failed:', response);
          }
        }
      );
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

  initializeWebSocket(): void {
    // Replace this with your actual WebSocket initialization logic
    const salonId = this.salonId; // Replace with the actual salonId you want to connect to
    this.chatService.connectWebSocket(salonId);
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