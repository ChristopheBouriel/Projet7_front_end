# About this repo :

This is the front-end for a social network app as part of a project for the Junior Web Develepper training of Openclassrooms and you'll find the repository of the back-end by clicking [here](https://github.com/ChristopheBouriel/Projet7_back_end).  
You can get more details about this project in my portfolio :  
https://portfolio-christophe-bouriel.netlify.app  


It was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.5.  

## Description of the app

First of all, I need to say that it was a study project and I had only a five weeks to develop the whole app with this front-end, the back-end and the database.  
I couldn't add all the functionnalities I intended to, like having a profile picture for example, and some would need to be improved – see the comments in italic – but what is done works and also I was asked to make something like a MVP.  
By the way an improved version of this project has been made
### Overview of the functionnalities

1. All publications :  
    You can see the list of all the publications  
    name date of creation title and an overview of the content  

2. Single publication :  
    The whole article and all the comments are displayed.  
    From there you can go back to the list, add a new comment, or see the author's profile by clicking on the corresponding button. If you are the author, since you can go to your profile from the main menu in the header, the last button is replaced with the one making it possible to modify : clicking here, the three buttons change and you can choose from cancel, delete or modify, after which you will need to confirm or cancel.  
    Comments can be modified by the author as well : on his two buttons are present, to modify and to delete -- which also need confirmation.  
    If something has been modified it is mentionned and one can see the date and hour of the modification by clicking on the word "modifié(e)".

3. Profile :  
    You can see the informations about any user, and just bellow, some buttons :
     - to go to the list
     - to display the search panel
     - only if you come from a publication, to go back to this one

    In the search panel, you get the whole list of the users and just have to click their username to see their profile, but  you can also use the search window (*partial matching with corresponding propositions should be implemented not to have to enter the exact username as it is the case*).  

    From profile, if that's your own, you can edit it and you can go to parameters to access the following settings :
    * change username : it will immediatly modify it for all past publications and comments
    * change password (*should match a predefined format to be strong enough and be repeated in a second field of the form before validation*)
    * delete account : everything is suppressed from the DB but the comments, and for these ones the username is replaced by "Utilisateur désinscrit".  

4. Notifications :  
    Users are notified when :  
        - one of their publications has been commented : the notification disappears as soon as they look it up.
        - one of their publications or comments has been moderated : the notification stay in the list as long as they don't remove it or the moderator reinstate it.  

    Moderator is notified for every publication or comment that has been written since his last connection (*he should be offered the possibility to menage these notifications : keep or delete one, clear all*).  
    He can see them by clicking the "Admin" button which is available only for him.  
    
5. Moderation :  
    * User :  
    When a publication or a comment is moderated, it is not suppressed but the content is hidden for everybody apart from him and the moderator. That way he can maybe modify it if the moderator agree or delete it by himself.  
    * Moderator :  
    Moderator can hide the content of a publication or a comment when logged with the specified profile. For each of them he have a button : by clicking he hides the content, then the button changes and he can make it appear by clicking again.  

## Development server

To have it working on your computer, after you started the API, enter the following commands in your terminal :
1. Clone the repository :  
	`git clone https://github.com/ChristopheBouriel/SharePlace-Evolution-UI.git`
2. Enter inside the root folder of the app :  
	`cd SharePlace-Evolution-UI`
3. Install the app :  
    `npm install`
3. Start the Angular server :  
	`ng serve`

You can then navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

