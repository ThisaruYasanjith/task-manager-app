# Task Manager Application

## ■ How to Run Backend & Frontend

The entire application is containerized using Docker. Follow these steps to build and run both the backend and frontend simultaneously:

1.  **Open your terminal** in the root directory of the project (`task-manager-app`).
2.  **Ensure Docker Desktop is running** on your machine.
3.  **Execute the following command**:
    ```bash
    docker-compose up --build
    ```
4.  **Access the application**:
    * **Frontend**: Open [http://localhost](http://localhost) in your browser.
    * **Backend API**: Access the REST endpoints at [http://localhost:8080/api/tasks](http://localhost:8080/api/tasks).

---

## ■ Database Setup Details

The database is managed automatically by the Docker Compose orchestration. No manual installation of MySQL is required on your host machine.

* **Database Engine**: MySQL 8.0
* **Database Name**: `taskmanager`
* **User**: `root`
* **Password**: `root`
* **Port Mapping**: The internal container port `3306` is mapped to your local port `3306`.
* **Table Generation**: The application uses Hibernate's `ddl-auto=update` strategy, which automatically creates and maintains the `tasks` table schema upon the first successful connection.



