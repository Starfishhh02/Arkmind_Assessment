# Arkmind_Assessment

Pre-Configuration
1. Install XAMPP
2. Move the config.php inside the folder to XAMPP/htdocs/userdata (so that data can be fetched from the database)
3. To open the database, use XAMPP > start Apache > start MySQL
4. If you cannot start, go to the top right corner > config > Service & Port Settings > change the main port to 8080 > click save
5. Restart MySQL again, if successful, it will open a window to direct you to the database

Database Configuration
1. Create a database "arkmind_assessment"
2. The table "items" will automatically created when you add an item through the website

How to start the process
1. Open command prompt 
2. Go to the directory path Technical_Assessment_Full_Stack_Developer_1-main\Technical_Assessment_Full_Stack_Developer_1-main\frontend
3. Start the environment by typing "npm run dev"
4. If successful, a localhost network will be provided, and use the given address to access the website

In this website, you are able to:
1. View & manage all items
2. Add new item
3. Update existing item
4. Delete existing item

