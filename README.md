# node-friend-communication-system
Friend Communication System using Node.JS

Introduction
---
A virtual communication website using Node js, Express js and Mongoose. <br />
![node-friend-communication-system on Heroku](https://node-friend-communication-sys.herokuapp.com/)
- User connect members page: <br />
![user-members-page](https://github.com/RefaelBeker7/node-friend-communication-system/blob/main/members_user.png)
- Admin connect members page: <br />
![admin-members-page](https://github.com/RefaelBeker7/node-friend-communication-system/blob/main/members_admin.png)
<br />



Technology
---
1. Node.js version 10.19.0
2. MongoDB version 3.6.2
3. Express version 4.16.1
4. Bootstrap version 4.4.1
5. Cookie-parser version 1.4.4
6. Morgan version 1.9.1
7. Jade version 1.11.0
8. AdminBro: used and customized to implement the admin panel.
9. Passport: used for authentication
10. Express Validator: used for form validation


Features
---
The application displays a virtual bags store that contains virtual products and contact information.<br />

**Users can do the following:**

- Create an account, login or logout
- Search other members by phone number or name.
- Private pages that are only accessible after successful login.

**Admin can do the following:**

- Login or logout to the admin panel
- View all the members stored in the database. They can view/edit/delete members(users).

Database
---
Model directory created using mongoose.<br />

**Schema:**
- username (String, by index)
- password (String)
- phone (String)
- name (String - full name)
- gender (String)
- daysChecked (Boolean Array)
- profileimage (String)
- adminFlag (Boolean)







