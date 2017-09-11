# Software Requirements Specification #

Caesar (Crowd-Sourced Infrastructure Review)

Version 1.0 approved

Prepared by Manmeet Arora, Jacob Casper, Leonard Kerr, Chris Tucker

Infusion/Avanade

8/27/2017

Revision History
<table>
<tr>
<th>Name</th>
<th>Date</th>
<th>Reason for Changes</th>
<th>Version</th>
</tr>
<tr>
<td>Leonard Kerr</td>
<td>8/27/2017</td>
<td>Initial documentation.</td>
<td>1.0</td>
</tr>
<tr>
<td>Christopher Tucker</td>
<td>8/28/2017</td>
<td>Added Use Cases.</td>
<td>1.1</td>
</tr>
</table>

# 1 Introduction #
## 1.1 Purpose ##
<!--Identify the product whose software requirements are specified in this document, including the revision or release number. Describe the scope of the product that is covered by this SRS, particularly if this SRS describes only part of the system or a single subsystem.-->
This document serves the purpose of specifying the requirements for the Crowd-Sourced Infrastructure Review system for Infusion, dubbed Caesar. This document will focus on the 1.0 end-to-end release of Caesar which includes only what is required to achieve the minimum viable product.

## 1.2 Product Scope ##
<!--Provide a short description of the software being specified and its purpose, including relevant benefits, objectives, and goals. Relate the software to corporate goals or business strategies. If a separate vision and scope document is available, refer to it rather than duplicating its contents here.-->
The product will allow users to easily report on infrastructural issues and needs. Users can also confirm and add details to the issues posted by others. This will give government officials more up to date kowledge of current needs, and will help them to prioritize those needs.


# 2 Overall Description #
## 2.1 Product Functions ##
<!--Summarize the major functions the product must perform or must let the user perform. Details will be provided in Section 3, so only a high level summary (such as a bullet list) is needed here. Organize the functions to make them understandable to any reader of the SRS. A picture of the major groups of related requirements and how they relate, such as a top level data flow diagram or object class diagram, is often effective.-->
The application will be web based and mobile friendly. It will feature a scrollable, zoomable map that will show the user all current city projects, as well as issues posted by other users. The importance of each issue will be shown on the map. The user will be able to select any issue posted by another user, and add their own comments or details. If the issue is important to the user, they may increment the importance of the issue. 
Government officials will have the ability to add comments to any issue, and their comments will be shown in a way that users viewing the issue will easily recognize official comments. 

## 2.2 User Classes and Characteristics ##
<!--Identify the various user classes that you anticipate will use this product. User classes may be differentiated based on frequency of use, subset of product functions used, technical expertise, security or privilege levels, educational level, or experience. Describe the pertinent characteristics of each user class. Certain requirements may pertain only to certain user classes. Distinguish the most important user classes for this product from those who are less important to satisfy.-->
- **Civilians** are citizens of the municipalities that Caesar is available in. Citizens can: view the map ([4.1]), report improvements ([4.2]), and vote to add or decrease significance of reported improvements ([4.3]).
- **Officials** are government officials of the municipalities that Caesar is available in. Officials have the same abilities as civilians, but additionally may speak officially as representatives of the municipality ([4.3.2]).
- **Guests** are unregistered users. Guests can view the map ([4.1]).

## 2.3 Operating Environment ##
<!--Describe the environment in which the software will operate, including the hardware platform, operating system and versions, and any other software components or applications with which it must peacefully coexist.-->
The application will run on a Windows server. 

## 2.4 Design and Implementation Constraints ##
<!--Describe any items or issues that will limit the options available to the developers. These might include: corporate or regulatory policies; hardware limitations (timing requirements, memory requirements); interfaces to other applications; specific technologies, tools, and databases to be used; parallel operations; language requirements; communications protocols; security considerations; design conventions or programming standards (for example, if the customer’s organization will be responsible for maintaining the delivered software).-->
- The application will use a REST API to expose information from the backend to the frontend view.

## 2.5 User Documentation ##
<!--List the user documentation components (such as user manuals, on-line help, and tutorials) that will be delivered along with the software. Identify any known user documentation delivery formats or standards.-->
All code written will have class and method level documentation. A README or Installation Guide will also be provided to give instructions on how to start and use the application.

