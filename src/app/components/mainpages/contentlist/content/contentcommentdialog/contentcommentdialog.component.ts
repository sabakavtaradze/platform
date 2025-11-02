import { Component, Inject, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { APIService } from 'src/app/API.service';
import { AuthenticationService } from 'src/app/services/user/authentication/authentication.service';
import { PostCommentService } from 'src/app/services/post/post-comment.service';

@Component({
  selector: 'app-contentcommentdialog',
  templateUrl: './contentcommentdialog.component.html',
  styleUrls: ['./contentcommentdialog.component.scss']
})

export class ContentcommentdialogComponent implements OnInit, OnDestroy {
  post: any;
  currentUser: any;
  content: any;
  contentForm: FormGroup;
  
  selectedFile: File | null = null; 
  
  // Explicitly define the type as string or undefined to satisfy the HTML check (Fixed earlier)
  imageprew: string | undefined; 
  
  isDisabled: boolean = false;
  updateUser: any;
  comments: any;

  constructor(
    private fb: FormBuilder,
    private postCommentService: PostCommentService,
    public dialogRef: MatDialogRef<ContentcommentdialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private authguard: AuthenticationService,
    private apiservice: APIService
  ) {
    this.currentUser = data.currentUser
    this.content = data.content
    this.contentForm = this.fb.group({
      text: ['', []],
    });
  }

  ngOnInit(): void {
    this.auth()
console.log(this.content);
  }

  ngOnDestroy(): void {
    if (this.updateUser) {
      this.updateUser.unsubscribe();
    }
  }

 async getComment() {
      try {
          const postId = this.content?.postID;
  
          if (!postId) {
              console.warn("Post ID not available to fetch comments.");
              return;
          }
  
          // 🎯 FIX: Use the postCommentService to fetch comments and subscribe to the Observable
          this.postCommentService.getCommentsByPostID(postId).subscribe({
            next: (response: any) => {
              // Assuming response structure is: { data: List<Comment>, isSuccess: bool, ... }
              if (response.isSuccess) {
                  this.comments = response.data; // Assign the list of comments from the 'data' field
                  
                  if (this.comments && this.comments.length > 0) {
                    // Sort comments by 'createdAt' (newest first)
                    this.comments.sort((a: any, b: any) =>
                      a.createdAt > b.createdAt ? -1 : 1
                    );
                  }
              } else {
                  console.error("API failed to return comments:", response.errorMessage);
                  this.comments = [];
              }
            },
            error: (error) => {
              console.error("Error fetching comments:", error);
              this.comments = [];
            }
          });
          
          // Removed previous commented-out APIService call
      } catch (error) {
        console.error("Error initiating comment fetch:", error)
      }
    }

  removeImg() {
    this.selectedFile = null;
    this.imageprew = undefined
    const fileInput = document.querySelector('input[type=file]') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = ''; // Clear the input value (simplest way)
    }
  }

  async onFileSelected(event: any): Promise<void> {
    const fileList: FileList = event.target.files;
    if (fileList && fileList.length > 0) {
      this.selectedFile = fileList[0];
      // Still need readAsDataURL for local preview
      this.imageprew = await this.readAsDataURL(this.selectedFile);
    } else {
        this.selectedFile = null;
        this.imageprew = undefined;
    }
  }

  readAsDataURL(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = () => {
        // Resolve with the Data URL (string)
        resolve(reader.result as string); 
      };

      reader.onerror = () => {
        reject('Error reading file'); 
      };

      reader.readAsDataURL(file); 
    });
  }


 async Done() {
      this.isDisabled = true;
      const text = this.contentForm.value.text;
      
      // 🎯 FIX: Changed 'id' to 'postID' to match the object structure
      const postId = this.content?.postID; 
      
      // Check if we have a valid post ID AND text/image data
      if (!postId || (!text && !this.selectedFile)) {
          console.error("Submission failed: Post ID is missing or no content provided.");
          this.isDisabled = false;
          return;
      }
  
      // Create the FormData object for multipart upload
      const formData = new FormData();
    
      // Append required data fields.
      // This uses the now-correct postId.
      formData.append('postID', postId.toString());
      
      // Append text only if it exists.
      if (text) {
          formData.append('CommentText', text);
      }
      
      // Append the file if it exists.
      if (this.selectedFile) {
          // Use 'File' as the key to match common backend IFormFile property name
          formData.append('File', this.selectedFile, this.selectedFile.name); 
      }
      
      // Call the service with FormData
      this.createComment(formData);
    }

  createComment(formData: FormData) {
console.log(formData)

    // Use the dedicated FormData service method
    this.postCommentService.createCommentFormData(formData) 
      .subscribe({
        next: (res: any) => {
          // Success: reset UI, reload comments, and close dialog if appropriate
          this.isDisabled = false;
          this.contentForm.reset();
          this.imageprew = undefined;
          this.selectedFile = null;
          this.getComment(); // Reload comments
        }, 
        error: (err) => {
          console.error('Comment creation failed:', err);
          this.isDisabled = false;
          // Show error message to user
        },
        complete: () => {
            // Optional: Close dialog or handle finalization
        }
    });
  }


  async auth() {
    try {
      this.currentUser = await this.authguard.GuardUserAuth()
      console.log(this.currentUser)
      console.log(this.content)
      return this.getComment(), this.updateUserFunction()
    } catch (error) {
      console.error("Authentication error during startup:", error) // Better error context
    }
  }


  async updateUserFunction() {
    let filter = {
      id: { eq: this.currentUser.attributes.sub }
    };

    try {

    } catch (error) {
      // Handle errors
    }
  }
}