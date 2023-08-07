<template>
    <h1 class="text-2xl text-center font-semibold mt-4 text-gray-600">
        Welcome To Marvel Tech
      </h1>
 
    <div class="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen font-semibold">
        <div class="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
           <div class="relative flex items-center space-x-4">
              <div class="relative">
                 <span class="absolute text-green-500 right-0 bottom-0">
                    <svg width="20" height="20">
                       <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                    </svg>
                 </span>
              <img src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144" alt="" class="w-10 sm:w-16 h-10 sm:h-16 rounded-full">
              </div>
              <div class="flex flex-col leading-tight">
                 <div class="text-2xl mt-1 flex items-center">
                    <span class="text-gray-700 mr-3">Marvel</span>
                 </div>
                 <span class="text-lg text-gray-600">Customer</span>
              </div>
           </div>   
           <div class="flex items-center space-x-2">            
            <p class="text-gray-600 font-semibold">
              History: off
            </p>
            <button v-if="!isChatEnded" @click="confirmEndChat" class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out font-semibold text-gray-700 bg-gray-50 focus:outline-none">End Chat</button>
         </div>    
        </div>
        <button class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out font-semibold text-gray-700 bg-gray-50 focus:outline-none" v-if="isChatEnded" @click="startNewChat">Start New Chat with (Hello or Hi)</button>
        <div class="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch">
            
            <div v-for="(message, index) in messages" :key="index" v-if="!isChatEnded" 
            :class="{ 'chat-message': true, 'justify-end': message.isBot }">
              <div :class="{ 'flex items-end': true, 'justify-end': message.isBot, 'justify-start': !message.isBot }">
                  <img v-if="message.isBot"
                      src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                      alt="Chatbot" class="w-6 h-6 rounded-full order-2" />                      
                  <div
                      :class="{ 'flex flex-col space-y-2 text-1xl max-w-xs mx-2 order-1 items-end': message.isBot, 'flex flex-col space-y-2 text-1xl max-w-xs mx-2 order-2 items-start': !message.isBot }">
                      <div>                       
                          <span
                              :class="{ 'px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white': message.isBot, 'px-4 py-2 rounded-lg inline-block rounded-bl-none bg-gray-300 text-gray-600': !message.isBot }">{{
                                  message.text }}</span>
                      </div>
                  </div>
                  
                  <img v-if="!message.isBot"
                      src="https://images.unsplash.com/photo-1549078642-b2ba4bda0cdb?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
                      alt="My profile" class="w-6 h-6 rounded-full order-1" />                      
                      
              </div>
          </div>  
          <audio ref="audioElement" controls autoplay v-if="showAudio">
            <source src="customer.mp3" type="audio/mp3">                        
          </audio>         
          <div v-if="isLoading" class="mt-4">
            <span class="animate-dots">...</span>
        </div>    
         </div>
        <div v-if="!isChatEnded" class="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
           <div class="relative flex">
              <span class="absolute inset-y-0 flex items-center">
                 <button type="button" class="inline-flex items-center justify-center rounded-full h-12 w-12 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
                    </svg>
                 </button>
              </span>
              <input type="text" v-model="userMessage" @keyup.enter="sendMessage" placeholder="Write your message!" class="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3">
              <div class="absolute right-0 items-center inset-y-0 hidden sm:flex">
                 <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                    </svg>
                 </button>
                 
                 <button type="button" class="inline-flex items-center justify-center rounded-full h-10 w-10 transition duration-500 ease-in-out text-gray-500 hover:bg-gray-300 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-gray-600">
                       <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                 </button>
                 <button type="button" @click="sendMessage()" class="inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none">
                    <span class="font-bold">Send</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="h-6 w-6 ml-2 transform rotate-90">
                       <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                    </svg>
                 </button>
              </div>
           </div>
        </div>
     </div>
</template>
  
  <script>
  import axios from 'axios';

  export default {
    data() {
      return {
        userMessage: '',
        messages: [],
        isChatEnded: true,
        isLoading: false,
        showAudio: false,
        
      };
    },
    methods: {
    sendMessage() {
      this.messages.push({ text: this.userMessage, isBot: false });
      this.isLoading = true;
      axios
        .post('http://localhost:3000/api/chat/message', { message: this.userMessage })
        .then((response) => {
            setTimeout(() => {
            this.messages.push({ text: response.data.message, isBot: true });
            this.isLoading = false; // Hide the dot animation loading
            this.userMessage = '';

              // Check if the chatbot response is 'Do you want to be Do you want to be forwarded to a customer care?'
            if (response.data.message.toLowerCase() === 'voicenote') {
              this.showAudio = true;             
            } else {
              this.showAudio = false;             
            }
             
          }, 1000); // Simulate a response delay of 1 second
        })
        .catch((error) => {
          console.error(error);
          this.isLoading = false;
        });
    },
    startNewChat() {
      this.messages = [];
      this.isChatEnded = false;
      this.userMessage = 'hello'; // Set the input to "hello" to begin a new chat
    },
    confirmEndChat() {
      if (confirm('Are you sure you want to end the chat?')) {
        this.endChat();
      }
    },
    endChat() {
      this.messages = [];
      this.isChatEnded = true;
      this.userMessage = '';
    },
  },
  };

 
  </script>

<style>
.animate-dots:after {
    content: "...";
    animation: dots 1s steps(5, end) infinite;
  }
  
  @keyframes dots {
    0%, 20% {
      content: ".";
    }
    40% {
      content: "..";
    }
    60% {
      content: "...";
    }
    80% {
      content: "....";
    }
  }
.scrollbar-w-2::-webkit-scrollbar {
  width: 0.25rem;
  height: 0.25rem;
}

.scrollbar-track-blue-lighter::-webkit-scrollbar-track {
  --bg-opacity: 1;
  background-color: #f7fafc;
  background-color: rgba(247, 250, 252, var(--bg-opacity));
}

.scrollbar-thumb-blue::-webkit-scrollbar-thumb {
  --bg-opacity: 1;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, var(--bg-opacity));
}

.scrollbar-thumb-rounded::-webkit-scrollbar-thumb {
  border-radius: 0.25rem;
}
</style>

