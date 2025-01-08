# Arkmind_Assessment

In this website, you are able to:
1. View & Manage All Items: A table or list to display all items
2. Create Item: A form to add a new item
3. Update & Edit Existing Item: A form pre-filled with item details to update when clicked on the edit button
4. Delete Existing Item: A button to delete an item with confirmation
5. Create Item: A form to add a new item

In this development;
1. MySQL is used as the database
2. Axios is used to interact with the backend
3. Frontend File > App.tsx (layout), App.css (design)
4. Backend File > config.php (CRUD)

Pre-Configuration 
1. Install XAMPP
2. Download this zip folder and unzip it
3. From the folder, find config.php
4. Move the config.php to the directory XAMPP/htdocs/userdata (so that data can be fetched from the database)
5. To open the database, open XAMPP, and from XAMPP > start Apache > start MySQL
6. If you cannot start, go to the top right corner > config > Service & Port Settings > change the main port to 8080 > click save
7. Restart MySQL again, if successful, it will open a window to direct you to the database

Database Configuration
1. Create a database "arkmind_assessment"
2. The table "items" will automatically created when you add an item through the website

How to start the process
1. Open command prompt 
2. Go to the directory path Technical_Assessment_Full_Stack_Developer_1-main\Technical_Assessment_Full_Stack_Developer_1-main\frontend
3. Start the environment by typing "npm run dev"
4. If successful, a localhost network will be provided, and use the given address to access the website


