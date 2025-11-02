import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth, Storage } from 'aws-amplify';
import { APIService, ModelMessageConditionInput } from 'src/app/API.service';
import { APIServicem } from 'src/app/apiservicem';
import { HeaderService } from 'src/app/services/header.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { ScrollToBottomDirective } from './scroll-to-bottom.directive';
import GraphQLAPI from '@aws-amplify/api-graphql';
const { "v4": uuidv4 } = require('uuid');

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss'],
  queries: {
    'contentRef': new ViewChild('contentRef')
  }
})
export class ChatroomComponent {
  text: any = "";
  chatForm: FormGroup;
  chatId: any;
  messageList: any;
  currentUser: any;
  userToChat: any;
  HeaderNames: string = "";
  headerBackName: string = "/chat";
  messageSubscription: any;
  notMe: any;
  @ViewChild(ScrollToBottomDirective)
  scroll!: ScrollToBottomDirective;
  commonchats: any;
  userChatroomsList:any;
  chatroomMenu = true;
  imageUrl: string | ArrayBuffer | null = null;
  imageprew: any;








  constructor(private router: Router, private authguard: AuthenticationService, private cdRef: ChangeDetectorRef, private activeRoute: ActivatedRoute, private fb: FormBuilder, private apiservice: APIService, private apiservicem: APIServicem, private headerService: HeaderService) {
    this.chatForm = this.fb.group({
      text: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  setupMessageListener(): void {
    let filter = {
      chatroomID: { eq: this.chatId }
    };
    this.messageSubscription = this.apiservice.OnCreateMessageListener(filter).subscribe((message) => {
      let newMessage = message.value.data?.onCreateMessage
      this.messageList.push(newMessage)
      this.messageList.sort((a: any, b: any) =>
        a.createdAt > b.createdAt ? -1 : 1
      );
      return this.messagesseen(), message
    });
  }
  sendMessage(x: FormGroup) {
    let messageId: any;;
    let messageInput = {
      text: x.value.text,
      chatroomID: this.chatId,
      userID: this.currentUser.attributes.sub,
    };
    this.chatForm.reset(); // Reset the form
    this.chatForm.markAsPristine(); // Mark form as pristine (no changes)
    this.chatForm.markAsUntouched(); //
    let sendMessage = this.apiservice.CreateMessage(messageInput).then(msg => {
      messageId = msg.id;
      console.log('Message sent:', msg);

      let lastmessageInput = {
        id: this.chatId,
        chatroomLastMessageId: messageId
      }
       let updatechatroom =  this.apiservice.UpdateChatroom(lastmessageInput).then((updateResult) => {
        console.log('Chatroom updated:', updateResult);
        this.notMe.forEach((e: any) => {
          let input = {
            id: e.user.id
          }
        });
        
      })
      this.userChatroomsList.items.forEach((e:any) => {
        let userchatroominput = {
          id: e.id
        }
        let updateuserchatroom =  this.apiservice.UpdateUserChatroom(userchatroominput)
        
      });
    })
  }



  async messagesseen() {
    try {
      let date = new Date()
      let time = date.toISOString()
      console.log(time)
      console.log(this.currentUser)
      let input = {
        id: this.currentUser.attributes.sub,
        messagesseen: time
      }

      let updateseen = await this.apiservice.UpdateUser(input)
      console.log(updateseen)
    }
    catch (e) {
      console.log(e)
    }
  }


  async getuserchatrooms(){
    try{
      
      this.userChatroomsList = await this.apiservice.UserChatroomsByChatroomId(this.chatId)
      console.log(this.userChatroomsList)
    }
    catch(e){
      console.log(e)
    }
  }





  async getMessages(num: number) {
    // num
    try {
      let g = this.chatId.toString();
      // console.log(g)
      let chatroomID = g;
      // let limit:number = 10
      let desc = "DESC"
      let getchatroom = await this.apiservicem.GetChatroomMessages(g, num, desc);
      console.log(getchatroom)
      if (!getchatroom) {
        // this.router.navigateByUrl('/chat')
      }

      if (getchatroom) {
        if (getchatroom.Messages) {
          this.messageList = getchatroom.Messages.items;
          // console.log(this.messageList)

          return this.user();
        }
      }

    } catch (error) {
      console.log(error);
    }
  }
  async user() {
    try {
      let userchats = await this.apiservicem.GetChatroomUser(this.chatId);
      this.commonchats = userchats.users?.items || [];
      this.notMe = this.commonchats.filter((x: { user: { id: any; }; }) => x.user.id !== this.currentUser.attributes.sub);
      this.HeaderNames = this.notMe.map((item: any) => item.user.name).join(', ');
    }
    catch (error) {
      console.log(error);
    }
  }
  async auth() {
    try {
      this.currentUser = await this.authguard.GuardUserAuth()
    }
    catch (error) {
      console.error(error);
    }
  }
  ngOnDestroy(): void {
    if (this.messageSubscription) {
      this.messageSubscription.unsubscribe();
    }
  }
  async getChatRoom() {
    try {
      let get = await this.apiservice.GetChatroom(this.chatId)
      console.log(get)
      if (!get) {
        this.router.navigateByUrl('/chat')
      }
      return this.getuserchatrooms()

    } catch (e) {
      console.log(e)
    }
  }
  ngOnInit() {
    this.chatId = this.activeRoute.snapshot.paramMap.get('chatId');
    console.log(this.chatId)
    this.getChatRoom()
    // console.log(this.chatId)
    let headerhide = localStorage.setItem("productId", this.chatId)
    this.auth();
    // console.log(this.chatId);

    this.getMessages(10);
    // this.sendProductIdToApp();
    this.setupMessageListener();
  }



  async test() {
    try {
      let test = await this.apiservice.GetChatroom(this.chatId)
      console.log(test)
      let users: any[] = [];
      let usersChatroom: any[] = []
      console.log(this.commonchats)
      if (this.commonchats) {
        this.commonchats.forEach((el: any) => {
          console.log(el)
          users.push(el.user.id)
        });
      }

      let usrch1: any[] = [];
      for (let usr of users) {
        let usrChat = await this.apiservice.UserChatroomsByUserId(usr)
        for (let childUsrChat of usrChat.items) {
          if (childUsrChat) {
            if (childUsrChat.chatroomId === this.chatId) {
              let input = {
                id: childUsrChat.id
              }
              let dlt = await this.apiservice.DeleteUserChatroom(input)
              let inpt = {
                id: this.chatId
              }
              let dltRoom = await this.apiservice.DeleteChatroom(inpt)
              this.router.navigateByUrl('/chat')
            }

          }
        }
      }

    }
    catch (error) {
      console.log(error)
    }
  }
  async deleteMessage(event: string) {
    try {
      let filter = {
        chatroomID: { eq: this.chatId }
      }
      let desc = "DESC"
      let num = 10000
      let g = this.chatId
      let getchatroom = await this.apiservicem.GetChatroomMessagesall(g, desc);
      let getchatroom1: any[] = [];
      if (getchatroom) {
        if (getchatroom.Messages?.items) {
          getchatroom.Messages.items.forEach((v: any) => {
            getchatroom1.push(v)
          })
          getchatroom1.forEach((m: any) => {
            let input = {
              id: m.id
            }
            if (m.images !== null && m.images !== undefined) {

              m.images.forEach((el: any) => {
                let storageRemove = Storage.remove(el)
              });
            }
            this.apiservice.DeleteMessage(input)
          })
          let chat = {
            id: this.chatId,
          }
          this.apiservice.UpdateChatroom(chat)
        }
      }
      let messageList = await this.apiservice.ListMessages(filter)
      let messageItems: any[] = [];
      messageList.items.forEach((v: any) => {
        messageItems.push(v)
      })
      messageItems.forEach((m: any) => {
        let input = {
          id: m.id
        }
        if (m.images !== null) {

          m.images.forEach((el: any) => {
            let storageRemove = Storage.remove(el)
          });
        }

        this.apiservice.DeleteMessage(input)
      })
      if (event === 'deleteChat')
        this.test()
    }
    catch (error) {
      console.log(error)
    }
  }


  async onFileSelected(event: any): Promise<void> {
    const files: FileList = event.target.files;
    const imageprew: File = event.target.files[0];
    if (imageprew) {
      this.imageprew = await this.readAsDataURL(imageprew);
    }
    console.log(files)
    if (files) {
      // for (let i = 0; i < files.length; i++) {
      // const file: File = files[i];
      // console.log(file)
      const imageUrl = await this.uploadImage(files);
      console.log(imageUrl)
      // }
    }
  }
  readAsDataURL(file: File): Promise<any> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result); // Resolve with the URL of the selected file
      };

      reader.onerror = () => {
        reject('Error reading file'); // Reject if there's an error reading the file
      };

      reader.readAsDataURL(file); // Read file as Data URL
    });
  }


  async uploadImage(files: FileList) {
    let imgs: any[] = [];

    // Iterate through the files array
    const filesArray = Array.from(files);
    for (const file of filesArray) {
      const reader = new FileReader();

      // Read the file content
      reader.readAsArrayBuffer(file);

      // Handle the onload event

      try {
        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type });

        // Generate a unique key for the file
        const key = `${uuidv4()}.png`;

        // Upload the file to storage
        const result = await Storage.put(key, blob, {
          contentType: 'image/png',
          metadata: { ACL: 'public-read' }
        });

        // Add the uploaded file's key to the imgs array
        imgs.push(result.key);
        console.log('File uploaded successfully:', result.key);
      } catch (uploadError) {
        console.error('Error uploading file:', uploadError);
      }

    }

    this.sendImage(imgs);
  }
  sendImage(img: any) {
    let im: any[] = []
    let messageInputt = {
      chatroomID: this.chatId,
      images: img,
      userID: this.currentUser.attributes.sub,
    };
    let messageId: any;;



    console.log(messageInputt)
    let sendMessage = this.apiservice.CreateMessage(messageInputt).then(msg => {
      messageId = msg.id;
      console.log('Message sent:', msg);

      let lastmessageInput = {
        id: this.chatId,
        chatroomLastMessageId: messageId
      }
      return this.apiservice.UpdateChatroom(lastmessageInput).then((updateResult) => {
        console.log('Chatroom updated:', updateResult);
        this.notMe.forEach((e: any) => {
          console.log(e.user.id)
          let input = {
            id: e.user.id
          }
          let updateUser = this.apiservice.UpdateUser(input)

        });

      })
    }).catch(error => {
      // Error handling, if applicable
      console.error('Error creating message:', error);
    });
    console.log(sendMessage)


    // } catch (error) {
    //   console.log(error)
    // }
  }

}