## 2.6 Assumptions and Dependencies ##
<!--List any assumed factors (as opposed to known facts) that could affect the requirements stated in the SRS. These could include third-party or commercial components that you plan to use, issues around the development or operating environment, or constraints. The project could be affected if these assumptions are incorrect, are not shared, or change. Also identify any dependencies the project has on external factors, such as software components that you intend to reuse from another project, unless they are already documented elsewhere (for example, in the vision and scope document or the project plan).-->
Dependencies:
* [Google Maps API][1]


# 3 External Interface Requirements #
## 3.1 User Interfaces ##
<!--Describe the logical characteristics of each interface between the software product and the users. This may include sample screen images, any GUI standards or product family style guides that are to be followed, screen layout constraints, standard buttons and functions (e.g., help) that will appear on every screen, keyboard shortcuts, error message display standards, and so on. Define the software components for which a user interface is needed. Details of the user interface design should be documented in a separate user interface specification.-->
This section will demonstrate the goals for the User Interface by providing mockups of several pages throughout the application.

### Landing Page ###
This is the page that everybody will start on when loading caesar. The user is provided with a quick overview of the  map as well as some menu options. On the mobile version, these menu options will be hidden until the user presses on the "Options" button. 
![Landing Page](/docs/assets/b_lp.png)
### Login Page ###
This is a typical login page. To return to the map view, the user would click on "Caesar" for the PC or "Back" for the mobile interface.
![Login Page](/docs/assets/b_login.png)
### Add an Issue ###
When a user chooses to add an issue, this popup is displayed. This will be accessed by placing a pin on the map. To return to the landing page, the user can press "Cancel".
![Add An Issue](/docs/assets/b_add_issue.png)
### My Issues ###
This is a page which allows users to track the issues that they are involved with (either commented on, created, or upvoted). Here you can see each issue's priority, description, date of creation, and the number linked to that issue. 
![My Issues](/docs/assets/b_my_issues.png)
### Contact Official ###
This page allows users to contact officials for their area. Different officials will be listed on the dropdown menu, and when a message is typed out and sent the official will recieve an email. This allows for officials to get useful feedback without having to interface with the application directly.
![Contact](/docs/assets/b_contact.png)

## 3.2 Hardware Interfaces ##
<!--Describe the logical and physical characteristics of each interface between the software product and the hardware components of the system. This may include the supported device types, the nature of the data and control interactions between the software and the hardware, and communication protocols to be used.-->
The intended hardware interfaces for this application are laptops, desktops, and mobile devices. Since this will be a web application, the operating systems of these devices shouldn't be of concern.

## 3.3 Communication Interfaces ##
<!--Describe the requirements associated with any communications functions required by this product, including e-mail, web browser, network server communications protocols, electronic forms, and so on. Define any pertinent message formatting. Identify any communication standards that will be used, such as FTP or HTTP. Specify any communication security or encryption issues, data transfer rates, and synchronization mechanisms.-->
In order to let civilians communicate with government officials without the officials having to directly interact with the app, the app will have the ability to let civilians use e-mail to communicate with their local government.


# 4 System Features #
## 4.1 Use Case 1: View Map ##
### 4.1.1 Main Flow ###
When the web page is opened, a map shall be displayed. The map shall be centered on the user's current location. The user shall have the ability to zoom and scroll on the map. Any current infrastructure projects shall be shown on the map. All user issues shall be displayed for the given area, and each will have a visual representation of the importance of the issue.
### 4.1.2 Alternative Flow 1 ###
If the user does not allow the sharing of their location, a default location shall be displayed. The user will still have all map features, including scrolling, zooming, and viewing current and proposed projects.

## 4.2 Use Case 2: Add New Issue ##
### 4.2.1 Main Flow ###
When a Civilian or Official clicks to add a point on the map, an interface will appear which will contain a text area where the user can enter a decription of the issue. When the user submits the issue, a point appears on the map with an importance rating of 1. The user shall be returned to the map.
### 4.2.2 Error Flow 1 ###
If the page is closed or the form is cancelled before submission, no information will be saved, and no new points will appear on the map. 
### 4.2.3 Error Flow 2 ###
If a guest attempts to add a new issue, the user shall be prompted to log in, and no new issue will be opened.

