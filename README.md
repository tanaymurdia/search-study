# Study Search App

This project is a web application for searching and viewing clinical studies related to Non-Small Cell Lung Cancer (NSCLC) and immunotherapy-related drugs. Users can enter search terms, view study details, and expand each study entry for more information.

## Features

- **Search Functionality**: Allows users to search for clinical studies using specific keywords.
- **Expandable Study Entries**: Users can expand each study entry to view additional details.
- **Study Details**: Each study entry includes the study title, a button to visit the study URL, and the start date.

## Screenshots
- Search View
![Search Study Screenshot](https://github.com/user-attachments/assets/18e704d2-9a03-45ed-9ec0-533517727f41)
- Expanded View
![image](https://github.com/user-attachments/assets/ee41d76f-7dea-4f67-9cc3-29d619938346)



## Python Service

To install packages listed in a `service\requirements.txt` file using `pip`, you can follow these simple steps:

### Step 1: Ensure Python and Pip are Installed

Before proceeding, make sure that Python and `pip` are installed on your system. You can verify this by running:

```bash
python --version
pip --version
```

If these commands return a version number, then Python and `pip` are installed. If not, you'll need to install them.

### Step 2: Install Packages from `requirements.txt`

Use the following command to instruct `pip` to install all of the packages listed in `service\requirements.txt`:

```bash
pip install -r service\requirements.txt
```

### Additional Tips:

- **Virtual Environment**: It is best practice to use a virtual environment to create an isolated environment for your project dependencies. This helps prevent dependency conflicts across projects. To create and activate a virtual environment, use the following commands:

  - **Create a Virtual Environment**: (assuming you want to create it in the current directory)

    ```bash
    python -m venv env
    ```

  - **Activate the Virtual Environment**:
    - On Windows:

      ```bash
      .\env\Scripts\activate
      ```

    - On macOS and Linux:

      ```bash
      source env/bin/activate
      ```

- **Checking Installations**: After installation, you can verify the installed packages using:

  ```bash
  pip list
  ```

These steps should guide you through installing the required packages for your project using a `requirements.txt` file.

### Starting the Service

To start the service, execute the following command:

```bash
python service/app.py
```

## React Application

### Available Scripts

Within the project directory, you have access to the following commands:

#### `npm start`

This command runs the app in development mode.\
Navigate to [http://localhost:3000](http://localhost:3000) to see it in your browser.

#### `npm run build`

This command builds the app for production, outputting to the `build` directory.\
It properly bundles React in production mode and optimizes the build for enhanced performance.

The build output is minified, and filenames include hashes for cache management.\
Your app is now ready for deployment!
