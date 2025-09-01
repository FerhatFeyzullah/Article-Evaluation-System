# 📝 Article Evaluation System

A full-featured **Article Evaluation System** developed with **.NET (Onion Architecture + Web API)** for the backend and **React** for the frontend.  
The system allows authors to submit articles as PDF, admins to manage submissions and assign reviewers, and reviewers to evaluate articles online.

## 🚀 Features

### 🧑‍💻 Users (Authors)
- Submit articles in **PDF format** without registering.  
- Provide an email to receive updates on their submission.  
- Receive a **tracking number** for each submission.  
- Check the status of their article:
  - Awaiting reviewer assignment  
  - Under review  
  - Requires revisions  
  - Accepted without changes  

### 🛠️ Reviewer
- Login with registered credentials.  
- Access assigned articles via a **built-in PDF reader**.  
- Option to download PDF locally.  
- Submit evaluations:
  - Article requires revisions (with comments)  
  - Article accepted without changes  

### 🏢 Admin
- Manage registered reviewers.  
- Review uploaded articles and assign them to reviewers.  
- Optionally download and evaluate articles directly.  
- View system logs:
  - New article uploaded  
  - Article evaluated  
  - Reviewer assignments  

### 📬 Contact Panel
- Authors can contact admins via the **contact form**.  
- Provide an email for admin to respond.

## 🛠️ Technologies Used
### Backend
- **.NET Web API**  
- **Onion Architecture**  
- **Identity & JWT** (role-based authentication)  
- **Generic Repository Pattern**  

### Frontend
- **React**  
- **Redux**  
- **React Router**  
- Custom **PDF reader** component  

### Database
- SQL Server

## 📂 Project Structure
- **Backend** → Handles article management, user authentication, reviewer assignment, and logs.  
- **Frontend** → React-based UI for authors, reviewers, and admin panels.  
- **PDF Viewer** → Built-in for online evaluation.  

## ⚡ Getting Started

### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/article-evaluation-system.git
2. Open the backend solution in Visual Studio.
3. Update appsettings.json with your database connection string and JWT configuration.
4. Run database migrations if needed: "Update-Database"
5. Start the Web API project. Ensure it runs successfully on the configured port.

### Frontend
1. Navigate to the frontend folder: "cd ArticleEvaluationSystem-Frontend"
2. Install dependencies:"npm install"
3. Start the development server:"npm start"
4. Open your browser and access the system:
   
- Admin & Reviewer login panel
- Article submission panel for authors

### Notes
- Only reviewers can register and login; authors do not have accounts.
- Authors can monitor their submission using tracking number.
- Contact panel allows authors to communicate with admins via email.
- The system is designed for online article submission and evaluation workflow.

   


   