## 4.3 Use Case 3: Update Existing Issue ###
### 4.3.1 Main Flow ###
When a user selects an issue on the map, the issue description and all comments made on the issue shall be displayed. Civilian and Officials shall have the ability to add a comment to the issue. When the comment is submitted, the comment shall appear to all users who view the issue. The user shall further have the ability to increment the importance of the issue. 
### 4.3.2 Alternative Flow 1 ### 
If the user is designated as a government official, they shall have the ability to designate their comment as pinned, which shall cause the post to appear at the top of the issue page.
### 4.3.3 Error Flow 1 ###
If the user attempts to increment the importance of an issue more than one time, the system shall display an error message, and the importance of the issue will not be incremented.
### 4.3.4 Error Flow 2 ###
If the page is closed or the form is cancelled before submission, no information will be saved.
### 4.2.3 Error Flow 3 ###
If a guest attempts to add a comment to an existing issue, the user shall be prompted to log in, and no new comment will be posted.

## 4.4 Use Case 4: Create an Account ##
### 4.4.1 Main Flow ###
When a user selects the "Create Account" button, a form shall be displayed that prompts a user to enter a user name and password. When the form is submitted, an account is created for the user.
### 4.4.2 Error Flow 1 ###
If the user name or password fields are left blank, an error message shall be displayed to the user, and an account will not be created for the user.
### 4.4.3 Error Flow 2 ###
If the user name entered by the user is already in use by another user, an error message shall be displayed to the user, and an account will not be created for the user.

## 4.5 Use Case 5: Log In ##
### 4.5.1 Main Flow ###
When a guest selects the "Log In" button, a form shall be displayed requesting the user name and password of the user. When the form is submitted, the user shall be logged in to their account, and their role shall be changed to Civilian or Official, based on their account type.
### 4.5.2 Error Flow 1 ###
If a guest enters invalid credentials, an error message will appear, prompting the user to try again or create an account. On failed log in attempts, the user will remain in guest mode.
# 5. Nonfunctional Requirements #
## 5.1 Performance Requirements ##
<!--If there are performance requirements for the product under various circumstances, state them here and explain their rationale, to help the developers understand the intent and make suitable design choices. Specify the timing relationships for real time systems. Make such requirements as specific as possible. You may need to state performance requirements for individual functional requirements or features.-->
No action within the application shall take more than five seconds to execute.

## 5.2 Safety Requirements ##
<!--Specify those requirements that are concerned with possible loss, damage, or harm that could result from the use of the product. Define any safeguards or actions that must be taken, as well as actions that must be prevented. Refer to any external policies or regulations that state safety issues that affect the product’s design or use. Define any safety certifications that must be satisfied.-->
The user shall be provided a disclaimer against using this application while driving.

## 5.3 Security Requirements ##
<!--Specify any requirements regarding security or privacy issues surrounding use of the product or protection of the data used or created by the product. Define any user identity authentication requirements. Refer to any external policies or regulations containing security issues that affect the product. Define any security or privacy certifications that must be satisfied.-->
The application will encrypt passwords before storing them in the database.

## 5.4 Software Quality Attributes ##
<!--Specify any additional quality characteristics for the product that will be important to either the customers or the developers. Some to consider are: adaptability, availability, correctness, flexibility, interoperability, maintainability, portability, reliability, reusability, robustness, testability, and usability. Write these to be specific, quantitative, and verifiable when possible. At the least, clarify the relative preferences for various attributes, such as ease of use over ease of learning.-->
The application should be designed such that it can be used by those who are color blind.

<!--Links-->
[1]: https://developers.google.com/maps/
[2]: http://www.arcgis.com/home/item.html?id=2d769da0b5a743ff9a31af048bcfeec1
[4.1]: https://github.ncsu.edu/engr-csc-sdc/2017FallTeam05/blob/documentation/docs/srs.md#41-use-case-1-view-map
[4.2]: https://github.ncsu.edu/engr-csc-sdc/2017FallTeam05/blob/documentation/docs/srs.md#42-use-case-2-add-new-issue
[4.3]: https://github.ncsu.edu/engr-csc-sdc/2017FallTeam05/blob/documentation/docs/srs.md#43-use-case-3-update-existing-issue
[4.3.2]: https://github.ncsu.edu/engr-csc-sdc/2017FallTeam05/blob/documentation/docs/srs.md#432-alternative-flow-1
